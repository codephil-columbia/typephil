import React, { Component } from 'react';
import { Connect, connect } from 'react-redux';
import { withRouter } from 'react-router'

import { Route, Switch, Redirect } from 'react-router-dom'


import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Profile from './ProfilePage';
import Learn from './Learn';
import Tutorial from './Tutorial';                               
import HomePage from './HomePage';
import FourOhFour from './components/FourOhFour';
import Challenge from './Challenge'
import CocoType from './CocoType';
import KeyTracker from './KeyTracking'
import Stats from './Statistics'
import SpaceraceGame from './SpaceraceGame'
import Spacerace from './Spacerace'


class App extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = { isAuthenticated: false };
  }

  /**
   * Passed down to components in charge of auth, when successful, we manually retrigger React router to change the 
   * url to the Home component.
   */
  onSuccessfulAuth = () => {
    this.props.history.push("/home");
    this.setState({ isAuthenticated: true })

    // Safely reset isAuthenticated, e.g. if user has logged out.
    if(!this.props.isLoggedIn)
      this.setState({ isAuthenticated: false })
  }

  /**
   * Routes for an authenticated user. Has a default 404 component that can show text or just redirect back to home.
   * We need to keep the signup route here since App's render method will rerender signup after we have logged in, 
   * and from Signup we use onSuccessfulAuth to trigger a url change to /home once the app is ready.
   */
  userHasBeenAuthenticated = () => {
    return (
      <Switch>
        <Route path="/home" component={HomePage}/>
        <Route path="/learn" component={Learn}/>
        <Route path="/tutorial" component={Tutorial}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/signup" component={() => <SignupPage onSuccessfulAuth={this.onSuccessfulAuth}/>}/>
        <Route path="/" component={HomePage}/>
        <Route path="/404"component={FourOhFour} />
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
        <Route path="/signup" component={SignupPage}/>
        <Route path="/challenge" component={Challenge}/>
        <Route path="/spacerace" component={SpaceraceGame}/>
        <Route path="/spaceraceselect" component={Spacerace}/>
        <Route path="/coco" component={KeyTracker}/>
        <Route path="/finalstats" component={Stats}/>
        <Route component={FourOhFour} />
      </Switch>
    )
  }

  render() {
    const App = (this.props.auth.isLoggedIn) ? this.userHasBeenAuthenticated() : this.userHasNotBeenAuthenticated()
    return (
      <React.Fragment>
        { App }
      </React.Fragment>
    )
  }
}

/**
 * Prevent memory leaks from unmounted components.
 */
const componentDidMount = () => {
  this._isMounted = true;
}
const componentWillUnmount = () => {
  this._isMounted = false;
}

const mapStateToProps = ({ auth, app }) => ({
  auth,
  app
})

export default withRouter(connect(mapStateToProps)(App));
