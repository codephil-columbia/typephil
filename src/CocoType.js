import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header'
import ShowSpinner from './components/spinner';
import styled from 'styled-components';
import Racetrack from './fonts/Racetrack/Racetrack_Stencil.otf'
import Avenir from './fonts/avenir_ff/AvenirLTStd-Book.otf'
import './style/CocoType.css'
import { Route, Switch, Redirect } from 'react-router-dom'

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  fetchLessonById
} from './actions/learn'

import { getCurrentLessonForUser } from './actions/homepage';



class CocoType extends Component {
  constructor(props) {
    super(props);
    this.state ={
      headerLinks: ["Games", "Learn", "Home"],

    }
  }

  render() {
    const { 
      isLoading, 
    } = this.props;

    if(isLoading) {
      return <ShowSpinner />
    } 

    const { 
      headerLinks, 
    } = this.state;
    console.log(this.props.difficulty)
      return (
        <div>
          <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}></Header>
          <div className="MetaWrapper">
            <div className="StreakCounter">
                <div className="CounterName">
                Streak
                </div>
                <div className="CounterData">
                20
                </div>
            </div>
            <div className="GameTitle">
                <p>Challenge</p>
            </div>
            <div className="LevelCounter">
                <div className="CounterName">
                Level
                </div>
                <div className="CounterData">
                4
                </div>
            </div>
          </div>  
          <div className="TimerContainer">
                <div className="Timer">
                00:03
                </div>
                <div className="TimerText">
                Seconds
                </div>
            </div>      
        </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(CocoType);