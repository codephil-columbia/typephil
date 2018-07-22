import {
  POST_TUTORIAL_SUCCESS
} from "../actions/tutorial";

import {
  GET_CURRENT_LESSON,
  GET_CURRENT_LESSON_WAITING,
} from '../actions/homepage';

import {
  FETCH_ALL_CHAPTERS_REQUEST,
  FETCH_ALL_CHAPTERS_SUCCESS,
  FETCH_ALL_PAIRS_REQUEST,
  FETCH_ALL_PAIRS_SUCCESS,
  FETCH_COMPLETED_LESSONS,
  FETCH_COMPLETED_LESSONS_SUCCESS,
  RESET_CURRENT_LESSON
} from '../actions/learn';

const initialAppState = {
  currentLesson: {
    name: "",
    chapterID: "",
    lessonID: "",
    chapterImage: null,
    hasFinishedLoading: false,
    showSpinner: true,
    lessonInformation: [
    ],
    lessonContent: [
    ],
    hasPostedResults: false
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
    case GET_CURRENT_LESSON:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state };
    case FETCH_ALL_CHAPTERS_SUCCESS:
      state.allChapters = allChapters(state.allChapters, action);
      return {...state }
    case FETCH_ALL_CHAPTERS_REQUEST:
      return {...state, isLoading: true}
    case GET_CURRENT_LESSON_WAITING:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state };
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
    case POST_TUTORIAL_SUCCESS:
      state.currentLesson = currentLessonReducer(state.currentLesson, action)
      return { ...state };
    case RESET_CURRENT_LESSON:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state };
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
    case RESET_CURRENT_LESSON:
      const { lessonID } = action;
      return { ...state, lessonID };
    case GET_CURRENT_LESSON:
      const {
        chapterid, 
        chapterimage, 
        chaptername,
        lessonid,
        lessonname,
        lessontext,
        lessondescriptions
      } = action.data; 
      return { ...state,
        chapterID: chapterid,
        chapterImage: chapterimage,
        chapterName: chaptername,
        lessonID: lessonid,
        lessonName: lessonname,
        lessonText: lessontext,
        lessonDescriptions: lessondescriptions,
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