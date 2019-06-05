import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import App from './app'

import './style/styles.scss';
import './style/index.scss';

import { store, persistor } from './store';
// import initLocalStorage, { createUser } from "./offline";

// initLocalStorage();
// createUser({username: "Cesar", password: "password"});
function initLocalStorage() {
  localStorage.setItem("users", JSON.stringify([]));
} 

if (process.env.REACT_APP_IS_OFFLINE) {
  initLocalStorage();
}

const Loading = () => {
  return <div>Loading</div>
}

ReactDOM.render(
  <PersistGate loading={<Loading/>} persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);
