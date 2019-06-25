import { OrderedMap } from 'immutable';
import React, { Component } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components'

import Counter from './ExamCounterPage'

import "./style/Exam.css"

const BACKSPACE = "Backspace";
const DEFAULT_STYLE = "default-character character";
const CORRECT_STYLE = "correct-character character";
const INCORRECT_STYLE = "incorrect-character character";
const INCORRECT_SPACE_STYLE = "incorrect-space-character character";
const HIGHLIGHTED = "highlighted character";

const CORRECT = "correct";
const INCORRECT = "incorrect";

const ExamParagraphText = styled.div`
  display:flex; 
  flex-direction:row; 
  text-align:center;
  align-content:center;
  justify-content: center;
  font-size:3.5rem;
  width:100vw;

  @media only screen and (max-width: 1100px) {
    font-size:3.5rem;
  }

  @media only screen and (max-width: 1000px) {
    font-size:3.2rem;
  }

  @media only screen and (max-width: 950px) {
    font-size:3rem;
  }

  @media only screen and (max-width: 900px) {
    font-size:2.4rem;
  }
  
`

const LineStyling = styled.div`
  margin-bottom: 3vh;
  width: 90vw;
  background-color: white;

  @media only screen and (max-width: 1100px) {
    width: 100vw;
  }

  @media only screen and (max-width: 1000px) {
    width: 100vw;
  }
`

// http://reactcommunity.org/react-modal/accessibility/
// Modal.setAppElement('#root')

class BoatGameTracking extends Component {
  constructor(props) {
    super(props);

    const groupPtr = 0;
    
    let currentContent = this.props.currentContent

    const characterMapList = this.createCharacterMapLists(currentContent);
    let styleMapList = this.createStyleMapLists(currentContent);
    styleMapList[0] = styleMapList[0].set(0, 'default-character highlighted');
    this.buildRows=this.buildRows.bind(this)
    const rows = this.buildRows(characterMapList, styleMapList, 0);
    const currentKey = characterMapList[0].get(0);
    const totalLength = currentContent.length;
    this.intervalHandler;
    this.state = {
      rows,
      characterMapList,
      seconds: '00', 
      minutes: '',
      styleMapList,
      groupPtr,
      currentKey,
      totalLength,
      charPtr: 0,
      numKeysPressed:0,
      correct: [],
      incorrect: [],
      edited: [],
      previousCharCorrectness: false,
      LESSON_LENGTH: characterMapList.length,
      consecutiveIncorrectCount: 0,
      consecutiveCorrect:0,
      numOfWords:0,
      isFirstCharacter: true,
      hasPostedResults: false,
      isFinished: false,
      startTime: 0,
      timeElapse:0,
      finishTime: 0,
      pauses: [],
      time: 0
    };

  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.registerUserKeyPress);
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
      this.setState({numKeysPressed:this.state.numKeysPressed-1})
      // TODO: Make sure this doesn't fire after group and index ptr have reached the end
    } else if(this.shouldCheckKey(keyPressed) && this.isNotFinished()) {
      this.validateUserKeyPressCorrectness(keyPressed);
      this.setState({numKeysPressed:this.state.numKeysPressed+1})
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
        if(this.state.upDifficultyCount !== 0){
          this.setState({upDifficultyCount:this.state.upDifficultyCount-1 })
          if(this.state.upDifficultyCount === 5){
            this.setState({
              upDifficulty:true,
              upDifficultyCount:0
            })
            this.props.incrementDifficulty()
          console.log("new level reached: " + this.props.difficulty)
          }
        }
        this.setState({upDifficultyCount:0})
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

  setTime= (time) => {
      this.setState({timeElapse:time})
  }
  nextCharacter = () => {
      let { charPtr, characterMapList, groupPtr, LESSON_LENGTH } = this.state;
      let newCharPtr, newGroupPtr;
      const characterMap = characterMapList[groupPtr];
      const currentRowLength = characterMap.size;


      if(charPtr + 1 >= currentRowLength) {
        this.setState({addTime:true})
        this.setState({upDifficultyCount:this.state.upDifficultyCount +1})
        console.log("line counter " + this.state.upDifficultyCount)
        if(this.state.upDifficultyCount === 5){
          this.setState({
            upDifficulty:true,
            upDifficultyCount:0
          })
          this.props.incrementDifficulty()
        console.log("new level reached: " + this.props.difficulty)
        }
        if(groupPtr + 1 < LESSON_LENGTH) {
          newCharPtr = 0;
          newGroupPtr = groupPtr + 1;
        } else {
          this.props.PlayerLost(this.state,this.state.timeElapse)
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

    // Arrow key pressed; ignore.
    if(keyPressed.indexOf('Arrow') !== -1)
      return;

    let characterMapForRow = characterMapList[groupPtr];
    let styleMapForRow = styleMapList[groupPtr];

    const characterWanted = characterMapForRow.get(charPtr);
    if(characterWanted === keyPressed) {
      consecutiveIncorrectCount = 0;
      styleMapForRow = styleMapForRow.set(charPtr, CORRECT_STYLE);
      previousCharCorrectness = CORRECT;
      correct.push(keyPressed);
      this.setState({consecutiveCorrect:this.state.consecutiveCorrect+1})
    } else {
      this.setState({consecutiveCorrect:0})
      consecutiveIncorrectCount += 1;
      if(characterWanted === " ") {
        styleMapForRow = styleMapForRow.set(charPtr, INCORRECT_SPACE_STYLE);
      } else {
        styleMapForRow = styleMapForRow.set(charPtr, INCORRECT_STYLE);
      }
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
    if(groupPtr + 1 <= characterMapList.length - 2) { groupIterator.push(groupPtr+1);}
    if(groupPtr + 1 <= characterMapList.length - 3) { groupIterator.push(groupPtr+2);}
    if(groupPtr + 1 <= characterMapList.length - 4) { groupIterator.push(groupPtr+3);}
    if(groupPtr + 1 <= characterMapList.length - 5) { groupIterator.push(groupPtr+4);}

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

    // rows = rows.map(row => <p  style={{marginBottom:"3vh", width:"75vw", backgroundColor:"white"}} className="line">{[...row]}</p>);
    rows = rows.map(row => <LineStyling className="examLine">{[...row]}</LineStyling>);
    console.log(rows)
    return rows;
  };

  resetIncrement = () => {
    this.setState({addTime:false})
  }


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
    console.log(line)
    console.log(line.split("\\n"))
    return line.split("\\n")
  };

  closeModal = () => {
    this.attachEventListener();
    let { pauses } = this.state;
    pauses.push(Date.now() - pauses.pop());
    this.setState({ shouldShowModal: false, pauses });
  };

  modalCountdown() {
      this.setState({modelCount:this.state.modelCount-1})
      console.log("seconds left: " + this.state.modelCount)
  }



  onModalOpen = () => {
    this.removeEventListener();
    let { pauses } = this.state;
    pauses.push(Date.now());
    this.setState({ pauses })
    let ref= setInterval(this.modalCountdown,1000)
    setTimeout(()=>{
      clearInterval(ref)
      this.setState({modelCount:5})
      this.setState({consecutiveIncorrectCount:0})
      this.closeModal()
    }, 5000)
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
    return this.state.pauses.reduce((accum, currVal) => accum - currVal, time) / 1000;
  }
  
 

  render() {
    const { isFinished } = this.state;
    if(this.props.inputOff) {
      this.removeEventListener();
    }

    const { rows } = this.state;
    let { currentKey } = this.state;

    currentKey = (currentKey === " ") ? "spacebar" : currentKey;
    return (
      <div>
        <ExamParagraphText>
            {rows[0] ? rows[0]: <div> </div>}
        </ExamParagraphText>
        <ExamParagraphText>
            {rows[1] ? rows[1]: <div> </div>}
        </ExamParagraphText>  
        <ExamParagraphText>
            {rows[2] ? rows[2]: <div> </div>}
        </ExamParagraphText> 
        <ExamParagraphText>
            {rows[3] ? rows[3]: <div> </div>}
        </ExamParagraphText> 
        <ExamParagraphText>
            {rows[4] ? rows[4]: <div> </div>}
        </ExamParagraphText> 
        <div className="content-wrapper">
          <div className="timer-container">
              <Counter 
                accuracyInfo={this.state} 
                PlayerLost={this.props.playerHasLost} 
                setTime={this.setTime} 
                time={this.props.time} 
                baseDifficulty={this.props.difficulty} 
                NeedsToIncrement={this.state.addTime} 
                resetFunction={this.resetIncrement} 
                IncrementLevel={this.state.upDifficulty} 
              />  {/* should make this depend on difficulty*/}
          </div> 
        </div>
      </div>
    )
  }
}

export default BoatGameTracking;

