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

import TutorialContent from './TutorialContent';
import LessonTutorialButtons from './components/LessonTutorialButtons';
import SpeechBubble from './components/SpeechBubble';
import LessonTutorialHandsKeyboard from './components/LessonTutorialHandsKeyboard';
import LessonTutorialContent from './components/LessonTutorialContent';
import Header from './components/header';
import './style/Tutorial.css'

class Tutorial extends Component {

  constructor(props) {
    super(props);

    // this.props.fetchCurrentLessonIfNeeded('bbu9uqje8cdm8j5109ug');

    const { currentLesson } = this.props
    console.log(this.props);
    const { 
      lessonContent,
      lessonInformation
    } = currentLesson;

    const contentLength = lessonContent.length;
    const infoLength = lessonInformation.length;

    this.state = {
      contentLength,
      infoLength,
      lessonContent,
      lessonInformation,
      indexPtr: 0,
      isFinished: false,

      headerLinks: ["Learn", "Progress", "Home"],
    }
  }

  calculateTime = txt => {
    return (txt.length/5) * 60/200 * 1000;
  }

  next = () => {
    let { indexPtr, contentLength } = this.state;
    if(indexPtr + 1 < contentLength) {
      indexPtr += 1;
    }
    this.setState({ indexPtr });
  }

  prev = () => {
    let { indexPtr } = this.state;
    if(indexPtr - 1 < 0) {
      indexPtr = 0;
    } else {
      indexPtr -= 1;
    }

    this.setState({ indexPtr });
  }

  getNextPair = () => {
    const {
      indexPtr,
      lessonContent, 
      lessonInformation,
    } = this.state;

    return { 
      content: lessonContent[indexPtr],
      nextContent: lessonContent[indexPtr+1],
      info: lessonInformation[indexPtr]
    }
  }

  render() { 
    const { headerLinks, lessonContent, lessonInformation, indexPtr } = this.state;
    const { content, nextContent, info } = this.getNextPair()
    let isActive = true;
    let isBubbleActive = false;

    console.log(content, nextContent, indexPtr)

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
          <LessonTutorialContent
            currentContent={content}
            nextContent={nextContent}
            isActive={isActive}
          />
          <LessonTutorialHandsKeyboard />
          <LessonTutorialButtons 
            next={this.next} 
            prev={this.prev} 
            isNextActive={!isActive}
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
