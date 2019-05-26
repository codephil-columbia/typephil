import { LOG_IN, LOG_OUT } from '../actions/auth';

export const auth = (state = authInitialState, action) => {
    const { payload } = action;
    switch (action.type) {
      case LOG_IN:
        return {
          currentUser: {
            username: payload.username,
            uid: payload.uid,
            firstName: payload.firstName,
            lastName: payload.lastName
          },
          isLoggedIn: payload.isLoggedIn
        }
      case LOG_OUT:
        return authInitialState
      default:
        return state
    }
  };

const authInitialState = {
  currentUser: {
    username: "",
    uid: "",
    firstName: "",
    lastName: "",
  },
  isLoggedIn: false
};

export default auth;
