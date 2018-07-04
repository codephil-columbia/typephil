import React, { Component } from 'react';
import { Connect, connect } from 'react-redux';

import { Route, Switch, BrowserRouter } from 'react-router-dom'

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Profile from './ProfilePage';
import Learn from './Learn';
import Tutorial from './Tutorial';                               
import HomePage from './HomePage';

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
        <Route path="/home" component={HomePage}/>
        <Route path="/learn" component={Learn}/>
        <Route path="/tutorial" component={() => <Tutorial print={this.printName}/>}/>
        <Route path="/profile" component={Profile}/>
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
    //const { isLoggedIn } = false;//true; //this.props; TODO true just for frontend testing
    const app = this.props.auth.isLoggedIn ? this.userHasBeenAuthenticated() : this.userHasNotBeenAuthenticated()
    console.log( "AUTH: ", this.props.auth );

    return (
      <div>
        <Switch>
          <Route exact path="/" component={() => <LoginPage isLoggedIn={this.props.auth.isLoggedIn}/>}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/learn" component={() => <Learn isLoggedIn={this.props.auth.isLoggedIn}/>}/>
          <Route exact path="/tutorial" component={() => <Tutorial print={this.printName} isLoggedIn={this.props.auth.isLoggedIn}/>}/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/profile" component={() => <Profile auth={this.props.auth}/>}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, app }) => ({
  auth,
  app
})

export default connect(mapStateToProps)(App)
