import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import typephilApp from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app'
import LoginPage from './LoginPage';

import './style/styles.scss';
import './style/index.scss';

import { store, persistor } from './store';

const Something = () => {
  return <div>Loading</div>
}


ReactDOM.render(
  <PersistGate loading={<Something />} persistor={persistor}>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </PersistGate>,
  document.getElementById('root')
);
