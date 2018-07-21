import axios from 'axios';
import { api_url } from '../constants';
import { getCurrentLessonForUser } from './homepage';

export const MOVE_INDEX_PTR = "MOVE_INDEX_PTR";
export const TUTORIAL_COMPLETED = "TUTORIAL_COMPLETED"
export const UNFREEZE = "UNFREEZE";
export const FREEZE = "FREEZE";

export const moveIndexPtr = indexPtr => ({
  type: MOVE_INDEX_PTR,
  indexPtr
})

export const completedTutorial = () => ({
  type: TUTORIAL_COMPLETED
})

export const unFreeze = () => ({
  type: UNFREEZE 
})

export const freeze = () => ({
  type: FREEZE
})

const shouldFetchCurrentLesson = (state) => {
  return state.app.currentLesson.lessonID === "";
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
  console.log(tutorialResult);
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