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
    chapterID: "e6a18785-98c5-41bc-ad98-ec5d3a243d15",
    lessonID: "d3f9c2a3-1edf-42a6-a24d-3a4ad4683036",
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
      "hhhhhhhhhhhhh lL",
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
