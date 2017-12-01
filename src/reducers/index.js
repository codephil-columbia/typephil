import { combineReducers } from 'redux';

const initialState = {
	isLoggedIn: false
}

const isLoggedIn = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, { isLoggedIn: true });
    case 'LOGIN_FAILED':
    	return Object.assign({}, state, { isLoggedIn: false });
    default:
      return false
  }
}

const typephilApp = combineReducers({
  isLoggedIn
})

export default typephilApp;