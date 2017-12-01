import axios from 'axios';

export const dispatchLoginSuccess = () => {
  return {
    type: 'LOGIN_SUCCESS'
  }
}

export const dispatchLoginError = (err) => {
  return {
    type: 'LOGIN_FAILED',
    payload: err
  }
}

export const dispatchLogin = (username, password) => {
  return function(dispatch) {
    return axios.post('http://127.0.0.1:3001/auth/signup', {username, password})
    .then(res => {
      dispatch(dispatchLoginSuccess);
    }).catch(err => {
      dispatch(dispatchLoginError(err));
    })
  }
}