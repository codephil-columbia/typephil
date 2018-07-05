import { LOGGED_IN } from '../actions/auth';

export const auth = (state = authInitialState, action) => {
    const { data } = action;
    switch (action.type) {
      case LOGGED_IN:
        return {
          currentUser: {
            username: data.username,
            uid: data.uid,
            firstName: data.firstName,
            lastName: data.lastName,
          },
          isLoggedIn: true
        }
      default:
        return state
    }
  }

  const authInitialState = {
    isLoggedIn: false,
    currentUser: {
      username: "",
      uid: "",
    }
  }