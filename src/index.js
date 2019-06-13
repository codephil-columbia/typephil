import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import { lessons, chapters } from "./services/tutorialLessons";

import { Authenticator, initLocalStorage, DatabaseAccessor } from "./offline/db";
import { User } from "./offline/models";
import { tutorialText } from "./tutorialText";

import './style/styles.scss';
import './style/index.scss';

/**
 * If the app is online, we keep one reference to the lessons and chapters
 * to avoid reintantiating it multiple times throughout the app
 */
export let tutorialData = {}
if (process.env.REACT_APP_ENV === "offline") {
  tutorialData.lessons = lessons;
  tutorialData.chapters = chapters;
}

export function initLocalStorage() {
  localStorage.setItem("hasBeenSetup", true);
  localStorage.setItem("users", JSON.stringify([]));
  localStorage.setItem("records", JSON.stringify({lessonRecords: [], chapterRecords: []}));
  localStorage.setItem("lessons", JSON.stringify(lessons));
  localStorage.setItem("chapters", JSON.stringify(chapters));
} 

const hasBeenSetup = localStorage.getItem("hasBeenSetup");
if (process.env.REACT_APP_ENV === "offline" && !hasBeenSetup) {
  initLocalStorage();
}

const Loading = () => {
  return <div>Loading</div>
}

if (!localStorage.getItem("hasBeenInited")) {
  localStorage.setItem("hasBeenInited", true);
  localStorage.setItem("users", JSON.stringify([]));
  
  localStorage.setItem("tutorial", JSON.stringify(tutorialText));
  localStorage.setItem("records", JSON.stringify({}));
}

const auth = new Authenticator(new DatabaseAccessor());
auth.signUp(new User(
  "now",
  "cesar",
  "ibarra",
  "cibarra",
  "cibarra@gmail.com",
  "password",
  "student",
  "student"
));

// console.log(auth.authenticate("cibarra", "q"));
// localStorage.clear();

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);
