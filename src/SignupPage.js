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
                        <h1>Sign up - it's free!</h1>
                        <p>Join TypePhil to get personalized help with your typing education, whether you're already studying or starting anew. We'll save all of your progress.</p>
                        <p>By signing up for TypePhil, you agree to our Terms of Use and Privacy Notice.</p>
                    </div>
                </div>
                <div className="column column-50">
                    <div className="right-panel">
                        <h2>Name</h2>
                        <h2>Username</h2>
                        <h2>Password</h2>
                        <h2>Re-type password</h2>
                        <button>Continue</button>
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
