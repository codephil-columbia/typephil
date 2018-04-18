import React, { Component } from 'react';

import './style/Learn.css';
import { Link } from 'react-router-dom';
import Header from './components/header'
import header from './components/header';

class Learn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapterPos: 0,
      shouldShowLessons: false,
      carouselTitle: "Chapter Overview",
      carouselDesc: "Something",
      chapters: [
        {chapterName: "The Basics", lessons: [{lessonName: 'Some really long lesson here', hasCompleted: true, stats:{wpm: 26, accuracy: 100}}, {lessonName: '1.2', hasCompleted:false}], chapterDesc: 'Test'},
        {chapterName: "Home Row", lessons: [{lessonName: '7'}], chapterDesc: 'Test'},
        {chapterName: "Shift & Punctiation", lessons: [{lessonName: "2"}], chapterDesc: 'Test'},
        {chapterName: "Top Row", lessons: [{lessonName: "2"}], chapterDesc: 'Test'},
        {chapterName:"Bottom Row", lessons: [{lessonName: "3"}], chapterDesc: 'Test'},
        {chapterName:"Establishing a Rhythm", lessons: [{lessonName: "4"}], chapterDesc: 'Test'},
        {chapterName: "Numbers", lessons: [{lessonName: "5"}], chapterDesc: 'Test'},
        {chapterName:"Special Characters", lessons: [{lessonName: "6"}], chapterDesc: 'Test'}
      ],
      headerLinks: ["Learn", "Progress", "Home"]
    }
  }

  userDidClickChapter = i =>  {
    const {chapterName, chapterDesc } = this.state.chapters[i];
    this.setState({shouldShowLessons: true, chapterPos:i, carouselTitle: chapterName, carouselDesc: chapterDesc})
  }

  render() {
    const { chapters, headerLinks, shouldShowLessons, chapterPos, carouselTitle, carouselDesc } = this.state;
    const body = shouldShowLessons ? <ShowLessons lessons={chapters[chapterPos]['lessons']} chapterName={chapters[chapterPos]['chapterName']}/> 
      : <ShowChapters chapters={chapters} userDidClickChapter={this.userDidClickChapter} />

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

const lessonLink = lessonName => {
  return (
    <div className="chapter-name">
      <h3>{lessonName}</h3>
  </div>
  )
}

class ShowLessons extends Component {
  constructor(props) {
    super(props);
    this.state = {currentSelectedLesson: this.props.lessons[0]}
  }

  render() {
    const { chapterName, lessons } = this.props;
    const { currentSelectedLesson } = this.state;

    return (
      <div className="container lesson-wrapper"> 
        <div class="container lesson-left">
          {lessons.map(lesson => {
            if(lesson.hasCompleted) {
                return <h2 style={{color: 'black'}}>{lessonLink(lesson.lessonName)}</h2>
            } else {
              return <h2 style={{color: 'grey'}}>{lessonLink(lesson.lessonName)}</h2>
            }
          })}
        </div>
        <vl className="lesson-sep"/>
        <div class="container lesson-right">
          <div className="lesson-stats">
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
          </div>
          <button>Start next lesson</button>
        </div>
      </div>
    )
  }
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
                  <h3 onClick={this.clickedChapter} data-id={i}>{chapter['chapterName']}</h3>
                </div>
              </div>
            )
          })}
          </div>
        </div>
    )
  }
}

export default Learn;