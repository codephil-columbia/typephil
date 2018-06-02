import React, { Component } from 'react';
import { Connect, connect } from 'react-redux';

import { Route, Switch, BrowserRouter } from 'react-router-dom'

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Profile from './ProfilePage';
import HomePageSwitch from './HomePage';
import Learn from './Learn';
import Tutorial from './Tutorial';                               

class App extends Component {
  constructor(props) {
    super(props);
  }

  printName = () => {
    console.log('name')
  }

  userHasBeenAuthenticated = () => {
    return (
      <Switch>
        <Route path="/home" component={HomePageSwitch}/>
        <Route path="/learn" component={Learn}/>
        <Route path="/tutorial" component={() => <Tutorial print={this.printName}/>}/>
        <Route path="/profile" component={() => <Tutorial print={this.printName}/>}/>
      </Switch>
    )
  }

  userHasNotBeenAuthenticated = () => {
    return (
      <Switch>
        <Route exact path="/" component={LoginPage}/>
        <Route path="/signup" component={SignupPage}/>
      </Switch>
    )
  }

  render() {
    const { isLoggedIn } = this.props;
    const app = isLoggedIn ? this.userHasBeenAuthenticated() : this.userHasNotBeenAuthenticated()
    console.log(this.props)

    return (
      <div>
        <Switch>
          <Route exact path="/" component={() => <LoginPage isLoggedIn={this.props.isLoggedIn}/>}/>
          <Route exact path="/home" component={HomePageSwitch}/>
          <Route exact path="/learn" component={Learn}/>
          <Route exact path="/tutorial" component={() => <Tutorial print={this.printName}/>}/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/profile" component={Profile}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ isLoggedIn, auth, app }) => ({
  isLoggedIn,
  auth,
  app
})

export default connect(mapStateToProps)(App)
