import { OrderedMap } from 'immutable';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';

import LessonTutorialHandsKeyboard from './TutorialHandsKeyboard';
import TutorialStats from './TutorialStats';

import { postTutorialResults } from '../actions/tutorial';

import "../style/TutorialContent.css"

const BACKSPACE = "Backspace";
const DEFAULT_STYLE = "default-character character";
const CORRECT_STYLE = "correct-character character";
const INCORRECT_STYLE = "incorrect-character character";
const HIGHLIGHTED = "highlighted character";

const CORRECT = "correct";
const INCORRECT = "incorrect";

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

class LessonTutorialContent extends Component {
  constructor(props) {
    super(props);

    const groupPtr = 0;
    let { currentContent } = this.props;
    currentContent = currentContent.trim();

    const characterMapList = this.createCharacterMapLists(currentContent);
    let styleMapList = this.createStyleMapLists(currentContent);
    styleMapList[0] = styleMapList[0].set(0, 'default-letter highlighted');

    const currentKey = characterMapList[0].get(0);

    const rows = this.buildRows(characterMapList, styleMapList, 0);

    const totalLength = currentContent.length;

    this.state = {
      rows,
      characterMapList,
      styleMapList,
      groupPtr,
      currentKey,
      totalLength,
      charPtr: 0,
      correct: [],
      incorrect: [],
      edited: [],
      previousCharCorrectness: false,
      LESSON_LENGTH: characterMapList.length,
      consecutiveIncorrectCount: 0,
      shouldShowModal: false,
      isFirstCharacter: true,
      hasPostedResults: false,
      isFinished: false,
      startTime: 0,
      finishTime: 0,
      pauses: [],
      time: 0
    };
  }

  componentWillMount = () => {
    this.attachEventListener();
  };

  createCharacterMapLists = (chars) => {
    chars = this.breakInto30CharacterLists(chars);
    let characterMaps = [];
    chars.forEach(([...ch], i) => {
      characterMaps.push(OrderedMap(ch.map((c, i) => [i, c])))
    });
    return characterMaps;
  };

  createStyleMapLists = (chars) => {
    chars = this.breakInto30CharacterLists(chars);
    let styleMaps = [];
    chars.forEach(([...ch], i) => {
      styleMaps.push(OrderedMap(ch.map((c, i) => [i, DEFAULT_STYLE])))
    });
    return styleMaps;
  };

  isNotFinished = () => {
    const { indexPtr, groupPtr, LESSON_LENGTH, characterMapList } = this.state;
    return !(indexPtr >= characterMapList.length && groupPtr >= LESSON_LENGTH);
  };

  registerUserKeyPress = ({ key: keyPressed }) => {
    // Starts timer once user presses first key
    if(this.state.isFirstCharacter) {
      this.setState({ startTime: Date.now(), isFirstCharacter: false });
    }

    if(keyPressed === BACKSPACE) {
      this.userDidPressBackspace();
      // TODO: Make sure this doesn't fire after group and index ptr have reached the end
    } else if(this.shouldCheckKey(keyPressed) && this.isNotFinished()) {
      this.validateUserKeyPressCorrectness(keyPressed);
    }
  };

  userDidPressBackspace = () => {
    let { charPtr, rows, correct, incorrect, edited, groupPtr, characterMapList, consecutiveIncorrectCount } = this.state;
    const { previousCharCorrectness, styleMapList } = this.state;

    // Set current indexPtr style to default
    this.applyStyle(`${DEFAULT_STYLE}`, charPtr, groupPtr);
    
    if(charPtr - 1 >= 0) {
      charPtr -= 1;
      //highlight the previous character
      this.applyStyle(`${DEFAULT_STYLE} ${HIGHLIGHTED}`, charPtr, groupPtr);
      rows = this.buildRows(characterMapList, styleMapList, groupPtr);
    } else {
      if(groupPtr !== 0) {
        groupPtr -= 1;
        charPtr = styleMapList[groupPtr].size - 1;
        this.applyStyle(`${DEFAULT_STYLE} ${HIGHLIGHTED}`, charPtr, groupPtr);
        rows = this.buildRows(characterMapList, styleMapList, groupPtr);
      }
    }
    //we also want to pop previous result and add it to edited keys group
    if(previousCharCorrectness === CORRECT) {
      const prevChar = correct.pop();
      edited.push(prevChar);
    } else {
      const prevChar = incorrect.pop();
      edited.push(prevChar);
    } 

    const newCurrentKey = characterMapList[groupPtr].get(charPtr);
    
    if(consecutiveIncorrectCount - 1 >= 0) {
      consecutiveIncorrectCount -= 1;
    }

    this.setState({ consecutiveIncorrectCount, charPtr, rows, correct, incorrect, edited, groupPtr, currentKey: newCurrentKey });
  };

  applyStyle = (newStyle, forIndex, forGroup) => {
    let { styleMapList } = this.state;

    let styleMap = styleMapList[forGroup];
    styleMap = styleMap.set(forIndex, newStyle);
    
    styleMapList[forGroup] = styleMap;
    this.setState({ styleMapList });
  };

  nextCharacter = () => {
      let { charPtr, characterMapList, groupPtr, LESSON_LENGTH } = this.state;
      let newCharPtr, newGroupPtr;
      const characterMap = characterMapList[groupPtr];
      const currentRowLength = characterMap.size;

      if(charPtr + 1 >= currentRowLength) {
        if(groupPtr + 1 < LESSON_LENGTH) {
          newCharPtr = 0;
          newGroupPtr = groupPtr + 1;
        } else {
          this.setState({ isFinished: true,  finishTime: Date.now() });
          newGroupPtr = groupPtr;
        }
      } else {
          newGroupPtr = groupPtr;
          newCharPtr = charPtr + 1;
      }
      
      // Apply highlight key
      return { newCharPtr, newGroupPtr };
  };

  validateUserKeyPressCorrectness = (keyPressed) => {
    let { 
      charPtr, 
      groupPtr, 
      styleMapList, 
      characterMapList,
      rows,
      correct,
      incorrect,
      previousCharCorrectness,
      consecutiveIncorrectCount,
      shouldShowModal
    } = this.state;

    let characterMapForRow = characterMapList[groupPtr];
    let styleMapForRow = styleMapList[groupPtr];

    const characterWanted = characterMapForRow.get(charPtr);
    if(characterWanted === keyPressed) {
      consecutiveIncorrectCount = 0;
      styleMapForRow = styleMapForRow.set(charPtr, CORRECT_STYLE);
      previousCharCorrectness = CORRECT;
      correct.push(keyPressed);
    } else {
      consecutiveIncorrectCount += 1;
      styleMapForRow = styleMapForRow.set(charPtr, INCORRECT_STYLE);
      previousCharCorrectness = INCORRECT;
      incorrect.push(keyPressed);
    }

    styleMapList[groupPtr] = styleMapForRow;

    const { newCharPtr, newGroupPtr } = this.nextCharacter();
    const newStyleMapList = this.highlightCharacter(newCharPtr, newGroupPtr);
    const newCurrentKey = characterMapList[newGroupPtr].get(newCharPtr);

    rows = this.buildRows(characterMapList, newStyleMapList, newGroupPtr);

    shouldShowModal = consecutiveIncorrectCount > 4;

    this.setState({ 
      rows, 
      correct, 
      incorrect, 
      previousCharCorrectness, 
      styleMapList: newStyleMapList, 
      charPtr: newCharPtr, 
      groupPtr: newGroupPtr,
      currentKey: newCurrentKey,
      consecutiveIncorrectCount,
      shouldShowModal
    });
  };

  /*
    Builds rows of characters for Tutorial's current indexPtr. 
    NOTE: If the amount of characters in Tutorial's current indexPtr > 30, 
          then we will group them into chunks of 30 character rows 
  */
  buildRows = (characterMapList, styleMapList, groupPtr) => {
    let row = [];
    let rows = [];

    let groupIterator = [groupPtr];
    // We always include 2 rows if possible, if not just show one
    if(groupPtr + 1 <= characterMapList.length - 1) {
      groupIterator.push(groupPtr+1);
    }
    
    groupIterator.forEach((i) => {
      const styleMapListForRow = styleMapList[i];
      const characterMapListForRow = characterMapList[i];
      characterMapListForRow.mapKeys((index) => {
        const char = characterMapListForRow.get(index);
        const style = styleMapListForRow.get(index);
        row.push(<span className={style}>{char}</span>);
      });
      rows.push(row);
      row = [];
    });

    rows = rows.map(row => <div className="words">{[...row]}</div>);
    return rows;
  };

  highlightCharacter = (index, groupPtr) => {
    let { styleMapList } = this.state;
    let styleListForCurrentRow = styleMapList[groupPtr];
    const currentStyle = styleListForCurrentRow.get(index);

    styleListForCurrentRow = styleListForCurrentRow.set(index, `${currentStyle} highlighted`);
    styleMapList[groupPtr] = styleListForCurrentRow;

    return styleMapList;
  };

  shouldCheckKey = (key) => {
    return !(key === "Meta" || key === "Shift" || key === 'CapsLock' || key === 'Tab')
  };

  breakInto30CharacterLists = (line) => {
    return line.match(/.{1,20}/g);
  };

  closeModal = () => {
    this.attachEventListener();
    this.setState({ shouldShowModal: false });
  };

  onModalOpen = () => {
    this.removeEventListener();
    let { pauses } = this.state;
    pauses.push(Date.now());
    this.setState({ pauses })
  }

  removeEventListener = () => {
    document.removeEventListener("keydown", this.registerUserKeyPress);
  }

  attachEventListener = () => {
    document.addEventListener("keydown", this.registerUserKeyPress);
  }

  /**
   * Calculates time taken to complete tutorial in seconds. Takes into account the 
   * time taken during pauses due to too many consecutive incorrect characters being 
   * typed.
   */
  calculateTutorialTime = () => {
    let time = this.state.finishTime - this.state.startTime;
    return this.state.pauses.reduce((accum, currVal) => currVal - accum, time) / 1000;
  }

  render() {
    const { isFinished } = this.state;

    if(isFinished) {
      this.removeEventListener();
      this.props.updateResults({
        time: this.calculateTutorialTime(),
        length: this.state.totalLength,
        incorrect: this.state.incorrect.length
      })
      this.props.showStats();
    }

    const { rows } = this.state;
    let { currentKey } = this.state;

    currentKey = (currentKey === " ") ? "spacebar" : currentKey;

    return (
      <div class="content-wrapper">
        <Modal 
          isOpen={this.state.shouldShowModal}
          onAfterOpen={this.onModalOpen}
          className="tutorial-modal"
        >
          <p className="modal-text">You missed more than <strong>5 keys</strong> in a row!</p>
          <p className="modal-text">Please go back and correct the mistyped keys!</p>
          <button onClick={this.closeModal} className="button-primary solid modal-button" type="submit" value="CLOSE">CLOSE</button>
        </Modal>
        {rows}
        <LessonTutorialHandsKeyboard currentKey={currentKey}/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ postTutorialResults }, dispatch)
}

const mapStateToProps = ({ app }) => ({
  chapterID: app.currentLesson.chapterID,
  lessonID: app.currentLesson.lessonID
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonTutorialContent);