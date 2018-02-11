import { combineReducers } from 'redux';

const initialState = {
	isLoggedIn: false
}

const isLoggedIn = (state = false, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return true
    case 'LOGIN_FAILED':
      return false
    default:
      return state
  }
}

const typephilApp = combineReducers({
  isLoggedIn
})

export default typephilApp;