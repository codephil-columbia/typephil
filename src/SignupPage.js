import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header'    
import './style/SignupPage.css'


class SignupPage extends Component {
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
        <Header/>
       
        <div className="container">
            <div className="row">
                <div className="column column-50">
                    <div className="left-panel">
                        <h1>Sign up - It's free!</h1>
                        <p>Join TypePhil to get personalized help with your typing education, whether you're already studying or starting anew. We'll save all of your progress.</p>
                        <p>By signing up for TypePhil, you agree to our Terms of Use and Privacy Notice.</p>
                    
                        <p>If you would like to create an instructor account, please click below.</p>
                        <button id="create-account">CREATE INSTRUCTOR ACCOUNT</button>

                    </div>
                </div>
                <div className="column column-50">
                    <div className="right-panel">
                        <h2>NAME</h2>
                        <input placeholder="First Name"/>
                        <input placeholder="Last Name"/>

                        <h2>USERNAME</h2>
                        <h2>SCHOOL YEAR</h2>
                        <h2>GENDER</h2>
                        <h2>EMAIL ADDRESS</h2>
                        <h2>PASSWORD</h2>
                        <h2>RE-TYPE PASSWORD</h2>
                        <button id="btn-sign-up">SIGN UP</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
