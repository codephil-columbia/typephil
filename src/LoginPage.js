import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import MUIButton from 'muicss/lib/react/button';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAction: "none"
    };
  }
  signup = () => {
    this.setState({
      currentAction: "signup"
    });
  }
  login = () => {
    this.setState({
      currentAction: "login"
    });
  }
  render() {
    const divStyle = {
        width: '50%',
        margin: 'auto',
        marginTop: '15px'
      };
    if (this.state.currentAction == "login") {
      return (
        <div className="App">
          <div style={divStyle}>
            <div class="mui-textfield mui-textfield--float-label">
              <input type="text" />
              <label>Username</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
              <input type="text" />
              <label>Password</label>
            </div>
          </div>
        </div>
      );
    } else if (this.state.currentAction == "signup") {
      return (
        <div className="App">
          <div style={divStyle}>
            <h1>Welcome to Typephil!</h1>
            <div class="mui-textfield mui-textfield--float-label">
              <input type="text" />
              <label>Name</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
              <input type="text" />
              <label>Password</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
              <input type="text" />
              <label>Age</label>
            </div>
            etc...
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Welcome to Typephil!</h1>
          <MUIButton color="primary" onClick={this.login}>Login</MUIButton>
          <MUIButton color="primary" onClick={this.signup}>Sign up</MUIButton>
        </div>
      );
    }

  }
}

function login(event){}


export default LoginPage;
