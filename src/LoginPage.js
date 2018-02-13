import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './style/LoginPage.css'


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    const { isLoggedIn } = this.props;
    
    if(isLoggedIn) {
        return <Redirect to="/home"/>
    }

    return (
      <div>
        <div className="header">
          <h1 className="header-left">TypePhil</h1>
        </div>
        <div className="content">
          <div className="content-left">
            <div className="body">
              <div className="title">
                <h2>A fun, customized way to learn how to type</h2>
              </div>
                <dl className="list">
                  <dt>Interactive typing lessons</dt>
                  <dt>Identify stengthns and weaknesses</dt>
                  <dt>Interactive typing lessons</dt>
                </dl>
              <div className="footer">
                <h3>We're partnering with the best and brightest!</h3>
                <div className="footer-boxes">
                  Something something something
                </div> 
              </div>
            </div>
          </div>
          <div className="content-right">
            <div className="logo">
            </div>
            <div className="login">
              <form onSubmit={this.login}>
                <fieldset>
                  <input type="text" placeholder="Username" id="nameField" className="form-input" onChange={this.getUsernameData}/>
                  <input type="password" placeholder="Password" id="passwordField" className="form-input" onChange={this.getPasswordData}/>
                  <div>
                    <input className="button-primary solid" type="submit" value="Login"/>
                  </div>
                  <div>
                    <input className="button button-outline transparent" type="submit" value="Sign Up for Free"/>
                  </div>
                </fieldset>
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
