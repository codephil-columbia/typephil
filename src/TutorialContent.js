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

    this.highlightFirstCharInLine(linePtr, currentLine, lines);

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
      let x = str.split("").map((char, j) => <span key={j}>{char}</span>);
      return <div className="words">{x}</div>;
    });

    return [...letterGroups]
  }

  _getChildrenValue = element => {
    return element.props.children;
  }

  highlightFirstCharInLine = (linePtr, currentLine, lines) => {
    const charactersInCurrentLine = this._getChildrenValue(currentLine);
    const currentKey = this._getChildrenValue(charactersInCurrentLine[0]);
    const highlightedKey = <span className="highlighted">{currentKey}</span>
    charactersInCurrentLine[0] = highlightedKey;
    let newLine = <div className="words">{charactersInCurrentLine}</div>
    lines[linePtr] = newLine;
    this.setState({currentLine:newLine, lines});
  }

  colorKey = (charPtr, wasCorrect, wasBackspace) => {
    let { lines, linePtr, currentLine } = this.state;
    const currentLineLength = this._getChildrenValue(currentLine).length;
    let domColoredLetter;
    let className; 
    let newLine;

    const charactersInCurrentLine = this._getChildrenValue(currentLine);
    const currentKey = this._getChildrenValue(charactersInCurrentLine[charPtr]);
    let nextKey;

    if(wasBackspace) {
      className = DEFAULT;
    } else {
      className = wasCorrect ? CORRECT : INCORRECT;
    }


    domColoredLetter = <span className={className}>{currentKey}</span>;
    charactersInCurrentLine[charPtr] = domColoredLetter;
    
    charactersInCurrentLine[charPtr] = domColoredLetter;
    // if(!(charPtr+1 > currentLineLength - 1)) {
    //   nextKey = this._getChildrenValue(charactersInCurrentLine[charPtr+1]);
    //   const nextHighlightedKey = <span className="highlighted">{nextKey}</span>
    //   charactersInCurrentLine[charPtr+1] = nextHighlightedKey;
    // }

    domColoredLetter = <span className={className}>{currentKey}</span>
    charactersInCurrentLine[charPtr] = domColoredLetter;
    newLine = <div className="words">{charactersInCurrentLine}</div>;
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

  applyClass = (charPtr, className) => {
    let { lines, currentLine, linePtr } = this.state;
    let charactersInCurrentLine = this._getChildrenValue(currentLine);
    let currentKey = this._getChildrenValue(charactersInCurrentLine[charPtr]);

    const newDOM = <span className={className}>{currentKey}</span>
    charactersInCurrentLine[charPtr] = newDOM;
    const newLine = <div className="words">{charactersInCurrentLine}</div>
    lines[linePtr] = newLine;

    this.setState({currentLine: newLine, lines});
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
        if(!(charPtr+1 > currentLineLength-1)) 
          this.applyClass(charPtr+1, "highlighted");
        charPtr++;
        if(charPtr > currentLineLength - 1) {
          linePtr++;
          if(linePtr > totalLineLength - 1) {
            console.log("FINISHED");
          } else {
            this.highlightFirstCharInLine(linePtr, nextLine, lines);
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
            this.applyClass(charPtr, "default-letter");
            charPtr = this._getChildrenValue(lines[linePtr]).length - 1;
            const lineBeforePrev = lines[linePtr-1]
            this.setState({ linePtr, charPtr, currentLine:prevLine, nextLine:currentLine, prevLine:lineBeforePrev});
            this.colorKey(charPtr, null, true);
            this.applyClass(charPtr, "highlighted");
          }
        } else {
          console.log(charPtr);
          this.applyClass(charPtr, "default-letter");
          charPtr = (0 > charPtr-1) ? charPtr = 0 : charPtr = charPtr-1;
          console.log(charPtr);
          this.colorKey(charPtr, null, true);
          this.applyClass(charPtr, "highlighted");
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
            this.highlightFirstCharInLine(linePtr, nextLine, lines);
            prevLine = currentLine;
            currentLine = nextLine;
            nextLine = linePtr > totalLineLength - 1 ? null : lines[linePtr+1];
            this.setState({ linePtr, charPtr: 0, currentLine, nextLine, missed: false, prevLine });
          }
        } else {
          this.applyClass(charPtr, "highlighted");
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