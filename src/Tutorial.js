import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import { 
  moveIndexPtr, 
  unFreeze, 
  freeze, 
  completedTutorial 
} from './actions/tutorial';

import TutorialContent from './TutorialContent';
import Header from './components/header';
import './style/Tutorial.scss'

class Tutorial extends Component {

  constructor(props) {
    super(props);

    const { currentLesson } = this.props
    const { lessonContent, indexPtr } = currentLesson;
    const contentLength = lessonContent.length;

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
    return (txt.length/5) * 60/200 * 1000;
  }

  moveIndexPtr = () => {
    const nextPtr = ++this.state.indexPtr;
    const { contentLength } = this.state;
    console.log(contentLength);
    
    if(nextPtr < contentLength) {
      this.props.moveIndexPtr(nextPtr);
      this.freezeTextIfLessonInfo();
    } else {
      this.props.completedTutorial();
    }
  }

  freezeTextIfLessonInfo = () => {
    const { lessonContent, indexPtr } = this.props.currentLesson;

    if(!lessonContent[indexPtr]) {
      const { lessonInformation } = this.props.currentLesson;
      const time = this.calculateTime(lessonInformation[indexPtr]);
      this.props.freeze();
      setTimeout(() => {
        this.props.unFreeze();
      }, time);
    } else {
      this.props.unFreeze();
    }
  }

  render() {
    const { headerLinks } = this.state;
    const { shouldFreeze, tutorialFinished } = this.props;
    const { indexPtr, lessonInformation, lessonContent } = this.props.currentLesson;

    const next = this.moveIndexPtr;
    const userPressedKey = this.onUserPressedKey;

    const currentLessonContent = lessonContent[indexPtr];
    const currentInfoText = lessonInformation[indexPtr];

    let content;

    if(tutorialFinished) {
      return <Redirect to="/home" />
    }
    
    if(currentLessonContent) {
      content = <TutorialContent info={currentInfoText} content={currentLessonContent} next={next} onUserPressedKey={userPressedKey} />
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

const keyboard = () => {
  return (
    <div>
      <img src="images/universal/Keyboard_right_hand.eps" alt="keyboard-right" className="logo"></img>
    </div>
  )
}

const leftHand = () => {

}

const rightHand = () => {

}

const mapDispatchToProps = dispatch => {
  return bindActionCreators (
    { moveIndexPtr, unFreeze, freeze, completedTutorial }, 
    dispatch
  )
}

const mapStateToProps = ({ app }) => ({
  currentLesson: app.currentLesson,
  shouldFreeze: app.shouldFreeze,
  tutorialFinished: app.tutorialFinished
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);