import React, { Component } from 'react';
import Appbar from 'muicss/lib/react/appbar';
import { Link, Redirect } from 'react-router-dom'

import '../style/LandingPage.css';
import { Input, Button, Icon } from 'semantic-ui-react'

import { dispatchLogin } from '../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  validateLogin = (email, password) => {
    //For now does basic check to see if people inputed stuff
    if(!email || !password) {
      return false;
    }
    return true; 
  }

  login = () => {
    const {email, password} = this.state;
    if(this.validateLogin(email, password)) {
      this.props.dispatchLogin(email, password);
    } else {
      //Later on would be helpful to send back info to view saying that password format couldnt be validated
      return false;
    }
  }

  handleEmailInput = (_, data) => {
    this.setState({email: data.value});
  }

  handlePasswordInput = (_, data) => {
    this.setState({password: data.value});
  }

  render() {
    console.log(this.props.isLoggedIn);
    if(this.props.isLoggedIn) {
      return (
        <Redirect push to="/home"/>
      )
    }

    return (
      <div className="landing-root">
        <Appbar className="landing-content">
          <table width='100%'>
            <tbody>
              <tr>
              </tr>
            </tbody>
          </table>
        </Appbar>
        <div className="landing-login">
          <h1>Welcome to Typephil!</h1>
          <div>
            <div>
              <Input placeholder="Email" icon='users' iconPosition='left' onChange={this.handleEmailInput}/>
            </div>
            <div>
              <Input placeholder="password" icon='privacy' iconPosition='left' onChange={this.handlePasswordInput}/>
            </div>
          </div>
          <div>
            <Button basic color='blue' onClick={this.login}>Login</Button>
            <Link to="/">Create account</Link>
          </div>
          <div>
            <Button color='facebook'>
              <Icon name='facebook' /> Login with Facebook
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);