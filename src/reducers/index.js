import { combineReducers } from 'redux';

const initialState = {
    isLoggedIn: false,
    auth,
    app
}

const authInitialState = {
  isLoggedIn: false,
  currentUser: {
    username: null, 
    uid: null, 
    email: null,
    school: null
  }
}

const initialAppState = {
  currentTutorial: {
    name: null,
    chapterID: null, 
    lessonID: null, 
    content: null
  }
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

const app = (state=initialAppState, action) => {
  switch(action.type) {
    case "DISPATCHED_TUTORIAL":
      return {state, ...action.currentTutorial}
    default:
      return state;
  }
}

const auth = (state=authInitialState, action) => {
  switch(action.type) {
    case "LOGGED_IN":
      return {currentUser: {...action.currentUser}, isLoggedIn: action.isLoggedIn}
    default: 
      return state
  }
}

const typephilApp = combineReducers({
  isLoggedIn,
  auth,
  app
})

export default typephilApp;
