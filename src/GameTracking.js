import { OrderedMap } from 'immutable';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import styled from 'styled-components'
import { postTutorialResults } from './actions/tutorial';

import Counter from './counterPage'

import "./style/GameTracking.css"

const BACKSPACE = "Backspace";
const DEFAULT_STYLE = "default-character character";
const CORRECT_STYLE = "correct-character character";
const INCORRECT_STYLE = "incorrect-character character";
const INCORRECT_SPACE_STYLE = "incorrect-space-character character";
const HIGHLIGHTED = "highlighted character";

const CORRECT = "correct";
const INCORRECT = "incorrect";


const GameText = styled.div`
    margin-top: 4vh;
    padding-top: 1vh;
    border: 5px solid #F5A623;  
    border-radius: 10px;  
    background-color: #FFFFFF;
    width: 800vw;
    height: 10vh;
    text-align: center;

    font-weight: 600;
    font-size: 3.2rem;
    margin-bottom: 5rem;
    margin-left: 23%;
    margin-right: 23%;

    @media only screen and (max-width: 1300px) {
        font-size: 3.2rem;
    }

    @media only screen and (max-width: 1150px) {
        font-size: 2.7rem;
        padding-top: 2vh;
        margin-left: 10%;
        margin-right: 10%;
    }

    @media only screen and (max-width: 900px) {
        font-size:2.6rem;
    }
    
`

const CounterText = styled.div`
    height:15vh;
    width:10vw;
    padding-left: 25px;
    padding-right: 25px;
    color: #52B094;
    font-family: "Racetrack";

    display:flex;
    flex-direction: column;
    align-items:center;

`

const CounterNumber = styled.div`
    font-size: 5rem;
    margin-top: -.5rem;
}
`


// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

class GameTracking extends Component {
  constructor(props) {
    super(props);

    const groupPtr = 0;
    let { currentContent } = this.props;
    currentContent = currentContent.trim();

    const characterMapList = this.createCharacterMapLists(currentContent);
    let styleMapList = this.createStyleMapLists(currentContent);
    styleMapList[0] = styleMapList[0].set(0, 'default-character highlighted');
    this.buildRows=this.buildRows.bind(this)
    const rows = this.buildRows(characterMapList, styleMapList, 0);

    const currentKey = characterMapList[0].get(0);

    const totalLength = currentContent.length;

    this.resetIncrement=this.resetIncrement.bind(this)
    this.state = {
      rows,
      characterMapList,
      addTime: false,
      seconds: '00', 
      minutes: '',
      styleMapList,
      upDifficulty:false,
      upDifficultyCount:0,
      groupPtr,
      currentKey,
      totalLength,
      charPtr: 0,
      correct: [],
      incorrect: [],
      edited: [],
      Level:1,
      previousCharCorrectness: false,
      LESSON_LENGTH: characterMapList.length,
      consecutiveIncorrectCount: 0,
      consecutiveCorrect:0,
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
        if(this.state.upDifficultyCount!=0){
          this.setState({upDifficultyCount:this.state.upDifficultyCount-1 })
          console.log("line counter " + this.state.upDifficultyCount)
          if(this.state.upDifficultyCount == 5){
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

  nextCharacter = () => {
      let { charPtr, characterMapList, groupPtr, LESSON_LENGTH } = this.state;
      let newCharPtr, newGroupPtr;
      const characterMap = characterMapList[groupPtr];
      const currentRowLength = characterMap.size;


      if(charPtr + 1 >= currentRowLength) {
        this.setState({addTime:true})
        this.setState({upDifficultyCount:this.state.upDifficultyCount +1})
        console.log("line counter " + this.state.upDifficultyCount)
        if(this.state.upDifficultyCount == 5){
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
          this.props.isFinished();
          this.setState({ isFinished: true,  finishTime: Date.now() });
          this.props.updateResults({
            time: this.calculateTutorialTime(),
            length: this.state.totalLength,
            incorrect: this.state.incorrect.length
          });
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
      if(characterWanted == " ") {
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

    rows = rows.map(row => <GameText>{[...row]}</GameText>);
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
    return line.match(/.{1,25}/g);
  };

  closeModal = () => {
    this.attachEventListener();
    let { pauses } = this.state;
    pauses.push(Date.now() - pauses.pop());
    this.setState({ shouldShowModal: false, pauses });
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
    return this.state.pauses.reduce((accum, currVal) => accum - currVal, time) / 1000;
  }
  
 

  render() {
    const { isFinished } = this.state;
    if(isFinished) {
      this.removeEventListener();
      this.props.showStats();
    }

    const { rows } = this.state;
    let { currentKey } = this.state;

    currentKey = (currentKey === " ") ? "spacebar" : currentKey;
    return (

      <div>
      <div className="data-container">
        <CounterText>
            <div className="CounterName">Streak</div>
          <CounterNumber>{this.state.consecutiveCorrect}</CounterNumber>
        </CounterText>  
        <div id="Buffer"/>
        <CounterText>
          <div className="CounterName">Level</div>
          <CounterNumber>{this.state.Level}</CounterNumber>
        </CounterText>
      </div>
       <div className="content-wrapper">
        <Modal 
          isOpen={this.state.shouldShowModal}
          onAfterOpen={this.onModalOpen}
          className="tutorial-modal"
        >
          <p className="modal-text">You missed more than <br/><strong><u>5 keys</u></strong> in a row. <br/>Please go back and correct <br/>the mistyped keys!</p>
          <button onClick={this.closeModal} className="button-primary solid modal-button" type="submit" value="CLOSE">OKAY</button>
        </Modal>
        <div className="timer-container">
            <Counter accuracyInfo={this.state} PlayerLost={this.props.playerHasLost} baseDifficulty={this.props.difficulty} setTime={this.props.countTime} NeedsToIncrement={this.state.addTime} resetFunction={this.resetIncrement} IncrementLevel={this.state.upDifficulty} />  {/* should make this depend on difficulty*/}
        </div> 
      </div> 
      <div className="game-tracker-container">
          {rows}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GameTracking);
