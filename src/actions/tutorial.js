import axios from 'axios';
import { api_url } from '../constants';
import { getCurrentLessonForUser } from './homepage';

const shouldFetchCurrentLesson = (state) => {
  return state.app.currentLesson.lessonID === "";
}

export const FETCH_LESSON_SUCCESS = "FETCH_LESSON_SUCCESS";
const fetchLessonSuccess = (data) => ({
  data,
  type: FETCH_LESSON_SUCCESS
});

export const FETCH_LESSON = "FETCH_LESSON";
const fetchLessonRequest = () => ({
  type: FETCH_LESSON
});

export const fetchLesson = (lessonId) => dispatch => {
  dispatch(fetchLessonRequest())
  axios.post(`${api_url}/lesson/get`, {lessonid: lessonId})
    .then(res => {
      dispatch(fetchLessonSuccess(res.data));
    })
    .catch(err => {
      console.log(err);
    })
}

export const fetchCurrentLessonIfNeeded = (uid) => {
  return function(dispatch, getState) {
    if(shouldFetchCurrentLesson(getState())) {
      dispatch(getCurrentLessonForUser(uid));
    }
  }
}

export const POST_TUTORIAL = "POST_TUTORIAL";
export const postTutorialResults = (tutorialResult) => (dispatch) => {
  axios.post(`${api_url}/lesson/test`, tutorialResult)
    .then(res => {
      dispatch(postTutorialSuccess());
    }).catch(_ => {
      dispatch(postTutorialError());
    })
}

export const POST_TUTORIAL_ERROR = "POST_TUTORIAL_ERROR";
export const postTutorialError = () => ({
  type: POST_TUTORIAL_ERROR
})

export const POST_TUTORIAL_SUCCESS = "POST_TUTORIAL_SUCCESS";
export const postTutorialSuccess = () => ({
  type: POST_TUTORIAL_SUCCESS
})