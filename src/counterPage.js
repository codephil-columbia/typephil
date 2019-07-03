import React, {Component} from "react";

import './style/counterPage.css'

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
        threeCount:1,
        twoCount:1,
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

    componentWillUnmount() {
      // Make sure to clear counter here in case normal game over flow does 
      // not happen, ex. the user starts a game and then immediately logs out.
      clearInterval(this.intervalHandle);
    }

    calculateIncrement = () => {
      var newIncrement=0;
      var difficulty=this.props.baseDifficulty
      if(difficulty === 2){
        this.setState({increment:7})
      }else{
        if(this.state.increment ===3 && this.state.threeCount<3){
          this.setState({threeCount:this.state.threeCount+1})
        }else if(this.state.increment === 2 && this.state.increment<4){
          this.setState({twoCount:this.state.twoCount+1})
        }else if(this.state.threeCount === 3 && this.state.increment === 3){
          this.setState({increment:1})
        }else{
          this.setState({increment:this.state.increment-1})
        }
      }
    }

    setBaseTime = () => {
        var secondsGiven = 0
        var difficulty = this.props.baseDifficulty
        if(difficulty === 1){
          secondsGiven = 22
          this.setState({
            increment:10,
            difficulty:1
          })
        }else if(difficulty === 2){
          secondsGiven = 17
          this.setState({
            increment:5,
            difficulty:2
          })
        }else{
          secondsGiven = 12
          this.setState({
            increment:3,
            difficulty:3
          })
        }
        this.startCountDown(secondsGiven)
    }

    handleChange = (event) => {
      this.setState({
        value: event.target.value
      })
    }
  
    tick = () => {
      let min = Math.floor(this.secondsRemaining / 60);
      let sec = this.secondsRemaining - (min * 60);

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
      

      if (min === 0 && sec === 0) {
        clearInterval(this.intervalHandle);
        this.setState({threeCount:1,twoCount:1})
        this.props.userFinished()
        this.props.PlayerLost(this.props.accuracyInfo,this.state.timeElapse)
      }
      

      this.secondsRemaining--
      if(this.props.NeedsToIncrement && this.props.accuracyInfo.allowedToAddTime){
        if(this.props.IncrementLevel){
           this.calculateIncrement()
        }
        this.secondsRemaining = this.secondsRemaining + this.state.increment
        this.props.resetFunction();
        this.props.resetFlag()
      }
    }
  
    startCountDown = (baseTime) => {
      this.intervalHandle = setInterval(this.tick, 1000);
      let time = baseTime;
      this.secondsRemaining = time; 
      this.setState({
        isClicked : true
      })
    }
  
    render() {
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
    }
  }
  
  export default Counter;
  