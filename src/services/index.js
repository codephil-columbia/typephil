import axios from "axios";

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