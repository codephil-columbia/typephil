import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import './style/Learn.css';

import Header from './components/header'
import LessonsView from './LessonsView';
import ChaptersView from './ChaptersView';
import ShowSpinner from './components/spinner';

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  restartLesson
} from './actions/learn'

class Learn extends Component {
  constructor(props) {
    super(props);

    this.props.fetchAllChapterNames();
    this.props.fetchAllPairs(this.props.currentUser.uid);
    this.props.fetchCompletedLessons(this.props.currentUser.uid);

    this.state = {
      shouldRedirectToLesson: false,
      currentChapterIndex: -1,
      shouldShowLessons: false,
      carouselTitle: "Chapter Overview",
      carouselDesc: "",
      headerLinks: ["Learn", "Home"],
    }
  }
  
  doRestartLesson = lessonID => {
    this.props.restartLesson(lessonID);
    this.setState({ shouldRedirectToLesson: true });
  }

  userDidClickChapter = i =>  {
    this.setState({ 
      shouldShowLessons: true, 
      currentChapterIndex:i
    })
  }

  nextChapter = () => {
    let { 
      currentChapterIndex,
      shouldShowLessons
    } = this.state;

    const { chapterLessonPairs } = this.props;
    const chapterCount = chapterLessonPairs.length;
    currentChapterIndex = Number(currentChapterIndex);

    if(currentChapterIndex + 1 >= chapterCount) {
      console.log(currentChapterIndex + 1, chapterCount);
      currentChapterIndex = -1;
      shouldShowLessons = false;
    }  else {
      currentChapterIndex += 1;
      shouldShowLessons = true;
    }

    this.setState({ currentChapterIndex, shouldShowLessons });
  }

  prevChapter = () => {
    let { currentChapterIndex,shouldShowLessons } = this.state;
    const { chapterLessonPairs } = this.props;
    const chapterCount = chapterLessonPairs.length;
    currentChapterIndex = Number(currentChapterIndex);
    
    if (currentChapterIndex - 1 === -1) {
      shouldShowLessons = false;
      currentChapterIndex = -1;
    } else if(currentChapterIndex - 1 < -1) {
      shouldShowLessons = true;
      currentChapterIndex = chapterCount - 1;
    } else {
      shouldShowLessons = true;
      currentChapterIndex -= 1;
    }

    this.setState({ currentChapterIndex, shouldShowLessons });
  }

  render() {
    const { 
      isLoading, 
      chapterLessonPairs, 
      allChapters, 
      completedLessons,
      currentLessonName
    } = this.props;

    if(isLoading) {
      return <ShowSpinner />
    } 

    const { 
      headerLinks, 
      shouldShowLessons, 
      currentChapterIndex,  
      carouselDesc,
      shouldRedirectToLesson
    } = this.state;

    if(shouldRedirectToLesson) {
      return <Redirect to="/tutorial" />
    }

    console.log(completedLessons);

    let title;
    let body;
    if (shouldShowLessons) {
      body = (
        <LessonsView 
          lessons={chapterLessonPairs[currentChapterIndex].lessons} 
          completed={completedLessons} 
          mostRecentLessonName={currentLessonName}
          doRestartLesson={this.doRestartLesson}
        />
      );
      title = chapterLessonPairs[currentChapterIndex]['chapterName']
    } else {
      body = <ChaptersView chapters={allChapters} userDidClickChapter={this.userDidClickChapter} />
      title = "Chapter Overview"
    }

      return (
        <div>
          <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn}/>
          <div className="content container">
            <div className="title">
              <h2>Fundamentals of Typing Tutorial</h2>
            </div>
            <div className="block">
              <div className="carousel row">
                <div className="arrow-left column column-10" onClick={this.prevChapter} />
                <div className="carousel-content column">
                  <div className="carousel-title">
                    <div onClick={this.prevChapter} className="learn-carousel-buttons">
                      <img src="images/buttons/Left_Arrow_Thin.svg"></img>
                    </div>
                  </div>
                  <h2 className="chapter-title">{title}</h2>
                  <div onClick={this.nextChapter} className="learn-carousel-buttons">
                    <img src="images/buttons/Right_Arrow_Thin.svg"></img>
                  </div>
                </div>
                <div className="carousel-desc">
                  <h3 className="desc">{carouselDesc}</h3>
                </div>
              </div>
              <div className="arrow-right column column-10" onClick={this.nextChapter}/>
            </div>
            {body}
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
    restartLesson
  }, dispatch);
}

const mapStateToProps = ({ app, auth }) => {
  return {
    allChapters: app.allChapters,
    isLoading: app.isLoading,
    chapterLessonPairs: app.chapterLessonPairs,
    completedLessons: app.completedLessons,
    currentUser: auth.currentUser,
    currentLessonName: app.currentLesson.lessonName
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
