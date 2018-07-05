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

export const fetchAllChapterNames = _ => {
  return function(dispatch) {
    dispatch(fetchAllChapterNamesRequest());
    return axios.get(`${api_url}/chapter/getAllNames`)
      .then(res => {
        const {
          data
        } = res;
        dispatch(fetchAllChapterNamesSuccess(data));
      })
      .catch(err => {
        dispatch(fetchAllChapterNamesFailed(err));
      })
  }
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

export const fetchAllPairs = uid => {
  return function(dispatch) {
    dispatch(fetchAllPairsRequest());
    return axios.get(`${api_url}/chapter/getAllInfo`)
      .then(res => {
        const {
          data
        } = res;
        dispatch(fetchAllPairsSuccess(data));
      })
      .catch(err => {
        dispatch(fetchAllPairsFailed(err));
      })
  }
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


export const fetchCompletedLessons = uid => {
  return function(dispatch) {
    dispatch(fetchCompletedLessonsRequest());
    return axios.post(`${api_url}/lesson/getCompletedLessons`, { uid })
      .then(res => {
        const { data } = res;
        dispatch(fetchCompletedLessonsSuccess(data));
      })
      .catch(err => {
        dispatch(fetchCompletedLessonsFailed(err));
      })
  }
}