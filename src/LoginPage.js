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
      headerLinks: [] //["Learn", "Progress", "Home"]
    };
  }

  login = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.dispatchLogin(
      username,
      password
    )
  }

  signup = e => {
    e.preventDefault();
    window.location = '/signup';
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
    // const { isLoggedIn } = this.props;
    const isLoggedIn = true;
    const { headerLinks } = this.state;
  

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
                  </div>
                  <div className="form-buttons">
                    <input className="form-button button-primary solid" type="submit" value="SIGN IN"/>
                    <p>or</p>
                    <input className="form-button button-primary solid" id="signup" onClick={this.signup} type="submit" value="SIGN UP"/>
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
  return bindActionCreators({ dispatchLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
