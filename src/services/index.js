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
    GET_USER_TUTORIAL_AVGS: uid => `${api_url}/stats/tutorial/lesson/${uid}`
  })

  getTutorialInfo(uid) {
    return Promise.all([
      axios.get(this.endpoints.GET_USER_CURRENT_LESSON(uid)),
      axios.get(this.endpoints.GET_USER_CURRENT_CHAPTER(uid))
    ]).then(res => ({lesson: res[0].data, "chapter": res[1].data}));
  }

  getTutorialAvgs(uid) {
    return sendGetReq(this.endpoints.GET_USER_TUTORIAL_AVGS(uid));
  }
}

class ChapterService {
  endpoints = Object.freeze({
    GET_CHAPTER_PROGRESS: uid => `${api_url}/stats/tutorial/chapter/${uid}`
  });

  getChapterProgressPercentage(uid) {
    return sendGetReq(this.endpoints.GET_CHAPTER_PROGRESS(uid));
  }
}

export { UserService, LocalStorageCache, TutorialService, ChapterService };