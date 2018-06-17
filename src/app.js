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
    const { isLoggedIn } = true;
    const app = isLoggedIn ? this.userHasBeenAuthenticated() : this.userHasNotBeenAuthenticated()
    console.log(this.props.location);

    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/learn" component={Learn}/>
          <Route exact path="/tutorial" component={() => <Tutorial print={this.printName}/>}/>
          <Route exact path="/signup" component={SignupPage}/>
          <Route exact path="/profile" component={Profile}/>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default connect(mapStateToProps)(App)
