import { LOGGED_IN } from '../actions/auth';
import { REHDYRATE } from 'redux-persist/lib/constants';

export const auth = (state = authInitialState, action) => {
    const { data } = action;
    switch (action.type) {
      case LOGGED_IN:
        return {
          auth: {
            currentUser: {
              username: data.username,
              uid: data.uid,
              firstName: data.firstName,
              lastName: data.lastName,
            },
            isLoggedIn: true
          }
        };
      case REHDYRATE:
        return {
          auth: {
            currentUser: {
              username: data.username,
              uid: data.uid,
              firstName: data.firstName,
              lastName: data.lastName,
            },
            isLoggedIn: true
          }
        };
      default:
        return state
    }
  };

const authInitialState = {
  auth: {
    currentUser: {
      username: "",
      uid: "",
      firstName: "",
      lastName: "",
    },
    isLoggedIn: false
  }
};

export default auth;
