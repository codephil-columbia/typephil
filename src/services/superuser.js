import {UserService, getLocalStorageVal, setLocalStorageVal} from ".";

const superUser = {
  username: "superuser",
  password: "password",
  firstName: "super",
  lastName: "user",
  occupation: "student"
}

export function createSuperUser() {
  const userService = new UserService();
  userService.signup(superUser)
    .then(u => {
      unlockAllLessons(u.uid);
      unlockAllChapters(u.uid);
    });
}

function unlockAllLessons(uid) {
  const lessons = getLocalStorageVal("lessons");
  const records = getLocalStorageVal("records");
  lessons.forEach(l => {
    records.lessonRecords.push({ wpm: 0, accuracy: 0, lessonID: l.lessonID, uid });
  });
  setLocalStorageVal("records", records);
}

function unlockAllChapters(uid) {
  const chapters = getLocalStorageVal('chapters');
  const records = getLocalStorageVal('records');
  chapters.forEach(c => {
    records.chapterRecords.push({ chapterID: c.chapterID, uid });
  });
  setLocalStorageVal('records', records);
}