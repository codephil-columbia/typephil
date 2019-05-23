import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  fetchLessonById
} from './actions/learn'

import { getCurrentLessonForUser } from './actions/homepage';

import './style/counterPage.css'
import { DeviceSignalWifiOff } from "material-ui/svg-icons";

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
      this.tick = this.tick.bind(this);
    }
    

    componentDidMount(){
      this.startCountDown()
    }

    calculateIncrement(){
      var newIncrement=0;
      
      if(this.state.difficulty==1){
        this.setState({increment:2})
      }
      else if(this.state.difficulty==2){
        this.setState({increment:1})
      }
      else{
        var currIncrement=this.state.increment
        var newIncrement=currIncrement*(2/3)
        this.setState({increment:newIncrement})
      }
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
      


      if(this.props.timerShortStop){
        clearInterval(this.intervalHandle)
        this.props.PlayerLost(this.props.accuracyInfo,this.state.timeElapse)
      }


      console.log(this.state.timeElapse)
  
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
      

    }
  
    startCountDown() {
      this.intervalHandle = setInterval(this.tick, 1000);
    }
  
    render() {
      const clicked = this.state.isClicked;
      if(clicked){
      return (
        <div>
        
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



  const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
      fetchAllChapterNames, 
      fetchAllPairs, 
      fetchCompletedLessons,
      fetchLessonById,
      getCurrentLessonForUser
    }, dispatch);
  }
  
  const mapStateToProps = ({ app, auth }) => {
    return {
      allChapters: app.allChapters,
      isLoading: app.isLoading,
      chapterLessonPairs: app.chapterLessonPairs,
      completedLessons: app.completedLessons,
      currentUser: auth.currentUser,
      isLoggedIn: auth.isLoggedIn,
      currentLessonName: app.currentLesson.lessonName
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Counter);