import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style/Tutorial.css'

import LessonTutorialButtons from './components/TutorialButtons';
import TutorialContent from './components/TutorialContent';
import Header from './components/header';
import Keyboard from './components/Keyboard';
import RightHand from './components/RightHand';
import LeftHand from './components/LeftHand';
import ShowSpinner from './components/spinner';
import TutorialStats from './components/TutorialStats';
import TutorialImage from './components/TutorialImage';

import { postTutorialResults, fetchLesson, redirectToNextLesson } from './actions/tutorial';
import { getCurrentLessonForUser } from './actions/homepage';


class Tutorial extends Component {
  constructor(props) {
    super(props);
    
    let currentLesson;
    if(this.props.source === "LearnPage") {
      currentLesson = this.props.chosenLessonFromLearn;
    } else {
      currentLesson = this.props.currentLesson;
    }
    const { lessonDescriptions, lessonText, lessonImages } = currentLesson;

    const contentList = [];
    const contentTypeList = [];
    lessonText.forEach((val, i) => {
      if(val !== "") {
        contentList.push(val);
        contentTypeList.push(this.contentType.TEXT)
      }
      if(lessonDescriptions[i] !== "") {
        contentList.push(lessonDescriptions[i]);
        contentTypeList.push(this.contentType.DESCRIPTION);
      }
    });
    const totalContentLength = contentList.length;

    this.state = {
      contentList,
      contentTypeList,
      lessonDescriptions,
      totalContentLength,
      lessonImages,
      content: contentList[0],
      correctCount: 0,
      headerLinks: [], //["Learn", "Home"],
      indexPtr: 0,
      shouldFreeze: true,
      totalTime: 0,
      userState: this.appState.READING,
      isFinished: false,
      wpm: 0,
      shouldShowStats: false,
      didUserPassLesson: true,
      results: {
        totalTime: 0,
        totalLength: 0,
        totalIncorrect: 0,
      },
      resultsForCurrentLesson: {
        time: 0,
        length: 0,
        incorrect: 0
      }
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentLesson.lessonID !== prevProps.currentLesson.lessonID) {
      this.setUp(this.props.currentLesson);
    }
  }

  componentWillMount = () => {
    this.freezeTimerIfIsLessonText();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyPressed);
    this.setState({
      results: {
        totalTime: 0,
        totalLength: 0,
        totalIncorrect: 0,
      },
      wpm: 0,
      totalTime: 0,
    })
  }

  isLastContent = () => {
    return (this.state.indexPtr + 1) >= this.state.contentList.length;
  }

  onKeyPressed = (e) => {
    let isRightKey = ['ArrowLeft', 'ArrowRight'].indexOf(e.key);
    switch(isRightKey) {
      case 1:
        if(this.isLastContent()) {
          (this.state.userState === this.appState.READING) ? this.redirectToNextLesson() : this.postTutorialResultsAndRedirectToNextLesson();
        } else {
          this.next();
        }
        break;
      case 0:
        this.prev();
        break;
      default:
        return;
    }
  };

  setUp = (currentLesson) => {
    const { lessonDescriptions, lessonText, lessonImages } = currentLesson;

    const contentList = [];
    const contentTypeList = [];
    lessonText.forEach((val, i) => {
      if(val !== "") {
        contentList.push(val);
        contentTypeList.push(this.contentType.TEXT)
      }
      if(lessonDescriptions[i] !== "") {
        contentList.push(lessonDescriptions[i]);
        contentTypeList.push(this.contentType.DESCRIPTION);
      }
    });
    const totalContentLength = contentList.length;

    this.setState({
      contentList,
      contentTypeList,
      lessonDescriptions,
      totalContentLength,
      content: contentList[0],
      correctCount: 0,
      indexPtr: 0,
      shouldFreeze: true,
      totalTime: 0,
      userState: this.appState.READING,
      wpm: 0,
      shouldShowStats: false,
      didUserPassLesson: false,
      results: {
        totalTime: 0,
        totalLength: 0,
        totalIncorrect: 0,
      }, 
      resultsForCurrentLesson: {
        time: 0, 
        length: 0,
        incorrect: 0
      }
    })
    this.freezeTimerIfIsLessonText();
  }

  appState = Object.freeze({
    COMPLETED_TUTORIAL: "completed",
    READING: "reading",
    TYPING: "typing",
  });

  // As specified in the database, lesson descriptions is what people type, 
  // and lesson text is what people read
  contentType = Object.freeze({
    DESCRIPTION: "description",
    TEXT: "text"
  })

  updateResults = ({ time, length, incorrect }) => {
    let { totalTime, totalLength, totalIncorrect } = this.state.results;
    totalIncorrect += incorrect;
    totalTime += time;
    totalLength += length;

    const accuracy = (totalLength - totalIncorrect) / totalLength;
    if(accuracy < .69) {
      this.setState({ 
        didUserPassLesson: false,
        results: {
          totalTime,
          totalIncorrect,
          totalLength
        }, resultsForCurrentLesson: {
          time,
          length,
          incorrect
        }
      });
    } else {
      this.setState({
        results: {
          totalTime,
          totalLength,
          totalIncorrect
        }, resultsForCurrentLesson: {
          time, 
          length, 
          incorrect
        },
        didUserPassLesson: true
      });
    }
  }

  clearStatsForCurrentLesson = () => {
    this.setState({ resultsForCurrentLesson: { time: 0, length: 0, incorrect: 0 } });
  }

  setTutorialStats = ({ wpm, time, accuracy }) => {
    this.setState({ wpm, accuracy, time });
  }

  calculateTime = txt => {
    return (txt.length/5) * 60/200 * 100;
  };

  next = () => {
    let { indexPtr, totalContentLength } = this.state;
    if(indexPtr < totalContentLength) {
      indexPtr += 1;
      this.freezeTimerIfIsLessonText();
    }
    this.clearStatsForCurrentLesson();
    this.setState({ indexPtr, shouldShowStats: false, isFinished: false });
  };

  prev = () => {
    let { indexPtr } = this.state;
    const { time, length, incorrect} = this.state.resultsForCurrentLesson;
    const { totalIncorrect, totalTime, totalLength } = this.state.results;
    if(indexPtr - 1 < 0) {
      indexPtr = 0;
    } else {
      indexPtr -= 1;
    }
    
    this.setState({ 
      indexPtr, 
      shouldShowStats: false,
      results: {
        totalTime: totalTime - time,
        totalLength: totalLength - length,
        totalIncorrect: totalIncorrect - incorrect
      }
    });
    this.clearStatsForCurrentLesson();
  };

  getContent = (indexPtr) => {
    const { contentList, contentTypeList, lessonImages } = this.state;

    if(indexPtr >= contentList.length) {
      return { 
        content: null, 
        userState: this.appState.COMPLETED_TUTORIAL
      };
    }
    
    let userState;
    if(contentTypeList[indexPtr] === this.contentType.TEXT) {
      userState = this.appState.READING;
    } else {
      userState = this.appState.TYPING 
    }

    const content = contentList[indexPtr];
    return { content, userState };
  };

  freezeTimerIfIsLessonText = () => {
    const { indexPtr, contentList } = this.state;
    if(!contentList[indexPtr]) {
      return;
    }
    const totalTime = this.calculateTime(contentList[indexPtr]);
    this.setState({ shouldFreeze: true });
    setTimeout(() => {
      this.setState({ shouldFreeze: false });
    }, totalTime);
  };

  postTutorialResultsAndRedirectToNextLesson = () => {
    this.props.postTutorialResults({
      wpm: Math.trunc((this.state.results.totalLength / 5) / ((this.state.results.totalTime)/60)),
      accuracy: ((this.state.results.totalLength - this.state.results.totalIncorrect) / this.state.results.totalLength) * 100,
      uid: this.props.currentUser.uid,
      chapterID: this.props.currentLesson.chapterID,
      lessonID: this.props.currentLesson.lessonID
    }, this.props.source);
    console.log(this.props.source); 
  }

  // In the case the last rendered content is text, we still want to make sure we record the lesson, 
  // but without any speed/accuracy
  redirectToNextLesson = () => {
    this.props.postTutorialResults({
      wpm: null, 
      accuracy: null,
      uid: this.props.currentUser.uid,
      chapterID: this.props.currentLesson.chapterID,
      lessonID: this.props.currentLesson.lessonID
    }, this.props.source);
    console.log(this.props.source); 
  }

  showStats = () => {
    this.setState({ shouldShowStats: true });
  }

  isFinished = () => {
    this.setState({ isFinished: true });
  }

  render() { 
    const { 
      headerLinks,
      shouldFreeze,
      indexPtr,
      totalContentLength,
      shouldShowStats,
      didUserPassLesson,
      resultsForCurrentLesson,
      lessonImages
    } = this.state;
    
    if(this.props.currentLesson.showSpinner || !this.props.currentLesson.hasFinishedLoading) {
      return ShowSpinner();
    }

    const { content, userState } = this.getContent(indexPtr);

    let hasImage;
    let imagePath;
    if(userState === this.appState.READING && lessonImages[indexPtr] !== "") {
      hasImage = true;
      imagePath = lessonImages[indexPtr];
      console.log(imagePath);
    } else {
      hasImage = false;
    }

    const { username } = this.props.currentUser
    
    return (
      <React.Fragment>
        <Header links={headerLinks} isLoggedIn={true} username={username} isTutorial={true}/>
        <div className="container tutorial">
          {userState === this.appState.READING ? (
            <div className="info-text">
              <div className="tutorial-text">{content}</div>
                { hasImage ? (
                  <TutorialImage path={imagePath} />
                ) : (
                  <div className="tutorial-hands-keyboard">
                    <LeftHand />
                    <Keyboard />
                    <RightHand />
                  </div>
                )}
            </div>
          ) : (
            <TutorialContent
              currentContent={content}
              completedStats={this.setTutorialStats}
              updateResults={this.updateResults}
              currentUser={this.props.currentUser}
              showStats={this.showStats}
              isFinished={this.isFinished}
            />
          )}{shouldShowStats && (
            <TutorialStats 
              time={resultsForCurrentLesson.time}
              length={resultsForCurrentLesson.length}
              incorrect={resultsForCurrentLesson.incorrect}
              didUserPassLesson={didUserPassLesson}
            />
          )}
          <LessonTutorialButtons 
            next={this.next}
            prev={this.prev}
            isFinished={this.state.isFinished}
            isLastContent={this.state.indexPtr + 1 >= this.state.contentList.length}
            redirectToNextLesson={
              userState === this.appState.READING ? (
                this.redirectToNextLesson
              ) : (
                this.postTutorialResultsAndRedirectToNextLesson
              )}
            shouldFreeze={shouldFreeze}
            userState={userState}
            didUserPassLesson={didUserPassLesson}
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({ 
    postTutorialResults,
    getCurrentLessonForUser,
    fetchLesson,
    redirectToNextLesson,
  }, dispatch)
}

const mapStateToProps = ({ app, auth }) => ({
  currentLesson: app.currentLesson,
  chosenLessonFromLearn: app.chosenLessonFromLearn,
  source: app.source,
  currentUser: auth.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
