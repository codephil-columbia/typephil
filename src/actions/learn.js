import axios from 'axios';
import { api_url } from '../constants';

export const FETCH_ALL_CHAPTERS_REQUEST = "FETCH_ALL_CHAPTERS_REQUEST"
export const FETCH_ALL_CHAPTERS_SUCCESS = "FETCH_ALL_CHAPTERS_SUCCESS";
export const FETCH_ALL_CHAPTERS_FAILED = "FETCH_ALL_CHAPTERS_FAILED";

const fetchAllChapterNamesRequest = _ => {
  return {
    type: FETCH_ALL_CHAPTERS_REQUEST
  }
}

const fetchAllChapterNamesSuccess = data => {
  return {
    type: FETCH_ALL_CHAPTERS_SUCCESS,
    data
  }
}

const fetchAllChapterNamesFailed = err => {
  return {
    type: FETCH_ALL_CHAPTERS_FAILED,
    err
  }
}

export const fetchAllChapterNames = _ => dispatch => {
  dispatch(fetchAllChapterNamesRequest());
  return axios.get(`${api_url}/chapter/`)
    .then(res => {
      const chapters = res.data;
      const chapterNames = chapters.map(c => c.chapterName);

      dispatch(fetchAllChapterNamesSuccess(chapterNames));
    })
    .catch(err => {
      dispatch(fetchAllChapterNamesFailed(err));
    })
}

export const FETCH_ALL_PAIRS_REQUEST = "FETCH_ALL_PAIRS_REQUEST"
export const FETCH_ALL_PAIRS_SUCCESS = "FETCH_ALL_PAIRS_SUCCESS";
export const FETCH_ALL_PAIRS_FAILED = "FETCH_ALL_PAIRS_FAILED";

const fetchAllPairsRequest = _ => {
  return {
    type: FETCH_ALL_PAIRS_REQUEST
  }
}

const fetchAllPairsSuccess = data => {
  return {
    type: FETCH_ALL_PAIRS_SUCCESS,
    data
  }
}

const fetchAllPairsFailed = err => {
  return {
    type: FETCH_ALL_PAIRS_FAILED,
    err
  }
}

export const fetchAllPairs = uid => dispatch => {
  dispatch(fetchAllPairsRequest());

  return Promise.all([
    axios.get(`${api_url}/chapter/`),
    axios.get(`${api_url}/lesson/`)
  ]).then(([r1, r2]) => {
    const chapters = r1.data;
    const lessons = r2.data;
    
    let lessonsPerChapter = chapters.map(chapter => {
      const lessonsInChapter = lessons.filter(l => l.chapterID === chapter.chapterID)
      return {chapter, lessons:lessonsInChapter}
    })
    dispatch(fetchAllPairsSuccess(lessonsPerChapter));
  }).catch(err => {
    throw new Error(err);
  })
}

export const FETCH_COMPLETED_LESSONS = "FETCH_COMPLETED_LESSONS"
export const FETCH_COMPLETED_LESSONS_SUCCESS = "FETCH_COMPLETED_LESSONS_SUCCESS"
export const FETCH_COMPLETED_LESSONS_FAILED = "FETCH_COMPLETED_LESSONS_FAILED"

const fetchCompletedLessonsRequest = _ => {
  return {
    type: FETCH_COMPLETED_LESSONS
  }
}

const fetchCompletedLessonsSuccess = data => {
  return {
    type: FETCH_COMPLETED_LESSONS_SUCCESS,
    data
  }
}

const fetchCompletedLessonsFailed = err => {
  return {
    type: FETCH_COMPLETED_LESSONS_FAILED,
    err
  }
}


export const fetchCompletedLessons = uid => dispatch => {
  dispatch(fetchCompletedLessonsRequest());

  return Promise.all([
    axios.get(`${api_url}/records/tutorial/lessons/${uid}`),
    axios.get(`${api_url}/lesson/`)
  ]).then(([r1, r2]) => {
    const recordIDs = new Set(r1.data.map(record => record.lessonID));
    const lessons = r2.data;

    const completedLessons = lessons.filter(lesson => recordIDs.has(lesson.lessonID));
    dispatch(fetchCompletedLessonsSuccess(completedLessons));
  }).catch(err => {
    throw new Error(err);
  })
}

export const RESET_CURRENT_LESSON = "RESET_CURRENT_LESSON";
export const restartLesson = lessonID => ({
  lessonID,
  type: RESET_CURRENT_LESSON
})

/*** */

export const FETCH_LESSON_BY_ID = "FETCH_LESSON_BY_ID";
const fetchLessonByIdReq = () => ({
  type: FETCH_LESSON_BY_ID
})

export const FETCH_LESSON_BY_ID_SUCCESS = "FETCH_LESSON_BY_ID_SUCCESS";
const fetchLessonByIdSuccess = (data) => ({
  data,
  type: FETCH_LESSON_BY_ID_SUCCESS,
  source: "LearnPage"
})

export const fetchLessonById = ({ lessonID }) => dispatch => {
  dispatch(fetchLessonByIdReq())
  return axios.post(`${api_url}/lesson/get`, { lessonID })
    .then(({ data }) => {
      dispatch(fetchLessonByIdSuccess(data));
    })
    .catch(err => console.log(err));
}