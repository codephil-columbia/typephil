import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import App from './app'

import { Authenticator, initLocalStorage, DatabaseAccessor } from "./offline/db";
import { User } from "./offline/models";
import { tutorialText } from "./tutorialText";

import './style/styles.scss';
import './style/index.scss';

import { store, persistor } from './store';

const Loading = () => {
  return <div>Loading</div>
}

if (!localStorage.getItem("hasBeenInited")) {
  localStorage.setItem("hasBeenInited", true);
  localStorage.setItem("users", JSON.stringify([]));
  
  localStorage.setItem("tutorial", JSON.stringify(tutorialText));
  localStorage.setItem("records", JSON.stringify({}));
}

const auth = new Authenticator(new DatabaseAccessor());
auth.signUp(new User(
  "now",
  "cesar",
  "ibarra",
  "cibarra",
  "cibarra@gmail.com",
  "password",
  "student",
  "student"
));

// console.log(auth.authenticate("cibarra", "q"));
// localStorage.clear();

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
