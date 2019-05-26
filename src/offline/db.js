import { User } from "./models";

import uuid from "uuid";
import _ from "lodash";

function initLocalStorage() {
  const userStore = new Authenticator(new DatabaseAccessor());
  // userStore.setUser("1", new User(
  //   "1",
  //   "now",
  //   "Cesar",
  //   "Ibarra",
  //   "cesaribarra",
  //   "cibarra@gmail.com",
  //   "password",
  //   "student",
  //   "student"
  // ));
  // console.log(userStore.getUser("1"));
}

class DatabaseAccessor {

  /**
   * 
   * @param {string} id of object you are querying
   */
  get(id) {
    return JSON.parse(localStorage.getItem(id));
  }

  set(id, obj) {
    localStorage.setItem(id, JSON.stringify(obj));
  }
}


class UserStore {
  /**
   * 
   * @param {DatabaseAcessor} db 
   */
  constructor(db) {
    this.db = db;
  }

  getUser(id) {
    return this.db.get(id);
  }

  setUser(id, user) {
    this.db.set(id, user);
  }
}

class Authenticator extends UserStore {

  AuthenticationResult = Object.freeze({
    SUCCESS: "SUCCESS",
    FAILED: "FAILED"
  });

  static get UserExists() {
    return "User already exists";
  }

  signUp(user) {
    let users = JSON.parse(localStorage.getItem("users"));
    if (_.find(users, u => u.uid === user.uid)) {
      return Authenticator.UserExists;
    } else {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }

  authenticate(username, password) {
    let users = JSON.parse(localStorage.getItem("users"));
    const user = _.find(users, u => u.username === username);
    if (user.password === password) {
      return this.AuthenticationResult.SUCCESS;
    } else {
      return this.AuthenticationResult.FAILED;
    }
  }

  find(username) {
    // let users = localStorage.get("users");
    // Object.keys(users).forEach(uid => {
      
    // });
  }
};

class LessonStore {
  constructor(db) {
    this.db = db;
  }

  getLesson(id) {
    return this.db.get(id);
  }
}

class ChapterStore {
  constructor(db) {
    this.db = db;
  }

  getChapter(id) {
    return this.db.get(id);
  }
}

class LessonRecordStore {
  constructor(db) {
    this.db = db;
  }

  getLessonRecord(id) {
    return this.db.get(id);
  }

  setLessonRecord(id, obj) {
    return this.db.set(id, obj);
  }
}

class ChapterRecordStore {
  constructor(db) {
    this.db = db;
  }

  getChapterRecord(id) {
    return this.db.get(id);
  }

  setChapterRecord(id, obj) {
    return this.db.set(id, obj);
  }
}

export { Authenticator, initLocalStorage, DatabaseAccessor };