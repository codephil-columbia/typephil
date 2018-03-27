import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import typephilApp from './reducers';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage';
import SignUp from './SignupPage';
import HomePageSwitch from './HomePage';
import Unit from './Unit';
import Header from './components/header'
let store = createStore(
  typephilApp,
  applyMiddleware(thunk)
);

const HeaderLinks = ["Learn", "Progress"]

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/home" component={HomePageSwitch}/>
        <Route exact path="/learn" component={Unit}/>
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
