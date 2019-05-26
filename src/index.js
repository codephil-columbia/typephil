import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import App from './app'

import { Authenticator, initLocalStorage} from "./offline/db";

import './style/styles.scss';
import './style/index.scss';

import { store, persistor } from './store';

const Loading = () => {
  return <div>Loading</div>
}

localStorage.setItem("users", {});

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
