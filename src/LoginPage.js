import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { UserService, LocalStorageCache } from "./services";

import Header from './components/header';

import './style/LoginPage.css';
import './style/styles.css';
// import './style/milligram.min.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;

    this.userService = new UserService();
    this.cache = new LocalStorageCache();

    this.state = {
      username: "",
      password: "",
      headerLinks: ["Progress", "Learn"],
      touched: {
        signin: false
      },
      loginWasSuccessful: false
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = this.state;

    this.userService.authenticate(username, password)
      .then(user => {
        this.cache.set("uid", user.uid);
        this.cache.set("username", user.username);

        this.props.onSuccessfulAuth(user.username, user.uid);
        this.setState({ loginWasSuccessful: true });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loginWasSuccessful: false });
      })
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter')
      this.handleLogin(e);
  }

  handleSignup = e => {
    e.preventDefault();
    window.location = '/signup';
  }

  handleBlur = (field) => (e) => {
    this.setState({
      touched: {...this.state.touched, [field]: true}
    });
  }

  getUsernameData = e => {
    const username = e.target.value;
    this.setState({ username });
  }

  getPasswordData = e => {
    const password = e.target.value;
    this.setState({ password });
  }

  render() {
    const { isLoggedIn } = this.props;
    const { headerLinks } = this.state;

    return (
      <div>
        <Header links={isLoggedIn? headerLinks : []} isLoggedIn={this.props.isLoggedIn} username=""/>
        <div className="container">
        <div className="login-content">
          <div className="content-left">
            <div className="body">
              <div className="body-title">
                <h1>A fun, customized way to learn how to type!</h1>
              </div>

              <div className="row jumbotron">

                {/*
                <div className="column column-20"> 
                  <div className="arrow left"></div>
                </div>
                */}

                <div className="column column-100">
                  <div className="body-image">
                    <img src="images/universal/Landing_image1.svg" className="big-img"></img>
                  </div>
                </div>

                {/*
                <div className="column column-20"> 
                  <div className="arrow right"></div>
                </div>
                */}
              </div>

              <div className="footer">
                <h3>We're partnering with the best and brightest!</h3>
                <div className="footer-boxes">
                  <a href="http://dict.gov.ph/" target="_blank">
                    <img src="images/universal/dict_logo.png" className="logo"></img>
                  </a>
                  <a href="https://www.cc-seas.columbia.edu/studentlife/abp/codephil-0" target="_blank">
                    <img src="images/universal/columbia_logo.png" className="logo"></img>
                  </a>
                  <a href="http://mitgpi.weebly.com/codephil-project.html" target="_blank">
                    <img src="images/universal/mit_logo.jpg" className="logo"></img>
                  </a>
                </div> 
              </div>
            </div>
          </div>
          <vl className="content-sep"/>
          <div className="content-right">
            <div className="">
              <img src="images/universal/PalmTree.svg" className="img-right"></img>
            </div>
            <div className="login">
              <form onSubmit={this.handleLogin}>
                  <div className="form-inputs">
                    <input type="text" placeholder="Enter your username" id="nameField" className="form-input" onChange={this.getUsernameData} onKeyPress={this.handleKeyPress}/>
                    <input type="password" placeholder="Enter your password" id="passwordField" className="form-input" onChange={this.getPasswordData} onKeyPress={this.handleKeyPresss}/>
                    <div className={this.state.touched['signin'] ? (this.loginWasSuccessful ? "warning-hide" : "warning") : "warning-hide"}>Sorry, your username or password is incorrect.</div>
                  </div>
                  <div className="form-buttons">
                    <button className="form-button button-primary solid" onBlur={this.handleBlur('signin')}>SIGN IN</button>
                    <p>or</p>
                    <button className="form-button button-primary solid" id="signup" onClick={this.handleSignup}>SIGN UP</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchLogin }, dispatch);
}

const componentDidMount = () => {
  this._isMounted = true;
}
const componentWillUnmount = () => {
  this._isMounted = false;
}

export default LoginPage;
