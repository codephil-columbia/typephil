import React, { Component } from 'react';
import { OrderedMap } from 'immutable';

const BACKSPACE = "Backspace";

const DEFAULT_STYLE = "default-character";
const CORRECT_STYLE = "correct-character";
const INCORRECT_STYLE = "incorrect-character";

class LessonTutorialContent extends Component {
  constructor(props) {
    super(props);

    const groupPtr = 0;
    const { currentContent } = this.props;
    const characterMapList = this.createCharacterMapLists(currentContent);
    const styleMapList = this.createStyleMapLists(currentContent);

    this.state = {
      characterMapList,
      styleMapList,
      groupPtr,
      charPtr: 0
    };
  }

  componentWillMount = () => {
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
    if(this.shouldCheckKey(keyPressed)) {
      this.validateUserKeyPress(keyPressed);
      this.nextCharacter();
    } else if(keyPressed === BACKSPACE) {
    } else {

    }
  }

  validateUserKeyPress = (keyPressed) => {
    let { 
      charPtr, 
      groupPtr, 
      styleMapList, 
      characterMapList 
    } = this.state;

    let characterMapForRow = characterMapList[groupPtr];
    let styleMapForRow = styleMapList[groupPtr];

    const characterWanted = characterMapForRow.get(charPtr);
    if(characterWanted === keyPressed) {
      styleMapForRow = styleMapForRow.set(charPtr, CORRECT_STYLE);
    } else {
      styleMapForRow = styleMapForRow.set(charPtr, INCORRECT_STYLE);
    }
    styleMapList[groupPtr] = styleMapForRow;
    this.setState({ styleMapList })
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
    
    this.setState({ charPtr })
  }

  nextGroup = () => {
    let { characterMapList, groupPtr } = this.state;
    const currentGroupLength = characterMapList.length;
    
    if(groupPtr + 1 >= currentGroupLength) {
      console.log("NEXT");
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
    
    this.setState({ charPtr })
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
    const { currentGroup, } = this.state;
    const { shouldShowContent } = this.props;
    const currentRows = this.buildRows()
    
    
    if(!shouldShowContent) {
      return <div>not active</div>
    }

    return (
      <div className="">
        <div>Hwllo</div>
        {currentRows}
      </div>
    )
  }
}

export default LessonTutorialContent;