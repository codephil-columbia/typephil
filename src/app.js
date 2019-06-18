import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { Route, Switch } from 'react-router-dom'

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Profile from './ProfilePage';
import Learn from './Learn';
import Tutorial from './Tutorial';                               
import HomePage from './HomePage';
import GameSelect from './GameSelect';
import Challenge from './Challenge'
import Boat from './BoatGame'
import Component404 from './components/404';
import KeyTracker from './KeyTracking'
import Stats from './Statistics'
import SpaceraceGame from './SpaceraceGame'
import DataDashboard from './DataDashboard'
import ExamSelection from './ExamSelectionPage'

import {LocalStorageCache} from "./services";



class App extends Component {
  constructor(props) {
    super(props);

    this.cache = new LocalStorageCache();

    this._isMounted = false;
    this.state = { 
      isAuthenticated: false,
    };

    this.setPageSourceViaCache = this.setPageSourceViaCache.bind(this);
  }

  /**
   * Passed down to components in charge of auth, when successful, we manually retrigger React router to change the 
   * url to the Home component.
   */
  onSuccessfulAuth = (username, uid) => {
    this.setState({ isAuthenticated: true })
    this.cache.set("isLoggedIn", true);
    this.cache.set("username", username);
    this.cache.set("uid", uid);

    this.props.history.push("/home");
  }

  onLogout = () => {
    this.setState({ isAuthenticated: false });
  }

  setPageSourceViaCache(pageSource=this.cache.get("tutorial").pageSource) {
    const tutorialCachedData = this.cache.get("tutorial");
    this.cache.set("tutorial", {...tutorialCachedData, pageSource});
  }

  /**
   * Routes for an authenticated user. Has a default 404 component that can show text or just redirect back to home.
   * We need to keep the signup route here since App's render method will rerender signup after we have logged in, 
   * and from Signup we use onSuccessfulAuth to trigger a url change to /home once the app is ready.
   */
  userHasBeenAuthenticated = () => {
    return (
      <Switch>
        <Route path="/home" component={() => <HomePage onLogout={this.onLogout} history={this.props.history} setPageSourceViaCache={this.setPageSourceViaCache}/>} />
        <Route path="/learn" component={() => <Learn onLogout={this.onLogout} history={this.props.history} setPageSourceViaCache={this.setPageSourceViaCache}/>} />
        <Route path="/tutorial" component={() => <Tutorial />}/>
        <Route path="/profile" component={() => <Profile onLogout={this.onLogout} history={this.props.history} />}/>
        <Route path="/signup" component={() => <SignupPage onSuccessfulAuth={this.onSuccessfulAuth}/>}/>
        <Route path="/games" component={GameSelect}/>
        <Route path="/spacerace" component={SpaceraceGame}/>
        <Route path="/boat" component={Boat}/> 
        <Route path="/stats" component={DataDashboard}/>
        <Route path="/challenge" component={Challenge}/>
        <Route path="/coco" component={KeyTracker}/>
        <Route path="/finalstats" component={Stats}/>
        <Route path="/exam" component={ExamSelection}/>
        <Route path="/404"component={Component404} />
      </Switch>
    )
  }
  /**
   * Routes for a non authenticated user.
   */
  userHasNotBeenAuthenticated = () => {
    return (
      <Switch>
        <Route exact path="/" component={() => <LoginPage onSuccessfulAuth={this.onSuccessfulAuth}/>}/>
        <Route path="/signup" component={() => <SignupPage onSuccessfulAuth={this.onSuccessfulAuth}/>}/>
        <Route component={Component404} />
      </Switch>
    )
  }

  render() {
    const App = (this.state.isAuthenticated || this.cache.get("isLoggedIn")) 
      ? this.userHasBeenAuthenticated() 
      : this.userHasNotBeenAuthenticated()
    return (
      <React.Fragment>
        {App}
      </React.Fragment>
    )
  }
}

export default withRouter(App);
