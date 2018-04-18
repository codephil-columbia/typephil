import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import './style/styles.scss';
import './style/SignupPage.scss'

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
        <Header links={[]}/>
       
        <div className="container">
            <div className="row" id="container">
                <div className="column column-40">
                    <div className="left-panel">
                        <h1 className="title">Sign up - It's free!</h1>
                        <p>Join TypePhil to get personalized help with your typing education, whether you're already studying or starting anew. We'll save all of your progress.</p>
                        <p>By signing up for TypePhil, you agree to our Terms of Use and Privacy Notice.</p>
                        <div id="space2">
                        </div>

                        <div className="center">  
                          <p>If you would like to create an instructor account, please click below.</p>
                          <button id="create-account">CREATE INSTRUCTOR ACCOUNT</button>
                        </div>
                    </div>
                </div>

                <div className="column column-10">
                </div>

                <div className="vertical-line">
                </div>

                <div className="column column-10">
                </div>

                <div className="column column-40">
                    <div className="right-panel">
                        <div className="row">
                            <div className="column column-50">
                                <h2>USERNAME</h2>
                                <input placeholder=""/>
                            </div>
                            <div className="column column-50">
                                <h2>BIRTHDATE</h2>
                                <div className="column column-30">
                                  <input placeholder="Day"/>
                                </div>
                                <div className="column column-30">
                                  <input placeholder="Month"/>
                                </div>
                                <div className="column column-30">
                                  <input placeholder="Year"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="column column-50">
                                <h2>PASSWORD</h2>
                            </div>
                            <div className="column column-50">
                                <h2>RE-TYPE PASSWORD</h2>
                            </div>
                        </div>

                        <div className="row btn-sign-up">
                            <div className="column column-50 column-offset-25">
                                <button id="btn-sign-up">SIGN UP</button>
                            </div>
                        </div>
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
