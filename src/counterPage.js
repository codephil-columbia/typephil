import React, {Component} from "react";

import './style/counterPage.css'

class TimerInput extends Component {
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
      <div className="countdown-clock-div">
        <div className="countdown-clock">{this.props.value}:{this.props.seconds}</div>
        <div className="countdown-clock-description">TIME REMAINING</div>
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

class Counter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        seconds: '',
        value: '',
        isClicked : true,
        increment:3,
        lowerIncrement:this.props.IncrementLevel,
        baseTime:0,
        difficulty:0,
        timeElapse:0
      }
      this.secondsRemaining;
      this.intervalHandle;
      this.handleChange = this.handleChange.bind(this);
      this.startCountDown = this.startCountDown.bind(this);
      this.setBaseTime = this.setBaseTime.bind(this);
      this.tick = this.tick.bind(this);
    }
    

    componentDidMount(){
        this.setBaseTime()
    }

    calculateIncrement(){
      var newIncrement=0;
      
      if(this.state.difficulty==1){
        this.setState({increment:6})
      }
      else if(this.state.difficulty==2){
        this.setState({increment:3.5})
      }
      else{
        var currIncrement=this.state.increment
        var newIncrement=currIncrement*(9/10)
        this.setState({increment:newIncrement})
      }
    }

    setBaseTime(){
        var secondsGiven=0
        var difficulty=this.props.baseDifficulty
        if(difficulty==1){
          secondsGiven=22
          this.setState({
            increment:10,
            difficulty:1
          })
        }else if(difficulty==2){
          secondsGiven=17
          this.setState({
            increment:6,
            difficulty:2
          })
        }else{
          secondsGiven=12
          this.setState({
            increment:3,
            difficulty:3
          })
        }
        console.log(secondsGiven)
        this.startCountDown(secondsGiven)
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
        timeElapse:this.state.timeElapse + 1
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
        this.props.PlayerLost(this.props.accuracyInfo,this.state.timeElapse)
      }
      

      this.secondsRemaining--
      if(this.props.NeedsToIncrement){
        if(this.state.lowerIncrement){
           this.calculateIncrement()
        }
        this.secondsRemaining = this.secondsRemaining +this.state.increment
        this.props.resetFunction();
      }
    }
  
    startCountDown(baseTime) {
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = baseTime;
      this.secondsRemaining = time; 
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
  
  export default Counter;
  