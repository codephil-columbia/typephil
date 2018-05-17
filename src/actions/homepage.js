import axios from 'axios';

const URL = "http://ec2-18-236-94-235.us-west-2.compute.amazonaw.com:8081"

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
  console.log("DISPATCHING")
  return function (dispatch) {
    dispatch(getCurrentLessonForUserWaiting());
    return axios.post(`http://localhost:5000/lesson/getNext`, {
        uid
      })
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