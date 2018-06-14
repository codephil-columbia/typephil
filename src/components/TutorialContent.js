import React, { Component } from 'react';
import { OrderedMap } from 'immutable';

import "../style/TutorialContent.css"

const BACKSPACE = "Backspace";
const DEFAULT_STYLE = "default-character";
const CORRECT_STYLE = "correct-character";
const INCORRECT_STYLE = "incorrect-character";
const HIGHLIGHTED = "highlighted";

const CORRECT = "correct";
const INCORRECT = "incorrect";

class LessonTutorialContent extends Component {
  constructor(props) {
    super(props);

    const groupPtr = 0;
    let { currentContent } = this.props;
    currentContent = currentContent.trim();

    const characterMapList = this.createCharacterMapLists(currentContent);
    let styleMapList = this.createStyleMapLists(currentContent);
    styleMapList[0] = styleMapList[0].set(0, 'default-letter highlighted');

    const rows = this.buildRows(characterMapList, styleMapList, 0);

    this.state = {
      rows,
      characterMapList,
      styleMapList,
      groupPtr,
      charPtr: 0,
      correct: [],
      incorrect: [],
      edited: [],
      previousCharCorrectness: false,
      LESSON_LENGTH: characterMapList.length
    };
  }

  componentWillMount = () => {
    document.addEventListener("keydown", this.registerUserKeyPress);
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
    const {indexPtr, groupPtr, LESSON_LENGTH, characterMapList} = this.state;

    return !(indexPtr >= characterMapList.length && groupPtr >= LESSON_LENGTH);
  };

  registerUserKeyPress = ({ key: keyPressed }) => {
    if(keyPressed === BACKSPACE) {
      this.userDidPressBackspace();
      // TODO: Make sure this doesn't fire after group and index ptr have reached the end
    } else if(this.shouldCheckKey(keyPressed) && this.isNotFinished()) {
      this.validateUserKeyPressCorrectness(keyPressed);
    }
  };

  userDidPressBackspace = () => {
    let { charPtr, rows, correct, incorrect, edited, groupPtr } = this.state;
    const { previousCharCorrectness, styleMapList, characterMapList } = this.state;

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

    this.setState({ charPtr, rows, correct, incorrect, edited, groupPtr });
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

      if(charPtr + 1 > currentRowLength - 1 && groupPtr + 1 <= LESSON_LENGTH) {
        newGroupPtr = groupPtr + 1;
        newCharPtr = 0;
      } else {
          newGroupPtr = groupPtr;
          newCharPtr = charPtr + 1;
      }

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
      previousCharCorrectness
    } = this.state;

    let characterMapForRow = characterMapList[groupPtr];
    let styleMapForRow = styleMapList[groupPtr];

    const characterWanted = characterMapForRow.get(charPtr);
    if(characterWanted === keyPressed) {
      styleMapForRow = styleMapForRow.set(charPtr, CORRECT_STYLE);
      previousCharCorrectness = CORRECT;
      correct.push(keyPressed);
    } else {
      styleMapForRow = styleMapForRow.set(charPtr, INCORRECT_STYLE);
      previousCharCorrectness = INCORRECT;
      incorrect.push(keyPressed);
    }

    styleMapList[groupPtr] = styleMapForRow;

    const { newCharPtr, newGroupPtr } = this.nextCharacter();
    const newStyleMapList = this.highlightCharacter(newCharPtr, newGroupPtr);

    rows = this.buildRows(characterMapList, newStyleMapList, newGroupPtr);

    this.setState({ 
      rows, 
      correct, 
      incorrect, 
      previousCharCorrectness, 
      styleMapList: newStyleMapList, 
      charPtr: newCharPtr, 
      groupPtr: newGroupPtr 
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

  shouldCheckKey = key => {
    return !(key === "Meta" || key === "Shift" || key === 'CapsLock' || key === 'Tab')
  };

  breakInto30CharacterLists = (line) => {
    return line.match(/.{1,30}/g);
  };

  render() {
    const { rows } = this.state;
    const { isActive } = this.props;
    
    
    if(!isActive) {
      return <div>not active</div>
    }

    return (
      <div className="">
        <div>start typing!</div>
        {rows}
      </div>
    )
  }
}

export default LessonTutorialContent;