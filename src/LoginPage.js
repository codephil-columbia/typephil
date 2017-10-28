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
  componentDidMount() {
    document.body.classList.toggle('backgroundColor', true)
  }
  signup = () => {
    this.setState({
      currentAction: "signup"
    });
  }
  back = () => {
   this.setState({
      currentAction: "none"
    }); 
  }
  registerSignup = () => {}
  registerLogin = () => {}
  render() {
    if (this.state.currentAction == "signup") {
      return (
        <div className="App">
          <div className="divStyle">
            <h1 style={{color: "white"}}>Create an Account</h1>
            <input type="text" placeholder="Name" className="textField"/>
            <input type="text" placeholder="Password" className="textField"/>
            <input type="text" placeholder="Age" className="textField"/>
            <div>
              etc...
            </div>
            <MUIButton color="white" onClick={this.back}>Back</MUIButton>
            <MUIButton color="white" onClick={this.registerSignup}>Sign up</MUIButton>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App" className="divStyle">
          <h1 style={{color: "white"}}>Welcome to Typephil!</h1>
          <input type="text" placeholder="Username" className="textField"/>
          <input type="text" placeholder="Password" className="textField"/>
          <MUIButton color="white" onClick={this.login}>Login</MUIButton>
          <MUIButton color="white" onClick={this.signup}>Sign up</MUIButton>
        </div>
      );
    }

  }
}

function login(event){}


export default LoginPage;
