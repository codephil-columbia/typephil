import axios from "axios";
import uuid from "uuid";

import {api_url} from "../constants";
import {tutorialData} from "..";
import {applyTextTransformer} from "../middleware/requestTextConverter";

const sendPostReq = (url, data) => {
  return axios.post(url, data)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res;
    })
    .then(res => res.data)
}

const sendGetReq = url => {
  return axios.get(url)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res;
    })
    .then(res => res.data);
}

const localStorageKeys = Object.freeze({
  USERS: "users"
});

function getLocalStorageVal(fromKey) {
  let val = localStorage.getItem(fromKey);
  return JSON.parse(val);
}

function setLocalStorageVal(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

class LocalStorageCache {
  set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
      const value = localStorage.getItem(key);
      return JSON.parse(value);
  }

  clear() {
    localStorage.clear()
  }
}

class UserService {
  constructor() {
    if(process.env.REACT_APP_ENV === "offline") {
      this.service = new OfflineUserService();
    } else {
      this.service = new OnlineUserService();
    }
  }

  authenticate = (username, password) => {
      return this.service.authenticate(username, password);
  }

  signup = user => {
      return this.service.signup(user);
  }

  getUser(uid) {
    return this.service.getUser(uid);
  }

  changePassword(username, newPassword) {
    return this.service.changePassword(username, newPassword);
  }
}

class OnlineUserService {
  endpoints = Object.freeze({
    AUTHENTICATE: "/user/authenticate",
    SIGN_UP: "/user/",

    GET_USER: uid => `${api_url}/user/${uid}`,
    EDIT_PASSWORD: `${api_url}/user/edit/password`
  });

  authenticate = (username, password) => {
    return sendPostReq(`${api_url}${this.endpoints.AUTHENTICATE}`, { username, password })
  }

  signup = user => {
    return sendPostReq(`${api_url}${this.endpoints.SIGN_UP}`, { ...user })
  }

  getUser(uid) {
    return sendGetReq(this.endpoints.GET_USER(uid));
  }

  changePassword(username, newPassword) {
    return sendPostReq(this.endpoints.EDIT_PASSWORD, { username, password: newPassword });
  }
}

class OfflineUserService {
  authenticate(username, password) {
    return new Promise((res, rej) => {
      let users = getLocalStorageVal(localStorageKeys.USERS);

      // Check to see if user exits
      const user = users.find(user => user.username === username);
      if (!user) {
        return rej("User does not exist");
      }

      // Check to see if passwords are equal
      if (user.password !== password) {
        return rej(new Error("user passwords do not match"));
      }

      res(user);
    })
  }

  signup(user) {
      // TODO: figure out password hashing
      return new Promise((res, rej) => {
        // user.password = hashPassword(user.password);
        let users = getLocalStorageVal(localStorageKeys.USERS)
        user.uid = uuid.v4();

        if (users.find(u => u.username === user.username)) {
          rej('User with that username already exists');
        }

        users.push(user);
        this.addEntryToGameRecords(user.uid);
        // this.addUserToRecordList(user.uid);

        setLocalStorageVal(localStorageKeys.USERS, users);
        res(user);
      })
  }

  addEntryToGameRecords(uid) {
    const records = getLocalStorageVal("records");
    records.gameRecords[uid] = {
      readysettype: {wpm: 0, accuracy: 0, level: 0},
      spacerace: {wpm: 0, accuracy: 0, level: 0},
      challenge: {wpm: 0, accuracy: 0, level: 0}
    };
    setLocalStorageVal("records", records);
  }

  getUser(uid) {
    const users = getLocalStorageVal("users");
    const user = users.find(u => u.uid === uid);

    // FIXME: since we for now do not hash passwords, remove it before 
    // return the user 
    user.password = "";

    return Promise.resolve(user);
  }

  changePassword(username, newPassword) {
    const users = getLocalStorageVal("users");
    users.forEach(u => {
      if (u.username === username) u.password = newPassword; 
    })
    setLocalStorageVal("users", users);
    return Promise.resolve();
  }
}


class TutorialService {
  constructor() {
    if(process.env.REACT_APP_ENV === "offline") {
      this.service = new OfflineTutorialService();
    } else {
      this.service = new OnlineTutorialService();
    }
  }

  getLessonProgressInChapter(uid) {
    return this.service.getLessonProgressInChapter(uid)
  }

  getTutorialInfo(uid) {
    return this.service.getTutorialInfo(uid);
  }

  getCurrentLesson(uid) {
    return this.service.getCurrentLesson(uid);
  }

  getTutorialAvgs(uid) {
    return this.service.getTutorialAvgs(uid);
  }

  getCompletedLessons(uid) {
    return this.service.getCompletedLessons(uid);
  }

  getLesson(lessonID) {
    return this.service.getLesson(lessonID);
  }

  getChapter(chapterID) {
    return this.service.getChapter(chapterID);
  }

  saveTutorialResult({
    wpm,
    accuracy,
    uid, 
    chapterID,
    lessonID
  }) {
    return this.service.saveTutorialResult({
      wpm,
      accuracy,
      uid,
      chapterID, 
      lessonID
    })
  }
}


class OnlineTutorialService {
  constructor() {
    this.chapterService = new OnlineChapterService();
  }

  endpoints = Object.freeze({
    GET_USER_TUTORIAL_AVGS: uid => `${api_url}/stats/tutorial/lesson/${uid}`,
    POST_USER_LESSON_RESULT: `${api_url}/records/tutorial/save/lesson`,
    
    GET_USER_CURRENT_CHAPTER: uid => `${api_url}/chapter/current/${uid}`,

    GET_USER_CURRENT_LESSON: uid => `${api_url}/lesson/current/${uid}`,
    GET_USER_COMPLETED_LESSONS: uid => `${api_url}/records/tutorial/lessons/${uid}`,
    GET_LESSON_PROGRESS_IN_CHAPTER: uid => `${api_url}/stats/tutorial/chapter/${uid}`,
    GET_LESSON: lessonID => `${api_url}/lesson/${lessonID}`
  })

  saveTutorialResult({ wpm, accuracy, uid, chapterID, lessonID }) {
    return sendPostReq(this.endpoints.POST_USER_LESSON_RESULT, {
      wpm,
      accuracy,
      uid, 
      chapterID,
      lessonID
    });
  }

  getTutorialInfo(uid) {
    return Promise.all([
      axios.get(this.endpoints.GET_USER_CURRENT_LESSON(uid)),
      axios.get(this.endpoints.GET_USER_CURRENT_CHAPTER(uid))
    ]).then(res => ({lesson: res[0].data, "chapter": res[1].data}));
  }

  getCurrentLesson(uid) {
    return sendGetReq(this.endpoints.GET_USER_CURRENT_LESSON(uid));
  }

  getTutorialAvgs(uid) {
    return sendGetReq(this.endpoints.GET_USER_TUTORIAL_AVGS(uid));
  }

  getCompletedLessons(uid) {
    return sendGetReq(this.endpoints.GET_USER_COMPLETED_LESSONS(uid));
  }

  getLessonProgressInChapter(uid) {
    return sendGetReq(this.endpoints.GET_LESSON_PROGRESS_IN_CHAPTER(uid));
  }

  getLesson(lessonID) {
    return sendGetReq(this.endpoints.GET_LESSON(lessonID));
  }

  getChapter(chapterID) {
    return this.chapterService.getChapter(chapterID);
  }
}

class OfflineTutorialService {
  constructor() {
    this.lessons = tutorialData.lessons;
    this.chapters = tutorialData.chapters;
  }

  lastLessonInChapter = {
		1: 6,
		2: 12,
		3: 25,
		4: 30,
		5: 36,
		6: 40,
	}

  saveTutorialResult({
    wpm,
    accuracy,
    uid, 
    chapterID,
    lessonID
  }) {
    if (this.lastLessonInChapter[chapterID] === lessonID) {
      this.saveChapterRecord({ chapterID, uid });
    }
    
    this.saveLessonRecord({ wpm, accuracy, uid, chapterID, lessonID });
    return Promise.resolve(0);
  }

  recordExists(uid, lessonID) {
    const userRecords = this.getLessonRecords(uid);
    return userRecords.find(l => l.lessonID === lessonID && l.uid === uid)
  }
  
  updateRecord({ wpm, accuracy, uid, lessonID }) {
    const { lessonRecords } = getLocalStorageVal("records");
    // Update record in place
    lessonRecords.forEach(record => {
      if (record.uid === uid && record.lessonID === lessonID) {
        if (Number(record.wpm) < Number(wpm)) {
          record.wpm = Number(wpm);
        }
        if (Number(record.accuracy) < Number(accuracy)) {
          record.accuracy = Number(accuracy);
        }
      }
    })
  }

  saveLessonRecord({ wpm, accuracy, uid, chapterID, lessonID }) {
    if (this.recordExists(uid, lessonID)) {
      this.updateRecord({ wpm, accuracy, uid, lessonID})
    } else {
      let records = getLocalStorageVal("records");
      records.lessonRecords.push({ wpm, uid, lessonID, chapterID, accuracy });
      setLocalStorageVal("records", records);
    }
    return new Promise((res, rej) => res());
  }

  saveChapterRecord({ chapterID, uid }) {
    let records = getLocalStorageVal("records");
    records.chapterRecords.push({ uid, chapterID });

    setLocalStorageVal("records", records);
  }

  getTutorialInfo(uid) {
    return Promise.all([
      this.getCurrentLesson(uid),
      this.getCurrentChapter(uid)
    ]).then(([lesson, chapter]) => {
      return { lesson, chapter };
    });
  }

  getTutorialAvgs(uid) {
    const lessonRecords = this.getLessonRecords(uid);

    let avgs = {
      wpm: this.calculateAvg(lessonRecords, "wpm"),
      accuracy: this.calculateAvg(lessonRecords, "accuracy")
    }

    return new Promise((res, rej) => res(avgs));
  }

  calculateAvg(vals, field) {
    if (vals.length === 0) {
      return 0;
    }
    return vals.reduce((accum, currVal) => accum + currVal[field], 0) / vals.length;
  }

  getCurrentLesson(uid) {
    const userLessonRecords = this.getLessonRecords(uid);

    // If there are no records, return the first lesson
    if (userLessonRecords.length === 0) {
      return this.getLesson(1);
    }

    this.sortRecords(userLessonRecords, "lessonID");
    const lastCompletedRecord = userLessonRecords[userLessonRecords.length - 1];
    const lastCompletedLesson = this.getLesson(lastCompletedRecord.lessonID);

    let nextLesson;
    // User has completed all lessons, just return the last lesson
    if (!lastCompletedLesson.nextLessonID) {
      nextLesson = lastCompletedLesson;
    } else {
      nextLesson = this.getLesson(lastCompletedLesson.nextLessonID);
    }
    
    return Promise.resolve(
      applyTextTransformer(nextLesson)
    );
  }

  getCurrentChapter(uid) {
    const userChapterRecords = this.getChapterRecords(uid);

    // If there are no records, return the first chapter
    if (userChapterRecords.length === 0) {
      return new Promise(res => res(this.chapters[0]));
    }

    this.sortRecords(userChapterRecords, "chapterID");
    const lastCompletedRecord = userChapterRecords[userChapterRecords.length - 1];
    const lastCompletedChapter = this.getChapter(lastCompletedRecord.chapterID);

    let nextChapter;
    if (!lastCompletedChapter.nextChapterID) {
      nextChapter = lastCompletedChapter;
    } else {
      nextChapter = this.getChapter(lastCompletedChapter.nextChapterID) 
    }

    return Promise.resolve(nextChapter);
  }

  getLesson(lessonID) {
    const lessons = getLocalStorageVal("lessons");
    let lesson = lessons.find(l => l.lessonID === lessonID);
    lesson = applyTextTransformer(lesson)
    return lesson;
  }

  getChapter(chapterID) {
    const chapters = getLocalStorageVal("chapters");
    return chapters.find(c => c.chapterID === Number(chapterID));
  }

  getLessonProgressInChapter(uid) {
    const userChapterRecords = this.getChapterRecords(uid);
    let currentChapterID;

    if (userChapterRecords.length === 0) {
      currentChapterID = 1;
    } else {
      this.sortRecords(userChapterRecords, "chapterID");
      const lastCompletedChapter = this.getChapter(userChapterRecords[userChapterRecords.length - 1].chapterID);
      if (lastCompletedChapter.nextChapterID) {
        currentChapterID = lastCompletedChapter.nextChapterID;
      } else {
        currentChapterID = lastCompletedChapter.chapterID;
      }
    }

    const { lessonRecords } = getLocalStorageVal("records");
    const count = lessonRecords.filter(r => r.uid === uid && r.chapterID === currentChapterID).length;
    const total = this.lessons.filter(l => l.chapterID === currentChapterID).length;
    return Promise.resolve(Math.floor(Number(count) / Number(total) * 100));
  }

  getCompletedLessons(uid) {
    const userRecords = this.getLessonRecords(uid);
    return Promise.resolve(userRecords);
  }

  getChapterRecords(uid) {
    const { chapterRecords } = getLocalStorageVal("records");
    return chapterRecords.filter(r => r.uid === uid);
  }

  getLessonRecords(uid) {
    const { lessonRecords } = getLocalStorageVal("records");
    return lessonRecords.filter(r => r.uid === uid);
  }

  sortRecords(records, field) {
    records.sort((r1, r2) => r1[field] < r2[field]);
  }
}

class ChapterService {
  constructor() {
    if(process.env.REACT_APP_ENV === "offline") {
      this.service = new OfflineChapterService();
    } else {
      this.service = new OnlineChapterService();
    }
  }

  getChapterProgressPercentage(uid) {
    return this.service.getChapterProgressPercentage(uid);
  }

  getChapters() {
    return this.service.getChapters();
  }

  getChapterNames() {
    return this.service.getChapterNames();
  }

  getChaptersAndLessons() {
    return this.service.getChaptersAndLessons();
  }

}

class OnlineChapterService {
  endpoints = Object.freeze({
    GET_CHAPTER_PROGRESS: uid => `${api_url}/stats/tutorial/chapter/${uid}`,
    GET_CHAPTERS: `${api_url}/chapter/`,
    GET_CHAPTER: chapterID => `${api_url}/chapter/${chapterID}`,

    GET_LESSONS: `${api_url}/lesson/`
  });

  getChapter(chapterID) {
    return sendGetReq(this.endpoints.GET_CHAPTER(chapterID));
  }

  getChapterProgressPercentage(uid) {
    return sendGetReq(this.endpoints.GET_CHAPTER_PROGRESS(uid));
  }

  getChapters() {
    return sendGetReq(this.endpoints.GET_CHAPTERS);
  }

  getChapterNames() {
    return this.getChapters()
      .then(chapters => chapters.map(c => c.chapterName));
  }

  getChaptersAndLessons() {
    return Promise.all([
      axios.get(`${api_url}/chapter/`),
      axios.get(`${api_url}/lesson/`)
    ]).then(([r1, r2]) => {
      const chapters = r1.data;
      const lessons = r2.data;
      
      return chapters.map(chapter => {
        const lessonsInChapter = lessons.filter(l => l.chapterID === chapter.chapterID)
        return {chapter, lessons:lessonsInChapter}
      });
    })
  }
}

class OfflineChapterService {
  constructor() {
    this.tutorialChapters = tutorialData.chapters;
  }

  getChapterRecordsForUser(uid) {
    const { chapterRecords } = getLocalStorageVal("records");
    return new Promise((res, rej) => {
      res(chapterRecords.filter(r => r.uid === uid));
    });
  }

  getChapterProgressPercentage(uid) {
    return new Promise((res, rej) => {
      res(Number(this.getChapterRecordsForUser(uid).length / this.tutorialChapters.length));
    })
  }

  getChapters() {
    return new Promise((res, rej) => {
      res(getLocalStorageVal("chapters"));
    });
  }

  getChapterNames() {
    const chapters = getLocalStorageVal("chapters");
    return new Promise((res, rej) => {
      res(chapters.map(c => c.chapterName));
    })
  }

  getChaptersAndLessons() {
    const chapters = getLocalStorageVal("chapters");
    const lessons = getLocalStorageVal("lessons");

    const chaptersAndLessons = chapters.map(chapter => {
      const lessonsInChapter = lessons.filter(l => l.chapterID === chapter.chapterID);
      return {
        chapter, 
        lessons:applyTextTransformer(lessonsInChapter)
      }
    });
    return Promise.resolve(chaptersAndLessons);
  }
}

class GameService {
  constructor() {
    if(process.env.REACT_APP_ENV === "offline") {
      this.service = new OfflineGameService(
        getLocalStorageVal,
        setLocalStorageVal
      );
    } else {
      // this.service = new ();
    }
  }
  
  static Games = {
    SPACE_RACE: "spacerace",
    CHALLENGE: "challenge",
    READY_SET_TYPE: "readysettype"
  }

  getHighScores(uid, gameType) {
    return this.service.getHighScores(uid, gameType);
  }

  addGameScoreAndUpdateIfHigher(uid, gameType, {wpm, accuracy, level}) {
    return this.service.addGameScoreAndUpdateIfHigher(uid, gameType, {wpm, accuracy, level});
  }
}

class OfflineGameService {
  constructor(getFromLocalStorage, setToLocalStorage) {
    this._getFromLocalStorage = getFromLocalStorage;
    this._setToLocalStorage = setToLocalStorage;
  }

  getHighScores(uid, gameType) {
    return Promise.resolve(this._getRecords(uid, gameType));
  }

  _getRecords(uid, gameType) {
    const { gameRecords } = this._getFromLocalStorage("records");
    return gameRecords[uid][gameType];
  }

  _saveGameScores(uid, gameType, newHighScores) {
   const records = this._getFromLocalStorage("records");
   records.gameRecords[uid][gameType] = newHighScores;
   this._setToLocalStorage("records", records);
  }

  addGameScoreAndUpdateIfHigher(uid, gameType, {wpm, accuracy, level}) {
    let highScores = this._getRecords(uid, gameType);
    this._compareHighScoresAndUpdate(highScores, {wpm, accuracy, level});
    this._saveGameScores(uid, gameType, highScores);
    return Promise.resolve();
  }

  _compareHighScoresAndUpdate(highScores, {wpm, accuracy, level}) {
    if (wpm > highScores.wpm) {
      highScores.wpm = wpm;
    }

    if (accuracy > highScores.accuracy) {
      highScores.accuracy = accuracy;
    }

    if (level > highScores.level) {
      highScores.level = level;
    }
  }
}

export { 
  UserService,  
  TutorialService, 
  ChapterService, 
  GameService,
  OfflineGameService,
  LocalStorageCache,
  setLocalStorageVal,
  getLocalStorageVal
};