import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';

import './style/LoginPage.css';
import './style/styles.css';
// import './style/milligram.min.css';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
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
    this.props.dispatchLogin(
      username,
      password
    ).then((res) => this.handleAfterLogin(res));
  }

  handleKeyPress = (e) => {
    if(e.key === 'Enter')
      this.handleLogin(e);
  }

  handleAfterLogin = (res) => { // TODO handle blur pause while login is being processed
    if(res) { // res = 1 means successful login TODO unhack this since props are passed
      this.setState({ loginWasSuccessful: true });
      this.props.onSuccessfulAuth();
    }
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

    //if(isLoggedIn) 
      //return <Redirect to="home"/>

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
                    <div className={this.state.touched['signin'] ? (this.props.isLoggedIn ? "warning-hide" : "warning") : "warning-hide"}>Sorry, your username or password is incorrect.</div>
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

const mapStateToProps = state => {
  return {
    isloggedIn: state.auth.isLoggedIn,
    currentUser: state.auth.currentUser
  }
}

/*
const mapStateToProps = ({ auth }) => {
  return {
    currentUser: auth.currentUser,
    isLoggedIn: auth.isLoggedIn
  }
}
*/

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchLogin }, dispatch);
}

const componentDidMount = () => {
  this._isMounted = true;
}
const componentWillUnmount = () => {
  this._isMounted = false;
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
