import axios from 'axios';
import {api_url} from '../constants'

/*export const usernameValid = (valid) => {
  return {
    type: valid ? 'USERNAME_VALID' : 'USERNAME_INVALID'
  }
}*/

export const signupSuccess = () => {
  return {
    type: 'SIGNUP_SUCCESS'
  }
}

export const signupError = err => {
  return {
    type: 'SIGNUP_FAILED',
    payload: 'error'
  }
}

export const loginSuccess = () => {
  return {
    type: 'LOGIN_SUCCESS'
  }
}

export const loginError = err => {
  return {
    type: 'LOGIN_FAILED',
    payload: 'error'
  }
}

export const dispatchLogin = (username, password) => {
  const endpoint = api_url + '/auth/login';
  return function(dispatch) {
    axios.post(endpoint, {username, password})
    .then(res => {
        if(res.status !== 200) {
            dispatch(loginError());
        } 
        dispatch(loginSuccess());
    }).catch(err => {
        dispatch(loginError());
    })
  }
}

export const dispatchSignup = (username, email, password, occupation) => {
  const endpoint = api_url + '/auth/signup';
  return function(dispatch) {
    axios.post(endpoint, {username, email, password, occupation})
    .then(res => {
      if(res.status !== 200) {
        dispatch(signupError());
      }
      dispatch(signupSuccess());
    }).catch(err => {
      dispatch(signupError());
    });
  }
}

/*export const dispatchUsername = (username) => {
  const endpoint = api_url + '/auth/usernameValid';
  return function(dispatch) {
    axios.post(endpoint, {username})
    .then(res => {
      if(res.status !== 200) {
        dispatch(usernameValid(false));
      }
      dispatch(usernameValid(true));
    }).catch(err => {
      dispatch(usernameValid(false));
    });
  }
}*/
