import React, { Component } from 'react';

import './style/Learn.css';
import { Link } from 'react-router-dom';
import Header from './components/header'
import header from './components/header';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from 'react-spinkit';

import { fetchAllChapterNames, fetchAllPairs } from './actions/learn';

class Learn extends Component {
  constructor(props) {
    super(props);

    this.props.fetchAllChapterNames();
    this.props.fetchAllPairs();

    this.state = {
      chapterPos: 0,
      shouldShowLessons: false,
      carouselTitle: "Chapter Overview",
      carouselDesc: "Something",
      headerLinks: ["Learn", "Progress", "Home"]
    }
  }

  makeChapterObjects = data => {
    console.log(data);
  }

  userDidClickChapter = i =>  {
    const {chapterName, chapterDesc } = this.props.chapterLessonPairs[i];
    this.setState({shouldShowLessons: true, chapterPos:i, carouselTitle: chapterName, carouselDesc: chapterDesc})
  }

  render() {
    const { isLoading, chapterLessonPairs, allChapters } = this.props;

    if(isLoading) {
      return <Spinner name='double-bounce' />
    } else {
      const { chapters, headerLinks, shouldShowLessons, chapterPos, carouselTitle, carouselDesc } = this.state;
      const body = shouldShowLessons ? <ShowLessons lessons={chapterLessonPairs[chapterPos].lessons} chapterName={chapterLessonPairs[chapterPos]['chapterName']}/> 
      : <ShowChapters chapters={allChapters} userDidClickChapter={this.userDidClickChapter} />

      return (
        <div>
          <Header links={headerLinks}/>
          <div className="content container">
            <div className="title">
              <h2 className="title-content">Fundamentals of Typing Tutorial</h2>
            </div>
            <div className="block">
              <div className="carousel">
                <div className="arrow-left">
                  <h3>a</h3>
                </div>
                <div className="carousel-content">
                  <div className="carousel-title">
                    <h2 className="title">{carouselTitle}</h2>
                  </div>
                  <div className="carousel-desc">
                    <h3 className="desc">{carouselDesc}</h3>
                  </div>
                </div>
                <div className="arrow-right">
                  <h3>n</h3>
                </div>
              </div>
              { body }
            </div>
          </div>
        </div>
      )
    }
  }
}

class ShowLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {currentSelectedLesson: this.props.lessons[0]}
  }

  userDidChangeLesson = clickedLesson => {
    this.setState({currentSelectedLesson: clickedLesson})
  }

  render() {
    const { chapterName, lessons } = this.props;
    const { currentSelectedLesson } = this.state;
    const hasCompleted = currentSelectedLesson.hasCompleted;
    const lessonStats = hasCompleted ? showCompletedLesson(currentSelectedLesson) : showLock()

    console.log(lessons, chapterName);

    return (
      <div className="container lesson-wrapper"> 
        <div class="container lesson-left">
          {lessons.map(lesson => {
            if(lesson.LessonName === currentSelectedLesson.lessonName) { 
                return <h4 style={{color: 'green'}} onClick={() => this.userDidChangeLesson(lesson)}>{lesson.LessonName}</h4>
            } else if (lesson.hasCompleted) {
                return <h4 style={{color: 'black'}} onClick={() => this.userDidChangeLesson(lesson)}>{lesson.LessonName}</h4>
            } else {
              return <h4 style={{color: 'grey'}} onClick={() => this.userDidChangeLesson(lesson)}>{lesson.LessonName}</h4>
            }
          })}
        </div>
        <vl className="lesson-sep"/>
        <div class="container lesson-right">
          <div className="lesson-stats">
            { lessonStats }
          </div>
        </div>
      </div>
    )
  }
}

const showLock = () => {
  return (
    <div>
      <div>lock here</div>
      <div>
        <h4>To unlock this lesson, please complete the previous lesson</h4>
      </div>
    </div>  
  )
}

const showCompletedLesson = currentSelectedLesson => {
  return (
    <div>
    <div className="lesson-stats-icon row">
      <div className="lesson-badge-content-square col">
        <h2 className="lesson-badge-content-txt"><b>{currentSelectedLesson.stats.wpm}</b></h2>
      </div>
      <h3 className="lesson-badge-desc col">Words Per Minute</h3>
    </div>
    <div className="lesson-stats-icon row">
      <div className="lesson-badge-content-circle">
        <h2 className="lesson-badge-content-txt-circle"><b>{currentSelectedLesson.stats.accuracy}%</b></h2>
      </div>
      <h3 className="lesson-badge-desc col">Accuracy</h3>
    </div>
    <div className="lesson-stats-icon row">
      <img src="/images/buttons/ResumeButtonSquare.svg" className="resume-button"></img>
      <a className="lesson-badge-link col">Next Lesson</a>
    </div>
    </div>
  )
}

class ShowChapters extends Component {
  clickedChapter = (e, i) => {
    const chapterPos = e.target.dataset['id'];
    this.props.userDidClickChapter(chapterPos);
  }

  render() {
    return (
        <div className="block-info">
          <div className="chapter-info">
          {this.props.chapters.map((chapter, i) => {
            return (
              <div className="chapter">
                <div className="chapter-num">
                  <h4 className="num">{i}</h4>
                </div>
                <div className="chapter-name">
                  <h3 onClick={this.clickedChapter} data-id={i}>{chapter}</h3>
                </div>
              </div>
            )
          })}
          </div>
        </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchAllChapterNames, fetchAllPairs }, dispatch);
}

const mapStateToProps = ({ app }) => {
  return {
    allChapters: app.allChapters,
    isLoading: app.isLoading,
    chapterLessonPairs: app.chapterLessonPairs
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);