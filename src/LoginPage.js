import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';

import './style/LoginPage.css'

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      headerLinks: ["Progress", "Learn"], //["Learn", "Progress", "Home"]
      touched: {
        signin: false
      }
    };
  }

  login = e => {
    e.preventDefault();
    const { username, password } = this.state;
    //onLogin(username, password);
    this.props.dispatchLogin(
      username,
      password
    )
  }

  signup = e => {
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

    console.log("LOGGED IN: %s", isLoggedIn);

    return (
      <div>
        <Header links={headerLinks} username=""/>
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
                  <img src="images/universal/DICT_logo.png" className="logo"></img>
                  <img src="images/universal/Columbia_logo.png" className="logo"></img>
                  <img src="images/universal/MIT_logo.png" className="logo"></img>
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
              <form onSubmit={this.login}>
                  <div className="form-inputs">
                    <input type="text" placeholder="Enter your username" id="nameField" className="form-input" onChange={this.getUsernameData}/>
                    <input type="password" placeholder="Enter your password" id="passwordField" className="form-input" onChange={this.getPasswordData}/>
                    <div className={this.state.touched['signin'] ? (this.props.isLoggedIn ? "warning-hide" : "warning") : "warning-hide"}>Sorry, your username or password is incorrect.</div>
                  </div>
                  <div className="form-buttons">
                    <button className="form-button button-primary solid" onBlur={this.handleBlur('signin')}>SIGN IN</button>
                    <p>or</p>
                    <button className="form-button button-primary solid" id="signup" onClick={this.signup}>SIGN UP</button>
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  /*return {
    onLogin: (username, password) => {
      return bindActionCreators({ dispatchLogin }, dispatch);
    }
  }*/
  return bindActionCreators({ dispatchLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
