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

export const dispatchLogin = (username, password) => (dispatch) =>
  new Promise(function(resolve, reject) {
    const endpoint = api_url + '/auth/login';
    axios.post(endpoint, {username, password})
    .then(res => {
      console.log("RES: ", res);
        if(res.status !== 200) {
          dispatch(loginError());
          reject(0); // 0 : failed login. TODO unhack this since props are passed
        } else {
          dispatch(loginSuccess());
          resolve(1); // 1 : successful login
        }
    }).catch(err => {
        dispatch(loginError());
        reject(0);
    })
  });

export const dispatchSignup = (data) => { 
  const endpoint = api_url + '/auth/signup';
  return function(dispatch) {
    axios.post(endpoint, data)
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

export const dispatchPassword = (username, password) => {
  const endpoint = api_url + '/auth/newPassword';
  return function(dispatch) {
    axios.post(endpoint, {username, password})
    .then(res => {
      if(res.status !== 200) {
        console.log('err'); // TODO fix
      }
      console.log('good');
    }).catch(err => {
      console.log('err');
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
