import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { moveIndexPtr, startTutorial, unFreeze, freeze, lessonCompleted } from './actions/lesson';

import Header from './components/header';
import './style/Tutorial.scss'
import { Redirect } from 'react-router';

import HomePage from './HomePage';

class Tutorial extends Component {

  constructor(props) {
    super(props);

    const { currentLesson } = this.props
    const { lessonContent, indexPtr } = currentLesson;

    const contentLength = lessonContent.length;

    console.log(lessonContent[indexPtr])

    this.state = {
      headerLinks: ["Learn", "Progress", "Home"],
      contentLength,
      indexPtr,
    }
  }

  componentWillMount = () => {
    this.freezeTextIfLessonInfo();
  }

  calculateTime = txt => {
    console.log((txt.length/5) * 60/200);
    return (txt.length/5) * 60/200
  }

  moveIndexPtr = () => {
    const nextPtr = ++this.state.indexPtr;
    const { contentLength } = this.state;
    
    if(nextPtr < contentLength) {
      this.props.moveIndexPtr(nextPtr);
      this.freezeTextIfLessonInfo();
    } else {
      this.props.lessonCompleted();
    }
  }

  freezeTextIfLessonInfo = () => {
    const { lessonContent, indexPtr } = this.props.currentLesson;

    if(!lessonContent[indexPtr]) {
      const { lessonInformation } = this.props.currentLesson;
      const time = this.calculateTime(lessonInformation[indexPtr]) * 1000;
      this.props.freeze();
      setTimeout(() => {
        console.log('setting time out')
        this.props.unFreeze();
      }, time);
    } else {
      this.props.unFreeze();
    }
  }

  startTutorial = () => {
    return this.props.startTutorial();
  }

  render() {
    const { headerLinks } = this.state;
    const { shouldFreeze, tutorialFinished } = this.props;
    const { indexPtr, lessonInformation, lessonContent } = this.props.currentLesson;

    const next = this.moveIndexPtr;

    const currentLessonContent = lessonContent[indexPtr];
    const currentInfoText = lessonInformation[indexPtr];

    let content;

    if(tutorialFinished) {
      return <Redirect to="/home" />
    }
    
    if(currentLessonContent) {
      // content = tutorialContentText(currentInfoText, currentLessonContent);
      content = <TutorialContent info={currentInfoText} content={currentLessonContent} />
    } else if(!currentLessonContent) {
      content = tutorialInformationText(currentInfoText);
    }

    return (
      <div>
        <Header links={headerLinks}/>
        <div className="container tutorial">
          <div className="row tutorial-content">
            {content}
          </div>
          <div className="row tutorial-keyboard">
            {keyboard()}
          </div>
          <button onClick={next} disabled={shouldFreeze}>Next</button>
        </div>
      </div>
    )
  }
}

const tutorialInformationText = text => {
  return (
    <div className="">
      <p className="info-text">{text}</p>
    </div>
  )
}

class TutorialContent extends Component {
  constructor(props) {
    super(props);

    const { content } = this.props;
    const ptr = 0;

    this.state = {
      incorrectCharCount: 0,
      currentChar: content[ptr],
      ptr
    }
  }

  componentWillMount = () => {
    document.addEventListener("keydown", this.onKeyPress)
  }

  onKeyPress = event => {
    const keyPressed = String.fromCharCode(event.keyCode);
    console.log(keyPressed);
  }

  render() {
    const { info, content } = this.props;
    return (
      <div>
        <p>{info}</p>
        <p>{content}</p>
      </div>
    )
  }
}

const keyboard = () => {
  return (
    <div>
      <img src="images/universal/Keyboard_right_hand.eps" className="logo"></img>
    </div>
  )
}

const leftHand = () => {

}

const rightHand = () => {

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ moveIndexPtr, startTutorial, unFreeze, freeze, lessonCompleted }, dispatch);
}

const mapStateToProps = ({ app }) => ({
  currentLesson: app.currentLesson,
  shouldFreeze: app.shouldFreeze,
  tutorialFinished: app.tutorialFinished
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);