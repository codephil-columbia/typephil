import axios from 'axios';
import { api_url } from '../constants';

export const GET_CURRENT_LESSON = "GET_CURRENT_LESSON";
export const GET_CURRENT_LESSON_WAITING = "GET_CURRENT_LESSON_WAITING";
export const GET_CURRENT_LESSON_FAILED = "GET_CURRENT_LESSON_FAILED";

const getCurrentLessonForUserSuccess = data => {
  return {
    type: GET_CURRENT_LESSON,
    data
  }
}

const getCurrentLessonForUserWaiting = _ => {
  return {
    type: GET_CURRENT_LESSON_WAITING
  }
}

const getCurrentLessonForUserFailed = err => {
  return {
    type: GET_CURRENT_LESSON_FAILED,
    err
  }
}

export const getCurrentLessonForUser = uid => dispatch => {
  dispatch(getCurrentLessonForUserWaiting());
  return Promise.all([
    axios.get(`${api_url}/lesson/current/${uid}`),
    axios.get(`${api_url}/chapter/current/${uid}`)
  ]).then(resps => {
    const currentLesson = resps[0].data;
    const currentChapter = resps[1].data;

    dispatch(getCurrentLessonForUserSuccess({ currentLesson, currentChapter }));
  }).catch(err => {
    console.error(err);
  })
}

export const GET_AVG_STATS_REQ = "GET_AVG_STATS";
export const GET_AVG_STATS_SUCCESS = "GET_AVG_STATS_SUCCESS";

const getAverageStatsSuccess = (data) => {
  return {
    type: GET_AVG_STATS_SUCCESS,
    data
  }
}

const getAverageStatsReq = () => {
  return {
    type: GET_AVG_STATS_REQ
  }
} 

export const getAverageStats = uid => dispatch => {
  dispatch(getAverageStatsReq());
  return axios.get(`${api_url}/stats/tutorial/lesson/${uid}`)
  .then(res => {
    const { wpm, accuracy } = res.data;
    dispatch(getAverageStatsSuccess({ wpm, accuracy }));
  })
  .catch(err => {
    console.error(err);
  })
}

export const GET_CHAPTER_PROGRESS = "GET_CHAPTER_PROGRESS";
export const GET_CHAPTER_PROGRESS_SUCCESS = "GET_CHAPTER_PROGRESS_SUCCESS";

const getChapterProgressSuccess = (data) => {
  return {
    type: GET_CHAPTER_PROGRESS_SUCCESS,
    data
  }
}

const getChapterProgressReq = () => {
  return {
    type: GET_AVG_STATS_REQ
  }
}

export const getChapterProgress = uid => dispatch => {
  dispatch(getChapterProgressReq());
  return axios.get(`${api_url}/stats/tutorial/chapter/${uid}`)
    .then(res => {
      const { percentComplete } = res.data;
      dispatch(getChapterProgressSuccess(percentComplete));
    })
    .catch(err => {
      console.error(err);
    })
}
