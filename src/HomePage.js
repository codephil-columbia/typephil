import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';

class HomePage extends Component {
  constructor(props) {
    super(props);
      this.state = {
        currentAction: "home"
	 };
  }
  componentDidMount() {
  	document.body.classList.toggle('backgroundColor', true)
  }
  render() {
  	if (this.state.currentAction == "home") {
  		return (
	      <div className="App" className="divStyle">
          	<h1 style={{color: "white"}}>Welcome back</h1>
          	xyz...
          </div>
		);
	}
  }
}

export default HomePage;