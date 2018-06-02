import React, { Component } from 'react';
import Header from './components/header'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spinkit';
import './style/Learn.css';

import LessonsView from './LessonsView';
import ChaptersView from './ChaptersView';
import ShowSpinner from './components/spinner';

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons 
} from './actions/learn'

class Learn extends Component {
  constructor(props) {
    super(props);

    this.props.fetchAllChapterNames();
    this.props.fetchAllPairs("bbu9uqje8cdm8j5109ug");
    this.props.fetchCompletedLessons("bbu9uqje8cdm8j5109ug");

    this.state = {
      currentChapterIndex: -1,
      shouldShowLessons: false,
      carouselTitle: "Chapter Overview",
      carouselDesc: "Something",
      headerLinks: ["Learn", "Progress", "Home"],
    }
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
    let {  
      currentChapterIndex,
      shouldShowLessons
    } = this.state;

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
      completedLessons 
    } = this.props;

    if(isLoading) {
      return <ShowSpinner />
    } 

    const { 
      headerLinks, 
      shouldShowLessons, 
      currentChapterIndex,  
      carouselDesc 
    } = this.state;

    let title;
    let body;
    if (shouldShowLessons) {
      body = <LessonsView lessons={chapterLessonPairs[currentChapterIndex].lessons} 
      completed={completedLessons} />
      title = chapterLessonPairs[currentChapterIndex]['chapterName']
    } else {
      body = <ChaptersView chapters={allChapters} 
      userDidClickChapter={this.userDidClickChapter} />
      title = "Chapter Overview"
    }

      return (
        <div>
          <Header links={headerLinks}/>
          <div className="content container">
            <div className="title">
              <h2>Fundamentals of Typing Tutorial</h2>
            </div>
            <div className="block">
              <div className="carousel row">
                <div className="arrow-left column column-10" onClick={this.prevChapter}>
                  <h3>a</h3>
                </div>
                <div className="carousel-content column">
                  <div className="carousel-title">
                    <h2 className="title">{title}</h2>
                  </div>
                  <div className="carousel-desc">
                    <h3 className="desc">{carouselDesc}</h3>
                  </div>
                </div>
                <div className="arrow-right column column-10" onClick={this.nextChapter}>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    fetchAllChapterNames, 
    fetchAllPairs, 
    fetchCompletedLessons 
  }, dispatch);
}

const mapStateToProps = ({ app }) => {
  return {
    allChapters: app.allChapters,
    isLoading: app.isLoading,
    chapterLessonPairs: app.chapterLessonPairs,
    completedLessons: app.completedLessons,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);
