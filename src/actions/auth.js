import axios from 'axios';
import {api_url} from '../constants'
import {persistor, store} from '../store'

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
  console.log(res);
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

export const dispatchLogin = (username, password) => (dispatch) =>
  new Promise(function(resolve, reject) {
    const endpoint = api_url + '/user/authenticate';
    axios.post(endpoint, {username, password})
    .then(res => {
        if(res.status !== 200) {
          dispatch(loginError());
          reject(0); // 0 : failed login. TODO unhack this since props are passed
        } else {
          store.dispatch(login(res));
          dispatch(login(res));
          //store.dispatch(login(username));
          resolve(1); // 1 : successful login
        }
    }).catch(err => {
      dispatch(loginError());
      reject(0);
    })
  });

// export const dispatchLogin = (username, password) => dispatch => {
//   axios.post(`${api_url}/user/authenticate`)
//     .then(res => {
//       dispatch(login(res));
//     })
//     .catch(err => {
//       dispatch(loginError());
//     })
// }

export const dispatchSignup = (data) => dispatch => { 
  const endpoint = api_url + '/user/';
  // return function(dispatch) {
  //   axios.post(endpoint, data)
  //   .then(res => {
  //     if(res.status !== 200) {
  //       dispatch(signupError());
  //     }
  //     dispatch(signupSuccess());
  //     dispatch(login(res)); // isusername correct key? dispatch vs store.dispatch?
  //   }).catch(err => {
  //     dispatch(signupError());
  //   });
  // }
  return new Promise((resolve, reject) => {
    axios.post(endpoint, data)
    .then(res => {
      if(res.status !== 200) {
        dispatch(signupError());
      }
      dispatch(signupSuccess());
      dispatch(login(res)); // isusername correct key? dispatch vs store.dispatch?
      resolve();
    }).catch(err => {
      dispatch(signupError());
      reject(err);
    });
  })
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
