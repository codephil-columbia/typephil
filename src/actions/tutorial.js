import axios from 'axios';
import { api_url } from '../constants';
import { getCurrentLessonForUser } from './homepage';

export const REDIRECT_TO_NEXT_LESSON = "REDIRECT_TO_NEXT_LESSON";
export const redirectToNextLesson = () => ({
  type: REDIRECT_TO_NEXT_LESSON
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

export const FETCH_LESSON_SUCCESS = "FETCH_LESSON_SUCCESS";
const fetchLessonSuccess = (data) => ({
  data,
  type: FETCH_LESSON_SUCCESS
});

export const FETCH_LESSON = "FETCH_LESSON";
const fetchLessonRequest = () => ({
  type: FETCH_LESSON
});

export const RESET_TUTORIAL = "RESET_TUTORIAL";
export const resetTutorial = () => ({
  type: RESET_TUTORIAL
})

export const POST_TUTORIAL = "POST_TUTORIAL";
export const postTutorialResults = (tutorialResult, source) => (dispatch) => {
  axios.post(`${api_url}/lesson/complete`, tutorialResult)
    .then(res => {
      dispatch(postTutorialSuccess());
      if(source === "HomePage") { 
        dispatch(getCurrentLessonForUser(tutorialResult.uid));
        dispatch(resetTutorial())
      }
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