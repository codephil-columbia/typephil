import axios from 'axios';

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
    return axios.post('http://localhost:5000/lesson/getNext', { uid })
      .then(res => {
        const {
          data
        } = res;
        console.log(data);
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
    return axios.post('http://localhost:5000/hollisticStats', { uid })
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
    return axios.post("http://localhost:5000/chapter/getChapterProgress", { uid })
      .then(res => {
        const { data } = res;
        dispatch(getChapterProgressSuccess(data));
      })
  }
}