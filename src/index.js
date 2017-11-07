import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

ReactDOM.render((
  <BrowserRouter history={BrowserRouter.hashHistory}>
  	<Switch>
    	<Route exact path="/" component={LoginPage}/>
    	<Route exact path="/home" component={HomePage}/>
    </Switch>
  </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
