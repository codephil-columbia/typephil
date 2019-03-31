import React, { Component } from "react";
import './style/counterPage.css'

class TimerInput extends React.Component {
  render() {
    return (
      <div style={{marginLeft:100}}>
        <h3>Input your desired time</h3>
        <input type="number" value={this.props.value} onChange={this.props.handleChange} required />
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ fontSize: 100}}>{this.props.value}:{this.props.seconds}</h1>
      </div>
    );
  }
}

class StartButton extends React.Component {
  render() {
    return (
      <div style={{ marginLeft: 130 }}>
        <button className="btn btn-lg btn-success" disabled={!this.props.value} onClick={this.props.startCountDown}>Start</button>
      </div>

    );
  }
}

export default class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        seconds: '',
        value: '',
        isClicked : true,
        baseTime:this.props.Time
      }
      this.secondsRemaining;
      this.intervalHandle;
      this.handleChange = this.handleChange.bind(this);
      this.startCountDown = this.startCountDown.bind(this);
      this.tick = this.tick.bind(this);
    }
    
    componentDidMount(){
        this.startCountDown()
    }

    handleChange(event) {
      this.setState({
        value: event.target.value
      })
    }
  
    tick() {
      var min = Math.floor(this.secondsRemaining / 60);
      var sec = this.secondsRemaining - (min * 60);
      this.setState({
        value: min,
        seconds: sec,
      })
  
      if (sec < 10) {
        this.setState({
          seconds: "0" + this.state.seconds,
        })
  
      }
  
      if (min < 10) {
        this.setState({
          value: "0" + min,
        })
  
      }
      

      if (min === 0 & sec === 0) {
        clearInterval(this.intervalHandle);
        this.props.history.push("s");
      }
      

      this.secondsRemaining--
      if(this.props.NeedsToIncrement){
        this.secondsRemaining = this.secondsRemaining +20 
        this.props.resetFunction();
      }
    }
  
    startCountDown() {
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = this.state.baseTime;
      this.secondsRemaining = time * 60;
      this.setState({
        isClicked : true
      })
    }
  
    render() {
      const clicked = this.state.isClicked;
      if(clicked){
      return (
        <div>
          <div className="timer">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <Timer value={this.state.value} seconds={this.state.seconds} />
            </div>
          </div>
        </div>
      );
      }else{
        return (
          <div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <TimerInput value={this.state.value} handleChange={this.handleChange} />
                <Timer value={this.state.value} seconds={this.state.seconds} />
                <StartButton startCountDown={this.startCountDown} value={this.state.value} />
              </div>
            </div>
          </div>
        );
      }
    }
  }