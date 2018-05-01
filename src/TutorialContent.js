import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { 
  userPressedKey, 
  validatePressedKey, 
  startLesson,
  stopLesson
} from './actions/tutorialContent';

import './style/TutorialContent.css';

class TutorialContent extends Component {
  constructor(props) {
    super(props);

    const { content } = this.props;
    const ptr = 0;

    this.state = {
      incorrectCharCount: 0,
      currentChar: content[ptr],
      ptr,
      hasPressedFirstChar: false,
      spans: this.createSpans(content)
    }
  }

  componentWillMount = () => {
    document.addEventListener("keydown", this.onKeyPress);
  }

  createSpans = content => {
    const spans = [...content].map((letter, i) => {
      return <span key={i}>{letter}</span>
    })
    return spans;
  }

  colorKey = ptr => {
    let { spans } = this.state;
    const { charPtr, content, missedChar } = this.props;

    spans[ptr] = <span key={ptr} className={missedChar ? "incorrect-letter" : "correct-letter"}>{content[charPtr-1]}</span>

    console.log(charPtr, spans[ptr], content[ptr])
    this.setState({spans: [...spans]});
  }
 
  onKeyPress = event => {
    const { key } = event;
    let { charPtr } = this.props;

    if(this.props.isFirstChar) {
      this.props.startLesson();
    }

    this.props.userPressedKey(key);
    if(this.props.pressedKey) {
      this.props.validatePressedKey(key);
      this.colorKey(charPtr);
    }

    if(charPtr >= this.props.content.length) {
      this.props.stopLesson();
      this.props.next();
    }

  }

  render() {
    const { info } = this.props;
    let { spans } = this.state;

    return (
      <div>
        <p>{info}</p>
        {spans}
        <p>other stuff</p>
      </div> 
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ userPressedKey, validatePressedKey, startLesson, stopLesson }, dispatch);
}

const mapStateToProps = ({ app }) => ({
  pressedKey: app.currentLessonSession.pressedKey,
  shouldValidate: app.currentLessonSession.shouldValidate,
  isFirstChar: app.currentLessonSession.isFirstChar,
  charPtr: app.currentLessonSession.charPtr,
  missedChar: app.currentLessonSession.missedChar
})

export default connect(mapStateToProps, mapDispatchToProps)(TutorialContent);