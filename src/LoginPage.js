import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import MUIButton from 'muicss/lib/react/button';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAction: "none"
    };
  }
  componentDidMount() {
    document.body.classList.toggle('backgroundColor', true)
  }

  signup = () => {
    this.setState({
      currentAction: "signup"
    });
  }
  resetPassword = () => {
    this.setState({
      currentAction: "resetPassword"
    });
  }
  back = () => {
   this.setState({
      currentAction: "none"
    }); 
  }

  registerSignup = () => {}
  registerLogin = () => {}
  registerResetPassword = () => {}

  render() {
    if (this.state.currentAction == "signup") {
      return (
        <div className="App">
          <div className="divStyle">
            <h1 style={{color: "white"}}>Create an Account</h1>
            <input type="text" placeholder="First name" className="textField"/>
            <input type="text" placeholder="Last name" className="textField"/>
            <input type="text" placeholder="Password" className="textField"/>
            
            <Dropdown color="primary" label="Gender" alignMenu="right">
              <DropdownItem>Male</DropdownItem>
              <DropdownItem>Female</DropdownItem>
            </Dropdown>

            <input type="text" placeholder="Birthdate" className="textField"/>
            <input type="text" placeholder="Mobile number" className="textField"/>
            <input type="text" placeholder="Age" className="textField"/>
            <div>
              xyz...
            </div>


            <MUIButton color="white" onClick={this.back}>Back</MUIButton>
            <MUIButton color="white" onClick={this.registerSignup}>Sign up</MUIButton>
          </div>
        </div>
      );
    } else if (this.state.currentAction == "resetPassword") {
      return (
        <div className="App" className="divStyle">
          <h1 style={{color: "white"}}>Recover your TypePhil account</h1>
          <input type="text" placeholder="name@example.com" className="textField"/>
          <MUIButton color="white" onClick={this.back}>Back</MUIButton>
          <MUIButton color="white" onClick={this.registerResetPassword}>Reset password</MUIButton>
        </div>
      );
    } else {
      return (
        <div className="App" className="divStyle">
          <h1 style={{color: "white"}}>Welcome to Typephil!</h1>
          <input type="text" placeholder="Username" className="textField"/>
          <input type="text" placeholder="Password" className="textField"/>
          <div>
            <MUIButton color="white" onClick={this.login}>Login</MUIButton>
            <MUIButton color="white" onClick={this.signup}>Sign up</MUIButton>
          </div>
          <MUIButton color="white" onClick={this.resetPassword}>Forgot password?</MUIButton>
        </div>
      );
    }

  }
}

function login(event){}


export default LoginPage;
