import axios from "axios";
import uuid from "uuid";

import {api_url} from "../constants";
import { tutorialData } from "..";

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
      console.log("using offline service");
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
}

class OnlineUserService {
  endpoints = Object.freeze({
    AUTHENTICATE: "/user/authenticate",
    SIGN_UP: "/user/"
  });

  authenticate = (username, password) => {
    return sendPostReq(`${api_url}${this.endpoints.AUTHENTICATE}`, { username, password })
  }

  signup = user => {
      return sendPostReq(`${api_url}${this.endpoints.SIGN_UP}`, { ...user })
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

        users.push(user);
        // this.addUserToRecordList(user.uid);

        setLocalStorageVal(localStorageKeys.USERS, users);
        res(user);
      })
  }

  // addUserToRecordList(uid) {
  //   let records = getLocalStorageVal("records");
  //   records.lessonRecords.push({ uid, })

  //   setLocalStorageVal("records", recordsForUser);
  // }
}


class TutorialService {
  constructor() {
    if(process.env.REACT_APP_ENV === "offline") {
      this.service = new OfflineTutorialService();
    } else {
      this.service = new OnlineTutorialService();
    }
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
  endpoints = Object.freeze({
    GET_USER_CURRENT_LESSON: uid => `${api_url}/lesson/current/${uid}`,
    GET_USER_CURRENT_CHAPTER: uid => `${api_url}/chapter/current/${uid}`,
    GET_USER_TUTORIAL_AVGS: uid => `${api_url}/stats/tutorial/lesson/${uid}`,
    GET_USER_COMPLETED_LESSONS: uid => `${api_url}/records/tutorial/lessons/${uid}`
  })

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
}

class OfflineTutorialService {
  constructor() {
    this.lessons = tutorialData.lessons;
    this.chapters = tutorialData.chapters;
  }

  lastLessonInChapter = {
		"1": "6",
		"2": "12",
		"3": "25",
		"4": "30",
		"5": "36",
		"6": "40",
	}

  saveTutorialResult({
    wpm,
    accuracy,
    uid, 
    chapterID,
    lessonID
  }) {
    if (this.lastLessonInChapter[chapterID] === lessonID) {
      this.saveChapterRecord(chapterID, uid);
    }
    
    this.saveLessonRecord({ wpm, accuracy, uid, chapterID, lessonID });
    return new Promise((res, rej) => {
      res();
    })
  }

  saveLessonRecord({ wpm, accuracy, uid, chapterID, lessonID }) {
    let records = getLocalStorageVal("records");
    records.lessonRecords.push({ wpm, uid, lessonID, chapterID, accuracy });

    setLocalStorageVal("records", records);
    return new Promise((res, rej) => {
      res();
    })
  }

  saveChapterRecord({ chapterID, uid }) {
    let records = getLocalStorageVal("records");
    records.chapterRecords.push({ uid, chapterID });

    setLocalStorageVal("records", records);
    return new Promise((res, rej) => {
      res();
    })
  }

  getTutorialInfo(uid) {
    return Promise.all([
      this.getCurrentLesson(uid),
      this.getCurrentChapter(uid)
    ]).then(([lesson, chapter]) => {
      return { lesson, chapter };
    })
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
      return this.lessons[0];
    }

    this.sortRecords(userLessonRecords, "lessonID");
    const lastCompletedRecord = userLessonRecords[userLessonRecords.length - 1];
    const lastCompletedLesson = this.getLesson(lastCompletedRecord.lessonID);
    const nextLesson = this.getLesson(lastCompletedLesson.nextLessonID);
    
    return new Promise((res, rej) => res(nextLesson));
  }

  getCurrentChapter(uid) {
    const userChapterRecords = this.getChapterRecords(uid);

    // If there are no records, return the first chapter
    if (userChapterRecords.length === 0) {
      return this.chapters[0];
    }

    this.sortRecords(userChapterRecords, "chapterID");
    const lastCompletedRecord = userChapterRecords[userChapterRecords.length - 1];
    const lastCompletedChapter = this.getChapter(lastCompletedRecord.chapterID);
    const nextChapter = this.getChapter(lastCompletedChapter.nextChapterID)

    return new Promise((res, rej) => res(nextChapter));
  }

  getLesson(lessonID) {
    const lessons = getLocalStorageVal("lessons");
    return lessons.find(l => l.lessonID === lessonID);
  }

  getChapter(chapterID) {
    const chapters = getLocalStorageVal("chapters");
    return chapters.find(c => c.chapterID === chapterID);
  }

  getCompletedLessons(uid) {
    const { lessonRecords } = getLocalStorageVal("records");
    const userRecords = lessonRecords.filter(l => l.uid === uid);
    
    return new Promise((res, rej) => {
      res(userRecords);
    });
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
      this.service = new OnlineTutorialService();
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

    GET_LESSONS: `${api_url}/lesson/`
  });

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
      res(chapterRecords.map(r => r.uid === uid));
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

    return new Promise((res, rej) => {
      const chaptersAndLessons = chapters.map(chapter => {
        const lessonsInChapter = lessons.filter(l => l.chapterID === chapter.chapterID)
        return {chapter, lessons:lessonsInChapter}
      });

      res(chaptersAndLessons);
    })
  }
}

export { UserService, LocalStorageCache, TutorialService, ChapterService };