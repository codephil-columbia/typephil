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

export const getAverageStats = uid => dispatch => {
  dispatch(getAverageStatsReq());
  return axios.get(`${api_url}/stats/tutorial/lesson/${uid}`)
  .then(res => {
    const records = res.data;
    let avgWPM = 0;
    let avgAccuracy = 0;

    records.forEach(({ wpm, accuracy }) => {
      avgWPM += Number(wpm);
      avgAccuracy += Number(accuracy); 
    });

    dispatch(getAverageStatsSuccess({ wpm: avgWPM/records.length, accuracy: avgAccuracy/records.length }));
  })
  .catch(err => {
    throw new Error(err);
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
  return Promise.all([
    axios.get(`${api_url}/lesson/current/${uid}`),
    axios.get(`${api_url}/lesson/`),
    axios.get(`${api_url}/records/tutorial/lessons/${uid}`)
  ]).then(resps => {
    const currentLesson = resps[0].data;
    const lessons = resps[1].data;
    const records = resps[2].data;

    const lessonsInChapterCount = lessons.filter(lesson => lesson.chapterID === currentLesson.chapterID).length;
    const finshedLessonsInChapter = records.filter(record => record.chapterID === currentLesson.chapterID).length;
    dispatch(getChapterProgressSuccess(Number(finshedLessonsInChapter/lessonsInChapterCount)));
  }).catch(err => {
    throw new Error(err);
  })
}
