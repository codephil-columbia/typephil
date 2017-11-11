import axios from 'axios';

export const dispatchLogginAsync = () => {
  return {
    type: 'LOGIN_SUCCESS'
  }
}

export const dispatchLoggin = (username, password) => {
  return function(dispatch) {
    return axios.post('http://160.39.167.33:3001/signup', {username, password}).then(res => {
      dispatch(dispatchLogginAsync);
    })
  }
}