import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style/Challenge.css';
import './style/styles.css';
import Button from 'react-button-component'
import Header from './components/header'
import DifficultyTab from './DifficultyTab'
import ShowSpinner from './components/spinner';

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  fetchLessonById
} from './actions/learn'

import { getCurrentLessonForUser } from './actions/homepage';

const CustomButton = Button.extend`
    margin-top:4vh;
    height: 82px;	
    width: 270px;	
    border: 5px solid #F5A623;	
    border-radius: 10px;	
    background-color: #FFFFFF;
    font-size:30px;

`


class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      headerLinks: ["Games", "Learn", "Home"],
      isEzActive:false,
      isMidActive:false,
      isHardActive: false
    }
  }

  disableOtherOptions()
  {
    
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

      return (
        <div>
          <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/>
          <div className="game-title-container">
            <div className="game-description-title">
                <p>Challenge</p>
            </div>
            <div className="game-description">
                <p>Type as many phrases as possible before time runs out.</p>
                <p>Everytime you correctly type a phrase, more time will be added to</p>
                <p>your counter and your streak will increase.</p>
            </div>

          </div>
          <div className="difficulty-selection">
            <div className="difficulty-text">
                <p> SELECT DIFFICULTY </p>
            </div>
            <div className="actual-difficulties">
              <DifficultyTab isEzActive   = {this.state.isEzActive}   difficulty='Easy'/>
              <DifficultyTab isMidActive  = {this.state.isMidActive}  difficulty='Medium'/>
              <DifficultyTab isHardActive = {this.state.isHardActive} difficulty='Hard'/>
            </div>
          </div>
          <div className="play-button">
            <CustomButton onClick={() => alert("Shit was clicked")}>
              <p>PLAY</p>
            </CustomButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
