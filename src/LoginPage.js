import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import MUIButton from 'muicss/lib/react/button';

class LoginPage extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to Typephil!</h1>
        <MUIButton color="primary">Login</MUIButton>
        <MUIButton color="primary">Sign up</MUIButton>
      </div>

    );
  }
}

function login(event){}
function signup(event){}

export default LoginPage;
