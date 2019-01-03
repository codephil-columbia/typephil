import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import './style/Challenge.css';

import Header from './components/header'
import ShowSpinner from './components/spinner';

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  fetchLessonById
} from './actions/learn'

import { getCurrentLessonForUser } from './actions/homepage';

class Learn extends Component {
  constructor(props) {
    super(props);

    this.props.fetchAllChapterNames();
    this.props.fetchAllPairs(this.props.currentUser.uid);
    this.props.fetchCompletedLessons(this.props.currentUser.uid);

    if(this.props.currentLessonName === "") {
      this.props.getCurrentLessonForUser(this.props.currentUser.uid);
    }

    this.state = {
      shouldRedirectToLesson: false,
      currentChapterIndex: -1,
      shouldShowLessons: false,
      carouselTitle: "Chapter Overview",
      carouselDesc: "",
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

      return (
        <div>
          <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/>
          <div classname="game-title-container">
            <div classname="game-description">
                <p>lorem ipsum or some shit</p>
            </div>
          </div>
          <div classname="difficulty-selection">
            <div classname="difficuty-text">
                <p> SELECT DIFFICULTY </p>
            </div>
            <div classname="difficulty pointer">
                <p>*****</p>
            </div>
            <div className="actual-difficulties">
            <p>EASY</p> <p>MEDIUM</p> <p>HARD</p>
            </div>
            <div className="play-button">
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

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
