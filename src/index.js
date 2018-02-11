import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import typephilApp from './reducers';

import './index.css';
import HomePage from './HomePage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage';

let store = createStore(
  typephilApp,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={BrowserRouter.hashHistory}>
      <Switch>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/login" component={LoginPage}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();