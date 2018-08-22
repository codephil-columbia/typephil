import {
  POST_TUTORIAL_SUCCESS,
  FETCH_LESSON_SUCCESS,
  FETCH_LESSON,
  RESET_TUTORIAL
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
  RESET_CURRENT_LESSON,
  FETCH_LESSON_BY_ID_SUCCESS,
  FETCH_LESSON_BY_ID
} from '../actions/learn';

const initialAppState = {
  currentLesson: {
    name: "",
    chapterID: "",
    lessonID: "",
    chapterImage: null,
    hasFinishedLoading: false,
    showSpinner: true,
    lessonText: [
    ],
    lessonDescription: [
    ],
    lessonImages: [],
    lessonName: "",
    hasPostedResults: false
  },
  // Terrible name but roll with it for now until I can rewrite app state tree
  chosenLessonFromLearn: {
    name: "",
    chapterID: "",
    lessonID: "",
    chapterImage: null,
    hasFinishedLoading: false,
    showSpinner: true,
    lessonText: [
    ],
    lessonDescriptions: [
    ],
    lessonImages: [],
    hasPostedResults: false
  },
  source: "HomePage",
  chapterLessonPairs: [],
  allChapters: [],
  completedLessons: [],
  isLoading: false,
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
  switch (action.type) {
    case GET_CURRENT_LESSON:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state, source: "HomePage" };
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
    case FETCH_LESSON: 
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state }
    case FETCH_LESSON_SUCCESS:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state };
    case RESET_TUTORIAL:
      state.currentLesson = currentLessonReducer(state.currentLesson, action);
      return { ...state };
    case FETCH_LESSON_BY_ID_SUCCESS:
      state.chosenLessonFromLearn = chosenLessonFromLearnReducer(state.chosenLessonFromLearn, action);
      return { ...state,  isLoading: false, source: "LearnPage" };
    case FETCH_LESSON_BY_ID:
      return { ...state, isLoading: true }
    default:
      return state;
  }
}

export const chosenLessonFromLearnReducer = (state = app.chosenLessonFromLearn, action) => {
  switch(action.type) {
    case FETCH_LESSON_BY_ID_SUCCESS:
    const {
      ChapterID, 
      LessonID,
      LessonName,
      LessonText,
      LessonDescriptions,
      Image
    } = action.data; 
    return { 
      ...state,
      chapterID: ChapterID,
      lessonID: LessonID,
      lessonName: LessonName,
      lessonText: LessonText,
      lessonDescriptions: LessonDescriptions,
      lessonImages: Image
    }
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
    case FETCH_LESSON:
      return { ...state, hasFinishedLoading: false };
    case GET_CURRENT_LESSON:
      const {
        chapterid, 
        chapterimage, 
        chaptername,
        lessonid,
        lessonname,
        lessontext,
        lessondescriptions,
        lessonimages
      } = action.data; 
      return { ...state,
        chapterID: chapterid,
        chapterImage: chapterimage,
        chapterName: chaptername,
        lessonID: lessonid,
        lessonName: lessonname,
        lessonText: lessontext,
        lessonDescriptions: lessondescriptions,
        lessonImages: lessonimages,
        hasFinishedLoading: true,
        showSpinner: false
      }
    case FETCH_LESSON_SUCCESS: 
      return currentLessonHelper(state, action.data)
    case GET_CURRENT_LESSON_WAITING:
      return {...state,
        showSpinner: true,
        hasFinishedLoading: false
      } 
    default:
      return state;
  }
}

const currentLessonHelper = (state, data) => {
  return { ...state,
    chapterID: data.ChapterID,
    lessonID: data.LessonID,
    lessonName: data.LessonName,
    lessonText: data.LessonText,
    lessonDescriptions: data.LessonDescriptions,
    lessonImages: data.lessonimages,
    hasFinishedLoading: true,
    showSpinner: false
  }
}