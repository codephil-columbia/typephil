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
      headerLinks: ["Learn", "Progress", "Home"]
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
        <div className="login-content">
          <div className="content-left">
            <div className="body">
              <div className="body-title">
                <h2>A fun, customized way to learn how to type!</h2>
              </div>
              <div className="body-image">
                <p>arrow</p>
                <img src="TypephilDesktop.svg" className="big-img"></img>
                <p>arrow</p>
              </div>
              <div className="footer">
                <h3>We're partnering with the best and brightest!</h3>
                <div className="footer-boxes">
                  <img src="DICT_logo.png" className="logo"></img>
                  <img src="Columbia_logo.png" className="logo"></img>
                  <img src="MIT_logo.png" className="logo"></img>
                </div> 
              </div>
            </div>
          </div>
          <vl className="content-sep"/>
          <div className="content-right">
            <div className="">
              <img src="PalmTree.svg" className="img-right"></img>
            </div>
            <div className="login">
              <form onSubmit={this.login}>
                  <div className="form-inputs">
                    <input type="text" placeholder="Enter Your Username" id="nameField" className="form-input" onChange={this.getUsernameData}/>
                    <input type="password" placeholder="Enter Your Password" id="passwordField" className="form-input" onChange={this.getPasswordData}/>
                  </div>
                  <div className="form-buttons">
                    <input className="form-button button-primary solid" type="submit" value="SIGN IN"/>
                    <p> OR </p>
                    <input className="form-button button-primary solid" type="submit" value="SIGN UP"/>
                  </div>
              </form>
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
