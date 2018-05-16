import React, { Component } from 'react'
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { 
  userPressedKey, 
  validatePressedKey, 
  startLesson,
  stopLesson
} from './actions/tutorialContent';

import './style/TutorialContent.css';

const BACKSPACE = "Backspace";
const DEFAULT = "default-letter";
const CORRECT = "correct-letter";
const INCORRECT = "incorrect-letter";

class TutorialContent extends Component {
  constructor(props) {
    super(props);

    const { content } = this.props;
    const lines = this.createLines(content);
    const totalLineLength = lines.length;
    const linePtr = 0;
    const currentLine = lines[linePtr];
    const nextLine = totalLineLength === 1 ? null : lines[linePtr+1];
    const prevLine = null;

    this.state = {
      edited: [],
      correct: [],
      incorrect: [],
      missed: false,
      incorrectCharCount: 0,
      charPtr: 0,
      groupPtr: 0,
      linePtr,
      hasPressedFirstChar: false,
      lines,
      totalLineLength,
      currentLine,
      nextLine,
      prevLine
    }
  }

  componentWillMount = () => {
    document.addEventListener("keydown", this.validateKeyPressed);
  }

  createLines = content => {
    let contentGroup = content.split("\n");
    contentGroup = contentGroup.map(str => str.trim());
    let letterGroups = contentGroup.map((str, i) =>  {
      let x = str.split("").map((char, j) => <span>{char}</span>);
      return <div>{x}</div>;
    });

    return [...letterGroups]
  }

  // createNewLine = content => {
  //   let letterGroups = content.map
  // }

  _getChildrenValue = element => {
    return element.props.children;
  }

  colorKey = (charPtr, wasCorrect, wasBackspace) => {
    let { lines, linePtr, currentLine } = this.state;
    let domColoredLetter;
    let className; 
    let newLine;

    const charactersInCurrentLine = this._getChildrenValue(currentLine);
    const currentKey = this._getChildrenValue(charactersInCurrentLine[charPtr]);

    if(wasBackspace) {
      className = DEFAULT;
    } else {
      className = wasCorrect ? CORRECT : INCORRECT;
    }

    domColoredLetter = <span className={className}>{currentKey}</span>;
    charactersInCurrentLine[charPtr] = domColoredLetter;

    newLine = <div>{charactersInCurrentLine}</div>;
    lines[linePtr] = newLine;

    this.setState({currentLine: newLine, lines});
  }

  shouldCheckKey = key => {
    if(key === "Meta" || key === "Shift" || 
      key === 'CapsLock' || key === 'Tab') {
      return false;
    }
    return true;
  }
 
  validateKeyPressed = ({ key: keyPressed }) => {
    let { charPtr, linePtr, lines, totalLineLength, 
      nextLine, edited, correct, incorrect, missed, prevLine } = this.state;

    let currentLine = lines[linePtr];
    const currentLineLength = this._getChildrenValue(currentLine).length;
    const currentChar = currentLine.props.children[charPtr].props.children;

    //if key was nonimportant whitespace, check its value
    if(this.shouldCheckKey(keyPressed)) {
      if (keyPressed === currentChar) {
        this.colorKey(charPtr, true, false);
        charPtr++;
        console.log(charPtr, currentLineLength - 1);
        if(charPtr > currentLineLength - 1) {
          linePtr++;
          if(linePtr > totalLineLength - 1) {
            console.log("FINISHED");
          } else {
            prevLine = currentLine;
            currentLine = nextLine;
            nextLine = linePtr > totalLineLength - 1 ? null : lines[linePtr+1];
            this.setState({ linePtr, charPtr: 0, currentLine, nextLine, missed: false, prevLine });
          }
        } else {
          this.setState({ charPtr, missed: false });
        }
      } else if(keyPressed === BACKSPACE) {
        // Have to move characters into edited list
        let prevKey;
        let prevObj;
        if(missed) {
          prevObj = incorrect.pop();
          prevKey = prevObj.got;
          incorrect.push(prevObj);
        } else {
          prevKey = correct.pop();
        }
        edited.push(prevKey);

        // Go to prev line if there was one
        if(charPtr === 0) {
          if(linePtr !== 0 && totalLineLength > 1) {
            linePtr--;
            charPtr = this._getChildrenValue(lines[linePtr]).length - 1;
            const lineBeforePrev = lines[linePtr-1]
            this.setState({ linePtr, charPtr, currentLine:prevLine, nextLine:currentLine, prevLine:lineBeforePrev});
            this.colorKey(charPtr, null, true);
          }
        } else {
          charPtr = (0 > charPtr-1) ? charPtr = 0 : charPtr = charPtr-1;
          this.colorKey(charPtr, null, true);
          this.setState({ charPtr });
        }
      } else {
        incorrect.push({got: keyPressed, expected: currentChar});
        this.colorKey(charPtr, false, false);

        ++charPtr;
        if(charPtr > currentLineLength - 1) {
          console.log(charPtr, "is too big addingone");
          linePtr++;
          if(linePtr > totalLineLength - 1) {
            console.log("FINISHED");
          } else {
            prevLine = currentLine;
            currentLine = nextLine;
            nextLine = linePtr > totalLineLength - 1 ? null : lines[linePtr+1];
            this.setState({ linePtr, charPtr: 0, currentLine, nextLine, missed: false, prevLine });
          }
        } else {
          this.setState({ charPtr, missed:true });
        }
      }
    }
  }

  render() {
    const { lines, totalLineLength, currentLine, nextLine } = this.state;
    let { charPtr, linePtr } = this.state;
    
    const toShow = [currentLine, nextLine];

    return (toShow.map((line, i) => {
      return <div className="row content">{line}</div>
    }))
  }

}

const speechBubble = text => {
  return (
    <svg width="1113px" height="95px" viewBox="0 0 1113 95" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>Speech Bubble </title>
      <desc>Created with Sketch.</desc>
      <defs></defs>
      <g id="Tutorial-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(-164.000000, -219.000000)" opacity="0.5">
        <g id="Speech-bubble" transform="translate(164.000000, 219.000000)" fill="#B5DCCD">
            <g id="Speech-Bubble-">
              <rect id="Rectangle-12" x="0" y="0" width="1113" height="76.369863" rx="10"></rect>
              <polygon id="Triangle-2" transform="translate(22.500000, 85.136986) scale(1, -1) translate(-22.500000, -85.136986) " points="7 75.2739726 38 95 15.1482349 95"></polygon>
              <rect width="996" height="41"/>
              <text id="myText" font-size="15" font-family="arial" fill="black">
                <tspan x="" y="20">{text}</tspan>
              </text>
            </g>
        </g>
      </g>
    </svg>
  )
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