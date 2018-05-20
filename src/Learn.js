import React, { Component } from 'react';
import Header from './components/header'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spinkit';
import './style/Learn.css';

import LessonsView from './LessonsView';
import ChaptersView from './ChaptersView';

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
      chapterPos: 0,
      shouldShowLessons: false,
      carouselTitle: "Chapter Overview",
      carouselDesc: "Something",
      headerLinks: ["Learn", "Progress", "Home"]
    }
  }

  userDidClickChapter = i =>  {
    const { 
      chapterName, 
      chapterDesc 
    } = this.props.chapterLessonPairs[i];

    this.setState({ 
      shouldShowLessons: true, 
      chapterPos:i, 
      carouselTitle: chapterName, 
      carouselDesc: chapterDesc
    })
  }

  render() {
    const { 
      isLoading, 
      chapterLessonPairs, 
      allChapters, 
      completedLessons 
    } = this.props;

    if(isLoading) {
      return <Spinner name='double-bounce' />
    } else {
      const { 
        headerLinks, 
        shouldShowLessons, 
        chapterPos, 
        carouselTitle, 
        carouselDesc 
      } = this.state;
      console.log(chapterLessonPairs)

      const body = shouldShowLessons 
      ? <LessonsView 
          lessons={chapterLessonPairs[chapterPos].lessons} 
          completed={completedLessons} 
          chapterName={chapterLessonPairs[chapterPos]['chapterName']}
        /> 
      : <ChaptersView 
          chapters={allChapters} 
          userDidClickChapter={this.userDidClickChapter} 
        />

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
    completedLessons: app.completedLessons
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);