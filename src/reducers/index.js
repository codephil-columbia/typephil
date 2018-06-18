import {
  combineReducers
} from 'redux';

import {
  statsForUser,
  chapterProgressPercentage
 } from './homepage';

import {
  MOVE_INDEX_PTR,
  UNFREEZE,
  FREEZE,
  TUTORIAL_COMPLETED
} from "../actions/tutorial";

import {
  GET_CURRENT_LESSON,
  GET_CURRENT_LESSON_WAITING,
  GET_CURRENT_LESSON_FAILED
} from '../actions/homepage';

import {
  USER_PRESSED_KEY,
  VALIDATE_PRESSED_KEY,
  START_LESSON,
  STOP_LESSON
} from '../actions/tutorialContent';

import {
  FETCH_ALL_CHAPTERS_REQUEST,
  FETCH_ALL_CHAPTERS_SUCCESS,
  FETCH_ALL_CHAPTERS_FAILED,
  FETCH_ALL_PAIRS_REQUEST,
  FETCH_ALL_PAIRS_SUCCESS,
  FETCH_ALL_PAIRS_FAILED,
  FETCH_COMPLETED_LESSONS,
  FETCH_COMPLETED_LESSONS_SUCCESS,
  FETCH_COMPLETED_LESSONS_FAILED
} from '../actions/learn';

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
    name: "",
    chapterID: "",
    lessonID: "",
    chapterImage: null,
    hasFinishedLoading: false,
    showSpinner: true,
    lessonInformation: [
      "Most keyboards have two Shift keys: one on the left and one on the right.",
      `The Shift key is pressed using the pinky finger. Check out the illustration
      below and press the Shift key to continue.`,
      `Most keyboards have two shift keys: one on the left and one on the right.`,
      `Shift keys can be tricky at first. It is recommended that you use the left 
      shift key when you are typing on the right side of the keyboard and the right
      shift key when are typing on the left side of the keyboard.`,
      ""
    ],
    lessonContent: [
      "",
      "",
      "",
      "",
      "aaa AAA aaa AAA ;;; ::: ;;; aA aS Aa Ss :; ;: Ll lL",
    ],
    indexPtr: 0
  },

  chapterLessonPairs: [],
  allChapters: [],
  completedLessons: [],
  isLoading: false,
  shouldFreeze: true,
  tutorialFinished: false
}

export const isLoggedIn = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return true
    case 'LOGIN_FAILED': // unnecessary
      return false
    default:
      return false 
  }
}

export const app = (state = initialAppState, action) => {
  let {
    currentLesson
  } = state;
  switch (action.type) {
    case "DISPATCHED_TUTORIAL":
      return {
        state,
        ...action.currentLesson
      }
    case MOVE_INDEX_PTR:
      let {
        indexPtr
      } = action;
      currentLesson.indexPtr = indexPtr;
      return { ...state,
        currentLesson: { ...currentLesson
        }
      }
    case UNFREEZE:
      return { ...state,
        shouldFreeze: false
      }
    case FREEZE:
      return { ...state,
        shouldFreeze: true
      }
    case TUTORIAL_COMPLETED:
      return { ...state,
        tutorialFinished: true
      }
    case USER_PRESSED_KEY:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      return { ...state
      }
    case VALIDATE_PRESSED_KEY:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      return { ...state
      }
    case START_LESSON:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      state.currentLessonSession.currentLessonContent = currentLesson.lessonContent[currentLesson.indexPtr];
      return { ...state
      }
    case STOP_LESSON:
      state.currentLessonSession = lessonSession(state.currentLessonSession, action);
      return { ...state
      };
    case GET_CURRENT_LESSON:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state 
      };
    case FETCH_ALL_CHAPTERS_SUCCESS:
      state.allChapters = allChapters(state.allChapters, action);
      return {...state }
    case FETCH_ALL_CHAPTERS_REQUEST:
      return {...state, isLoading: true}
    case GET_CURRENT_LESSON_WAITING:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state 
      };
    case FETCH_ALL_PAIRS_REQUEST:
      state.isLoading = true;
      return { ...state };
    case FETCH_ALL_PAIRS_SUCCESS:
      const { data } = action;
      state.chapterLessonPairs = data
      state.isLoading = false;
      return { ...state };
    case FETCH_COMPLETED_LESSONS:
      return completedLessons(state, action);
    case FETCH_COMPLETED_LESSONS_SUCCESS:
      return completedLessons(state, action);
    default:
      return state;
  }
}

export const completedLessons = (state = app, action) => {
  switch(action.type) {
    case FETCH_COMPLETED_LESSONS:
      return {...state, isLoading:true }
    case FETCH_COMPLETED_LESSONS_SUCCESS:
      const { data } = action;
      return {...state, completedLessons:data}
    default:
      return state;
  }
}

export const allChapters = (state = app.allChapters, action) => {
  switch(action.type) {
    case FETCH_ALL_CHAPTERS_SUCCESS:
      const { data } = action;
      return [...data];
    default:
      return state;
  }
}

export const currentLessonReducer = (state = app.currentLesson, action) => {
  switch(action.type) {
    case GET_CURRENT_LESSON:
      const {
        chapterid, 
        chapterimage, 
        chaptername,
        lessonid,
        lessonname,
      } = action.data; 
      return { ...state,
        chapterID: chapterid,
        chapterImage: chapterimage,
        chapterName: chaptername,
        lessondID: lessonid,
        lessonName: lessonname,
        hasFinishedLoading: true,
        showSpinner: false
      }
    case GET_CURRENT_LESSON_WAITING:
      return {...state,
        showSpinner: true,
        hasFinishedLoading: false
      }  
    default:
      return state;
  }
}

export const lessonSession = (state = app.currentLessonSession, action) => {
  const {
    time
  } = action
  switch (action.type) {
    case USER_PRESSED_KEY:
      const {
        key
      } = action;
      console.log(key);
      if (key === "Meta" || key === "Shift" ||
        key === 'CapsLock' || key === 'Tab') {
        return { ...state,
          pressedKey: null,
          shouldValidate: false
        };
      } else if (key === "Backspace") {
        let newCharPtr = state.charPtr === 0 ? state.charPtr : --state.charPtr;
        const wasMissedChar = state.missedChar;
        if (wasMissedChar) {
          state.missed.pop();
          return { ...state,
            missed: state.missed,
            charPtr: newCharPtr,
            shouldValidate: false
          }
        } else {
          state.correct.pop();
          return { ...state,
            correct: state.correct,
            charPtr: newCharPtr,
            shouldValidate: false
          }
        }
      } else {
        return { ...state,
          pressedKey: key,
          shouldValidate: true
        };
      }
    case VALIDATE_PRESSED_KEY:
      const {
        got
      } = action;
      let {
        charPtr,
        currentLessonContent
      } = state;
      console.log(got);
      if (got !== currentLessonContent[charPtr]) {
        const missed = [...state.missed, got]
        return {
          ...state,
          missed,
          charPtr: ++charPtr,
          missedChar: true
        }
      } else {
        const correct = [...state.correct, got];
        return {
          ...state,
          correct,
          charPtr: ++charPtr,
          missedChar: false
        }
      }
    case START_LESSON:
      return { ...state,
        startTime: time,
        isFirstChar: false
      }
    case STOP_LESSON:
      return { ...state,
        endTime: time
      }
    default:
      return state;
  }
}

export const auth = (state = authInitialState, action) => {
  console.log("ACTION", action);
  switch (action.type) {
    case "LOGGED_IN":
      return {
        currentUser: {
          ...action.currentUser
        },
        isLoggedIn: action.isLoggedIn
      }
    default:
      return state
  }
}


// const typephilApp = combineReducers({
//   isLoggedIn,
//   auth,
//   statsForUser,
//   chapterProgressPercentage,
//   app
// })

// export 
