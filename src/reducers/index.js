import { combineReducers } from 'redux';

const initialState = {
}

const isLoggedIn = (state = initialState, action) => {
  console.log('hitting reducer')
  switch(action.type) {
    case 'LOGIN_SUCCESS':
      console.log('was success');
      return true
    default:
      return false
  }
}

const typephilApp = combineReducers({
  isLoggedIn
})

export default typephilApp;