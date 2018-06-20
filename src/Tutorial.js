import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './style/Tutorial.css'

import { 
  moveIndexPtr, 
  unFreeze, 
  freeze, 
  completedTutorial,
  fetchCurrentLessonIfNeeded
} from './actions/tutorial';

import LessonTutorialButtons from './components/TutorialButtons';
import TutorialContent from './components/TutorialContent';
import Header from './components/header';
import Keyboard from './components/Keyboard';
import RightHand from './components/RightHand';
import LeftHand from './components/LeftHand';

class Tutorial extends Component {

  constructor(props) {
    super(props);

    const { currentLesson } = this.props;
    const { lessonContent, lessonInformation } = currentLesson;

    const contentLength = lessonContent.length;
    const infoLength = lessonInformation.length;

    this.state = {
      contentLength,
      infoLength,
      lessonContent,
      lessonInformation,
      indexPtr: 0,
      isFinished: false,
      shouldFreeze: true,

      headerLinks: ["Learn", "Progress", "Home"],
    };
  }

  componentWillMount = () => {
    this.freezeTimerIfIsLessonInfo();
  }

  calculateTime = txt => {
    // Sang's ~magical algorithm~
    return (txt.length/5) * 60/200 * 1000;
  };

  next = () => {
    let { indexPtr, contentLength } = this.state;
    if(indexPtr + 1 < contentLength) {
      indexPtr += 1;
      this.freezeTimerIfIsLessonInfo();
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

  getNextPair = () => {
    const {
      indexPtr,
      lessonContent,
      lessonInformation
    } = this.state;

    return { 
      content: lessonContent[indexPtr],
      info: lessonInformation[indexPtr]
    }
  };

  freezeTimerIfIsLessonInfo = () => {
    const { indexPtr, lessonInformation } = this.state;
    if(!lessonInformation[indexPtr]) {
      return;
    }

    const totalTime = this.calculateTime(lessonInformation[indexPtr]);
    this.setState({ shouldFreeze: true });
    setTimeout(() => {
      this.setState({ shouldFreeze: false });
    }, totalTime);
  };

  render() { 
    const { 
      headerLinks, 
      lessonContent, 
      lessonInformation, 
      indexPtr,
      contentLength,
      isFinished,
      shouldFreeze
    } = this.state;

    if(indexPtr >= contentLength)
      return <h1>done!</h1>;

    const { content, info } = this.getNextPair();
    let isActive = true;
    let isBubbleActive = false;

    if(isFinished) {
      return <h3>isFinished</h3>
    }

    if(content === "") {
      isActive = false;
      isBubbleActive = true;
    } else {
      isBubbleActive = false;
      isActive = true;
    }

    //TODO: decouple keyboard & hands from this component to be apart of TutorialContent}
    return (
      <div>
        <Header links={headerLinks}/>
        <div className="container tutorial">
          {/* <SpeechBubble text={info} active={isBubbleActive} /> */}
          {!isActive && <div className="info-text">
            <h4>{info}</h4>
          </div>}
          {isActive && <TutorialContent
            currentContent={content}
            isActive={isActive}
          />}
          {!isActive && <div className="tutorial-hands-keyboard">
            <LeftHand />
            <Keyboard />
            <RightHand />
          </div>}
          <LessonTutorialButtons 
            next={this.next} 
            prev={this.prev} 
            isNextActive={shouldFreeze}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({ 
    moveIndexPtr, 
    unFreeze, 
    freeze, 
    completedTutorial, 
    fetchCurrentLessonIfNeeded 
  }, dispatch)
}

const mapStateToProps = ({ app }) => ({
  currentLesson: app.currentLesson
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);