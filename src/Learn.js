import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Header from './components/header'
import LessonsView from './LessonsView';
import ChaptersView from './ChaptersView';
import ShowSpinner from './components/spinner';

import { ChapterService, TutorialService, LocalStorageCache } from './services';

import './style/Learn.css';

class Learn extends Component {
  constructor(props) {
    super(props);

    this.chapterService = new ChapterService();
    this.tutorialService = new TutorialService();
    this.cache = new LocalStorageCache();

    this.state = {
      isLoading: true,
      uid: this.cache.get("uid"),
      shouldRedirectToLesson: false,
      currentChapterIndex: -1,
      shouldShowLessons: false,
      carouselTitle: "Chapter Overview",
      carouselDesc: "",
      headerLinks: ["Learn", "Home"],
    }
  }

  componentDidMount() {
    this.setState({isLoading: true});

    Promise.all([
      this.chapterService.getChapterNames(),
      this.chapterService.getChaptersAndLessons(),
      this.tutorialService.getCompletedLessons(this.state.uid),
      this.tutorialService.getCurrentLesson(this.state.uid)
    ]).then(([
        chapterNames, 
        chapterLessonPairs, 
        completedLessons,
        currentLesson
      ]) => {
      this.setState({ 
        chapterNames, 
        chapterLessonPairs, 
        completedLessons, 
        currentLesson,
        isLoading: false
      })
    }).catch(err => {
      console.log(err);
    })
  }
  
  doRestartLesson = lessonID => {
    this.props.fetchLessonById({ lessonID });
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
      shouldShowLessons,
      chapterLessonPairs
    } = this.state;

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
    let { currentChapterIndex,shouldShowLessons, chapterLessonPairs } = this.state;
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
    if(this.state.isLoading) {
      return <ShowSpinner />
    } 

    const { 
      headerLinks, 
      shouldShowLessons, 
      currentChapterIndex,  
      carouselDesc,
      shouldRedirectToLesson,
      chapterLessonPairs, 
      chapterNames, 
      completedLessons,
      currentLesson
    } = this.state;

    if(shouldRedirectToLesson) {
      return <Redirect to="/tutorial" />
    }

    let title;
    let body;
    if (shouldShowLessons) {
      body = (
        <LessonsView 
          lessons={chapterLessonPairs[currentChapterIndex].lessons} 
          completed={completedLessons} 
          mostRecentLessonName={currentLesson.lessonName}
          doRestartLesson={this.doRestartLesson}
        />
      );
      title = chapterLessonPairs[currentChapterIndex]['chapterName']
    } else {
      body = <ChaptersView chapters={chapterNames} userDidClickChapter={this.userDidClickChapter} />
      title = "Chapter Overview"
    }

    return (
      <div>
        <Header links={headerLinks} isLoggedIn={this.cache.get("isLoggedIn")} username={this.cache.get("username")}/>
        <div className="content container title-container">
          <div className="title">
            <h2 className="title">Fundamentals of Typing Tutorial</h2>
          </div>
          <div className="block">
            <div className="carousel row">
              <div className="arrow-left column column-10" onClick={this.prevChapter} />
              <div className="carousel-content column">
                <div className="carousel-title">
                  <div onClick={this.prevChapter} className="learn-carousel-buttons left-carousel-button">
                    <img src="images/buttons/Left_Arrow_Thin.svg"></img>
                  </div>
                  <h2 className="chapter-title">{title}</h2>
                  <div onClick={this.nextChapter} className="learn-carousel-buttons right-carousel-button">
                    <img src="images/buttons/Right_Arrow_Thin.svg"></img>
                  </div>
              </div>
              <div className="carousel-desc">
                <h3 className="desc">{carouselDesc}</h3>
              </div>
            </div>
            <div className="arrow-right column column-10" onClick={this.nextChapter}/>
          </div>
            { body }
          </div>
        </div>
      </div>
    )
  }
}

export default Learn;
