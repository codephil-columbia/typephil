import { combineReducers } from 'redux';

const initialState = {
  usernameValid = false
}

const isSignedUp = (state = false, action) => {
  switch(action.type) {
    case 'SIGNUP_SUCCESS':
      return true
    case 'SIGNUP_FAILED':
      return false
    default:
      return state
  }
}

const usernameValid = (state = false, action) => {
  switch(action.type) {
    case 'USERNAME_VALID':
      return true
    case 'USERNAME_INVALID':
      return false
    default:
      return state
  }
}
