import axios from 'axios';
import {api_url} from '../constants'
import persistor, {store} from '../store'
import { Authenticator, DatabaseAccessor } from '../offline/db';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const signupSuccess = () => {
  return {
    type: 'SIGNUP_SUCCESS'
  }
}

export const signupError = err => {
  return {
    type: 'SIGNUP_FAILED',
    payload: 'error'
  }
}

export const login = res => {
  const { data } = res;
  return {
    type: LOG_IN,
    payload: {
      username: data.username,
      uid: data.uid, 
      firstName: data.firstname,  
      lastName: data.lastname,
      isLoggedIn: true
    }
  }
}

export const loginError = err => {
  return {
    type: 'LOGIN_FAILED',
    payload: 'error'
  }
}

export const dispatchLogout = () => {
  return function(dispatch) {
    persistor.purge()
      .then(() => {
        dispatch({ type: 'LOG_OUT' });
      })
      .catch(err => dispatch({ type: 'PURGE_ERR', err }));
  }
}

export const dispatchLogin = (username, password) => {
    const authenticator = new Authenticator(new DatabaseAccessor());
    if (authenticator.authenticate(username, password) === Authenticator.AuthenticationResult.FAILED) {
      return loginError();
    } else {
      return login({"data": authenticator.getUser(username)});
    }
  };

// export const dispatchLogin = (username, password) => dispatch => {
//   axios.post(`${api_url}/user/authenticate`)
//     .then(res => {
//       dispatch(login(res));
//     })
//     .catch(err => {
//       dispatch(loginError());
//     })
// }

export const dispatchSignup = (data) => { 
  // const endpoint = api_url + '/user/';
  // return function(dispatch) {
  //   axios.post(endpoint, data)
  //   .then(res => {
  //     if(res.status !== 200) {
  //       dispatch(signupError());
  //     }
  //     dispatch(signupSuccess());
  //     store.dispatch(login(res)); // isusername correct key? dispatch vs store.dispatch?
  //   }).catch(err => {
  //     dispatch(signupError());
  //   });
  // }

  const userAcessor = new Authenticator(new DatabaseAccessor());
  if (userAcessor.signUp(data) === Authenticator.UserExists) {
    return signupError();
  } else {
    return signupSuccess();
  }
}

export const dispatchPassword = (username, password) => {
  const endpoint = api_url + '/auth/newPassword';
  return function(dispatch) {
    axios.post(endpoint, {username, password})
    .then(res => {
      if(res.status !== 200) {
        console.log('err'); // TODO fix
      }
      console.log('good');
    }).catch(err => {
      console.log('err');
    });
  }
}
