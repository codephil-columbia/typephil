import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import App from './app'

import { lessons, chapters } from "./services/tutorialLessons";

import {createSuperUser} from './services/superuser';

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
  localStorage.setItem("records", JSON.stringify({
    lessonRecords: [], 
    chapterRecords: [],
    gameRecords: {}
  }));
  localStorage.setItem("lessons", JSON.stringify(lessons));
  localStorage.setItem("chapters", JSON.stringify(chapters));

  localStorage.setItem("tutorial", JSON.stringify({
    pageSource: ""
  }));
} 

const hasBeenSetup = Boolean(localStorage.getItem("hasBeenSetup"));
if (process.env.REACT_APP_ENV === "offline" && !hasBeenSetup) {
  initLocalStorage();

  if (Boolean(process.env.REACT_APP_SU)) {
    if (!Boolean(localStorage.getItem('superUserHasBeenSetup'))) {
      localStorage.setItem('superUserHasBeenSetup', true);
      console.log('creating superuser');
      createSuperUser();
    }
  }
}

ReactDOM.render(
  <BrowserRouter>
    <App/>
    </BrowserRouter>, 
  document.getElementById('root') || document.createElement('div'),
);
