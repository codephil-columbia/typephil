import { combineReducers } from 'redux';

import { MOVE_INDEX_PTR, START_TUTORIAL, UNFREEZE, FREEZE, LESSON_COMPLETED } from "../actions/lesson";

const authInitialState = {
  isLoggedIn: false,
  currentUser: {
    username: null, 
    uid: null, 
    email: null,
    school: null
  }
}

const initialAppState = {
  currentLesson: {
    name: "Lesson 1: The Importance of Touch Typing",
    chapterID: "1", 
    lessonID: "2", 
    lessonInformation: ["Typing faster with better accuracy will help you increase your productivity.","In this tutorial, you will learn how to touch type. Touch typing is typing without looking at the keyboard to find the keys. If you master touch typing, you will remember the location of keys on the keyboard through muscle memory.","Touch typing will allow you to type faster with accuracy, increase productivity, and decrease fatigue. Typing can be difficult mentally and physically without touch typing. But learning how to touch type can make typing more enjoyable!"],
    lessonContent: ["", "", "here"],
    indexPtr: 0
  },
  shouldFreeze: true,
  tutorialFinished: false
}

const isLoggedIn = (state = false, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return true
    case 'LOGIN_FAILED':
      return false
    default:
      return state
  }
}

const app = (state=initialAppState, action) => {
  let { currentLesson } = state;
  switch(action.type) {
    case "DISPATCHED_TUTORIAL":
      return {state, ...action.currentLesson}
    case MOVE_INDEX_PTR:
      let { indexPtr } = action;
      currentLesson.indexPtr = indexPtr;
      return {...state, currentLesson: {...currentLesson}}
    case START_TUTORIAL:
      currentLesson.indexPtr = 0;
      return {...state, currentLesson: {...currentLesson}}
    case UNFREEZE:
      return {...state, shouldFreeze: false}
    case FREEZE:
      return {...state, shouldFreeze: true};
    case LESSON_COMPLETED: 
      return {...state, tutorialFinished: true}
    default:
      return state;
  }
}

const auth = (state=authInitialState, action) => {
  switch(action.type) {
    case "LOGGED_IN":
      return {currentUser: {...action.currentUser}, isLoggedIn: action.isLoggedIn}
    default: 
      return state
  }
}


const typephilApp = combineReducers({
  isLoggedIn,
  auth,
  app
})

export default typephilApp;