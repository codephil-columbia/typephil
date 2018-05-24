import axios from 'axios';
import {api_url} from '../constants'

export const loginSuccess = () => {
    return {
        type: 'LOGIN_SUCCESS'
    }
}

export const loginError = err => {
  return {
    type: 'LOGIN_FAILED',
    payload: err
  }
}

export const dispatchLogin = (username, password) => {
  const endpoint = api_url + '/auth/login';
  console.log(endpoint, username, password);
  return function(dispatch) {
    return axios.post(endpoint, {username, password})
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

export const dispatchSignup = () => {
  // TODO
}
