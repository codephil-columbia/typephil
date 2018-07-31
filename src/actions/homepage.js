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

export const getCurrentLessonForUser = uid => {
  return function (dispatch) {
    dispatch(getCurrentLessonForUserWaiting());
    console.log( ">>>>> UID DICT ", { uid } );
    console.log( `${api_url}/lesson/getCurrent` );
    return axios.post(`${api_url}/lesson/getCurrent`, { uid })
      .then(res => {
        const { data } = res;
        dispatch(getCurrentLessonForUserSuccess(data));
      })
      .catch(err => {
        dispatch(getCurrentLessonForUserFailed(err));
      })
  }
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

export const getAverageStats = (uid) => {
  return function(dispatch) {
    dispatch(getAverageStatsReq());
    return axios.post(`${api_url}/hollisticStats`, { uid })
      .then(res => {
        const { data } = res;
        dispatch(getAverageStatsSuccess(data));
      })
      .catch(err => {
        console.log('err');
      })
  }
}

//getChapterProgress

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

export const getChapterProgress = (uid) => {
  return function(dispatch) {
    dispatch(getChapterProgressReq());
    return axios.post(`${api_url}/chapter/getChapterProgress`, { uid })
      .then(res => {
        const { data } = res;
        dispatch(getChapterProgressSuccess(data));
      })
  }
}
