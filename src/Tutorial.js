import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { 
  moveIndexPtr, 
  unFreeze, 
  freeze, 
  completedTutorial,
  fetchCurrentLessonIfNeeded
} from './actions/tutorial';

// import TutorialContent from './TutorialContent';
import LessonTutorialButtons from './components/LessonTutorialButtons';
import SpeechBubble from './components/SpeechBubble';
import LessonTutorialHandsKeyboard from './components/LessonTutorialHandsKeyboard';
import TutorialContent from './components/TutorialContent';
import Header from './components/header';
import './style/Tutorial.css'

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

    this.startTutorial(lessonInformation);
  }

  calculateTime = txt => {
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

  startTutorial = (intialContent) => {
    
  };

  componentWillMount = () => {
    this.freezeTimerIfIsLessonInfo();
  }

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



    return (
      <div>
        <Header links={headerLinks}/>
        <div className="container">
          <SpeechBubble text={info} active={isBubbleActive} />
          {isActive && <TutorialContent
            currentContent={content}
            isActive={isActive}
          />}
          <LessonTutorialHandsKeyboard />
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