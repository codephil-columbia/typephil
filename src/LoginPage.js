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
    const divStyle = {
        width: '50%',
        margin: 'auto',
        marginTop: '200px',
      };
    if (this.state.currentAction == "signup") {
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
            <div>
              etc...
            </div>
            <MUIButton color="primary" onClick={this.back}>Back</MUIButton>
            <MUIButton color="primary" onClick={this.registerSignup}>Sign up</MUIButton>
          </div>
        </div>
      );
    } else {
      const input_style = {
        display: "block",
        margin: "0 auto",
        marginBottom: "10px",
        padding: "10px",
        borderRadius: "3px",
        backgroundColor: "white",
        border: "1px solid white",
        width: "300px",
        height: "20px",
      }
      return (
        <div className="App" style={divStyle}>
          <h1 style={{color: "white"}}>Welcome to Typephil!</h1>
          <input type="text" placeholder="Username" style={input_style}/>
          <input type="text" placeholder="Password" style={input_style}/>
          <MUIButton color="white" onClick={this.login}>Login</MUIButton>
          <MUIButton color="white" onClick={this.signup}>Sign up</MUIButton>
        </div>
      );
    }

  }
}

function login(event){}


export default LoginPage;
