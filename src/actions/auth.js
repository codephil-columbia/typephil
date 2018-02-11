import axios from 'axios';

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

export const dispatchLogin = (email, password) => {
  return function(dispatch) {
    return axios.post('http://localhost:8081/auth/login', {email, password})
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