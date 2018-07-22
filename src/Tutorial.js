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

import { 
  fetchCurrentLessonIfNeeded,
  postTutorialResults,
  fetchLesson
} from './actions/tutorial';

import { getCurrentLessonForUser } from './actions/homepage';

class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.props.fetchLesson(this.props.currentLesson.lessonID);
    console.log(this.props);

    const { currentLesson } = this.props;
    const { lessonDescriptions, lessonText } = currentLesson;

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
      content: contentList[0],
      correctCount: 0,
      headerLinks: ["Learn", "Progress", "Home"],
      indexPtr: 0,
      shouldFreeze: true,
      totalTime: 0,
      userState: this.appState.READING,
      wpm: 0,
      results: {
        totalTime: 0,
        totalLength: 0,
        totalIncorrect: 0,
      }
    };
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

  componentWillMount = () => {
    this.freezeTimerIfIsLessonText();
  }

  updateResults = ({ time, length, incorrect }) => {
    console.log("getting results", time, length, incorrect);
    let { totalTime, totalLength, totalIncorrect } = this.state.results;
    this.setState({
      results: {
        totalTime: totalTime + time,
        totalLength: totalLength + length,
        totalIncorrect: totalIncorrect + incorrect
      }
    });
  }

  setTutorialStats = ({ wpm, time, accuracy }) => {
    this.setState({ wpm, accuracy, time });
  }

  calculateTime = txt => {
    // Sang's ~magical algorithm~
    return (txt.length/5) * 60/200 * 100;
  };

  next = () => {
    let { indexPtr, totalContentLength } = this.state;
    if(indexPtr < totalContentLength) {
      indexPtr += 1;
      this.freezeTimerIfIsLessonText();
    }
    this.setState({ indexPtr });
  };

  prev = () => {
    let { indexPtr } = this.state;
    if(indexPtr - 1 < 0) {
      indexPtr = 0;
    } else {
      indexPtr -= 1;
    }
    this.setState({ indexPtr });
  };

  finishedLesson = () => {
    this.setState({ isFinished: true });
  };

  getContent = (indexPtr) => {
    const { contentList, contentTypeList } = this.state;

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

  postTutotialResultsAndRedirectToNextLesson = () => {
    console.log(this.state.results);
    this.props.postTutorialResults({
      wpm: Math.trunc((this.state.results.totalLength / 5) / ((this.state.results.totalTime)/60)),
      accuracy: ((this.state.results.totalLength - this.state.results.totalIncorrect) / this.state.results.totalLength) * 100,
      uid: this.props.currentUser.uid,
      chapterID: this.props.currentLesson.chapterID,
      lessonID: this.props.currentLesson.lessonID
    })
    this.props.getCurrentLessonForUser(this.props.currentUser.uid);
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
    })
    this.props.getCurrentLessonForUser(this.props.currentUser.uid);
  }

  render() { 
    const { 
      headerLinks,
      shouldFreeze,
      indexPtr,
      totalContentLength,
    } = this.state;

    const { content, userState } = this.getContent(indexPtr);

    if(userState === this.appState.COMPLETED_TUTORIAL) {
      return "done"
    }

    return (
      <React.Fragment>
        <Header links={headerLinks}/>
        <div className="container tutorial">
          {userState === this.appState.READING ? (
            <div className="info-text">
              <h4>{content}</h4>
              <div className="tutorial-hands-keyboard">
                <LeftHand />
                <Keyboard />
                <RightHand />
              </div>
            </div>
          ) : (
            <TutorialContent
              currentContent={content}
              completedStats={this.setTutorialStats}
              updateResults={this.updateResults}
              currentUser={this.props.currentUser}
            />
          )}
          <LessonTutorialButtons 
            next={this.next}
            prev={this.prev} 
            isLastContent={indexPtr + 1 >= totalContentLength}
            redirectToNextLesson={
              userState === this.appState.READING ? (
                this.redirectToNextLesson
              ) : (
                this.postTutotialResultsAndRedirectToNextLesson
              )}
            shouldFreeze={shouldFreeze}
            userState={userState}
          />
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({ 
    fetchCurrentLessonIfNeeded,
    postTutorialResults,
    getCurrentLessonForUser,
    fetchLesson
  }, dispatch)
}

const mapStateToProps = ({ app, auth }) => ({
  currentLesson: app.currentLesson,
  currentUser: auth.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
