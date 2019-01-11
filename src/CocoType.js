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

const LevelCounter  = styled.div`
@font-face {
  font-family: 'Arcade';
  font-style: normal;
  font-weight: 600;
  src:url(${Racetrack});
}

border: 5px solid green;
height:10vh;
width:10vw;

`
const StreakCounter = styled.div`
@font-face {
  font-family: 'Arcade';
  font-style: normal;
  font-weight: 600;
  src:url(${Racetrack});
}
border: 5px solid blue;
height:10vh;
width:10vw;
` 
const GameTitle = styled.div`
@font-face {
  font-family: 'Avenir';
  font-style: normal;
  src:
    local('Aveni'),
    local('AvenirLTStd-Book'),
    url(${Avenir});
}
font-family:Avenir;
border: 5px solid red;
height:10vh;
width:80vw;
margin-bottom:50px;
display:flex;
justify-content: space-evenly;

  & p {

    font-size:36px;
    margin-top:-9vh;
    
  }

`

const MetaWrapper = styled.div`
width:100vw;
display:inline-flex;
`

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
          <MetaWrapper>
            <StreakCounter></StreakCounter>
            <GameTitle><p>Challenge</p></GameTitle>
            <LevelCounter></LevelCounter>
          </MetaWrapper>        
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
