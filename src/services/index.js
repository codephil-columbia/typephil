import axios from "axios";
import uuid from "uuid";

import {api_url} from "../constants";

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

class UserService {
  constructor() {
    if(process.env.REACT_APP_IS_OFFLINE) {
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

        setLocalStorageVal(localStorageKeys.USERS, users);
        res(user);
      })
  }
}


class TutorialService {
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

class ChapterService {
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

export { UserService, LocalStorageCache, TutorialService, ChapterService };