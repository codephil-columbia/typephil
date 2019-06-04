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
}

export { UserService, LocalStorageCache };