import { combineReducers } from 'redux';

import { MOVE_INDEX_PTR, UNFREEZE, FREEZE, TUTORIAL_COMPLETED } from "../actions/tutorial";
import { USER_PRESSED_KEY, VALIDATE_PRESSED_KEY, START_LESSON, STOP_LESSON } from '../actions/tutorialContent';
 
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
  currentLessonSession: {
    startTime: null,
    endTime: null,
    pressedKey: null,
    missed: [],
    correct: [],
    charPtr:0,
    currentLessonContent: null,
    shouldValidate: false,
    isFirstChar: true
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
    case UNFREEZE:
      return {...state, shouldFreeze: false}
    case FREEZE:
      return {...state, shouldFreeze: true}
    case TUTORIAL_COMPLETED: 
      return {...state, tutorialFinished: true}
    case USER_PRESSED_KEY:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      return {...state}
    case VALIDATE_PRESSED_KEY:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      return {...state}
    case START_LESSON:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      state.currentLessonSession.currentLessonContent = currentLesson.lessonContent[currentLesson.indexPtr];
      return {...state}
    case STOP_LESSON:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      return {...state};
    default:
      return state;
  }
}

const lessonSession = (state=app.currentLessonSession, action) => {
  const { time } = action
  switch(action.type) {
    case USER_PRESSED_KEY:
      const { key } = action;
      console.log(key !== "Meta")
      if(key === "Meta" || key === "Shift" || 
        key === 'CapsLock' || key === 'Tab') {
          return {...state, pressedKey:null, shouldValidate:false};
        } else {
          return {...state, pressedKey:key, shouldValidate:true};
        }
    case VALIDATE_PRESSED_KEY:
      const { got } = action;
      let { charPtr, currentLessonContent } = state;
      console.log(got);
      if(got !== currentLessonContent[charPtr]) {
        const missed = [...state.missed, got]
        return {
          ...state, 
          missed,
          charPtr: ++charPtr
        }
      } else {
        const correct = [...state.correct, got];
        return {
          ...state,
          correct,
          charPtr: ++charPtr
        }
      }
    case START_LESSON:
      return {...state, startTime:time, isFirstChar:false}
    case STOP_LESSON:
      return {...state, endTime:time}
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