import React, { Component } from 'react';
import { OrderedMap } from 'immutable';

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
    const { currentContent } = this.props;

    const characterMapList = this.createCharacterMapLists(currentContent);
    let styleMapList = this.createStyleMapLists(currentContent);
    styleMapList[0] = styleMapList[0].set(0, 'default-letter highlighted');
    const rows = this.buildRows(characterMapList, styleMapList);

    this.state = {
      rows,
      characterMapList,
      styleMapList,
      groupPtr,
      charPtr: 0,
      correct: [],
      incorrect: [],
      edited: [],
      previousCharCorrectness: false
    };
  }

  componentWillMount = () => {
    console.log("HERE")
    document.addEventListener("keydown", this.registerUserKeyPress);
  }

  createCharacterMapLists = (chars) => {
    chars = this.breakInto30CharacterLists(chars);
    let characterMaps = []
    chars.forEach(([...ch], i) => {
      characterMaps.push(OrderedMap(ch.map((c, i) => [i, c])))
    })
    return characterMaps;
  }

  createStyleMapLists = (chars) => {
    chars = this.breakInto30CharacterLists(chars);
    let styleMaps = []
    chars.forEach(([...ch], i) => {
      styleMaps.push(OrderedMap(ch.map((c, i) => [i, DEFAULT_STYLE])))
    })
    return styleMaps;
  }

  registerUserKeyPress = ({ key: keyPressed }) => {
    if(keyPressed === BACKSPACE) {
      this.userDidPressBackspace();
    } else if(this.shouldCheckKey(keyPressed)) {
      this.validateUserKeyPressCorrectness(keyPressed);
    } else {

    }
  }

  userDidPressBackspace = () => {
    let { charPtr, rows, correct, incorrect, edited } = this.state;
    const { previousCharCorrectness } = this.state;
    
    if(!charPtr - 1 < 0) {
      // Set current indexPtr style to default
      this.applyStyle(`${DEFAULT_STYLE}`, charPtr);
      charPtr -= 1;
      //highlight the previous character
      this.applyStyle(`${DEFAULT_STYLE} ${HIGHLIGHTED}`, charPtr);

      //we also want to pop previous result and add it to edited keys group
      if(previousCharCorrectness === CORRECT) {
        const prevChar = correct.pop();
        edited.push(prevChar);
      } else {
        const prevChar = incorrect.pop();
        edited.push(prevChar);

      }

      rows = this.buildRows();
      this.setState({ charPtr, rows, correct, incorrect, edited });
    }
  }


  applyStyle = (newStyle, forIndex=this.state.charPtr) => {
    const { groupPtr } = this.state;
    let { styleMapList } = this.state;

    let styleMap = styleMapList[groupPtr];
    styleMap = styleMap.set(forIndex, newStyle);
    
    styleMapList[groupPtr] = styleMap;
    this.setState({ styleMapList });
  }

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
    this.nextCharacter();

    rows = this.buildRows(characterMapList, styleMapList);
    this.setState({ styleMapList, rows, correct, incorrect, previousCharCorrectness });

  }

  /*
    Builds rows of characters for Tutorial's current indexPtr. 
    NOTE: If the amount of characters in Tutorial's current indexPtr > 30, 
          then we will group them into chunks of 30 character rows 
  */
  buildRows = (
    characterMapList=this.state.characterMapList, 
    styleMapList=this.state.styleMapList
  ) => {
    let row = [];
    let rows = [];
    [...Array(characterMapList.length)].forEach((_, i) => {
      const styleMapListForRow = styleMapList[i];
      const characterMapListForRow = characterMapList[i];
      characterMapListForRow.mapKeys((index) => {
        const char = characterMapListForRow.get(index);
        const style = styleMapListForRow.get(index);
        row.push(<span className={style}>{char}</span>);
      })
      rows.push(row);
      row = [];
    })

    rows = rows.map(row => <div>{[...row]}</div>);
    return rows;
  }

  nextCharacter = () => {
    let { charPtr, characterMapList, groupPtr } = this.state;
    const characterMap = characterMapList[groupPtr];
    const currentRowLength = characterMap.size;
    
    if(charPtr + 1 >= currentRowLength) {
      this.nextGroup();
      charPtr = 0;
    } else {
      charPtr += 1;
    }
    let styleMapList = this.highlightCharacter(charPtr);
    console.log(styleMapList)
    this.setState({ charPtr, styleMapList });
  }

  nextGroup = () => {
    let { characterMapList, groupPtr } = this.state;
    const currentGroupLength = characterMapList.length;
    
    if(groupPtr + 1 >= currentGroupLength) {
      groupPtr = 0;
    } else {
      groupPtr += 1;
    }

    this.setState({ groupPtr });
  }

  prevCharacter = () => {
    let { charPtr, characterMapList, groupPtr } = this.state;
    const characterMap = characterMapList[groupPtr];
    const currentRowLength = characterMap.size;
    
    if(charPtr - 1 < 0) {
      this.prevGroup();
      charPtr = 0;
    } else {
      charPtr -= 1;
    }
    let styleMapList = this.highlightCharacter(charPtr);
    this.setState({ charPtr, styleMapList });
  }

  prevGroup = () => {
    let { groupPtr } = this.state;
    
    if(groupPtr - 1 < 0) {
      console.log("Prev");
      groupPtr = 0;
    } else {
      groupPtr -= 1;
    }

    this.setState({ groupPtr });
  }

  highlightCharacter = (index) => {
    let { styleMapList, groupPtr } = this.state;
    let styleListForCurrentRow = styleMapList[groupPtr];
    const currentStyle = styleListForCurrentRow.get(index);
    styleListForCurrentRow = styleListForCurrentRow
      .set(index, `${currentStyle} highlighted`);
    styleMapList[groupPtr] = styleListForCurrentRow;
    return styleMapList;
  }

  shouldCheckKey = key => {
    if(key === "Meta" || key === "Shift" || 
      key === 'CapsLock' || key === 'Tab') {
      return false;
    }
    return true;
  }

  breakInto30CharacterLists = (line) => {
    return line.match(/.{1,30}/g);
  }

  render() {
    const { rows } = this.state;
    const { isActive } = this.props;
    
    
    if(!isActive) {
      return <div>not active</div>
    }

    return (
      <div className="">
        <div>Hwllo</div>
        {rows}
      </div>
    )
  }
}

export default LessonTutorialContent;