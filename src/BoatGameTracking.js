import { OrderedMap } from 'immutable';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import styled from 'styled-components'
import { postTutorialResults } from './actions/tutorial';

import Counter from './BoatTrackingCounterPage'

import "./style/BoatTracking.css"

const BACKSPACE = "Backspace";
const DEFAULT_STYLE = "default-character character";
const CORRECT_STYLE = "correct-character character";
const INCORRECT_STYLE = "incorrect-character character";
const INCORRECT_SPACE_STYLE = "incorrect-space-character character";
const HIGHLIGHTED = "highlighted character";

const CORRECT = "correct";
const INCORRECT = "incorrect";


const BoatraceGameBackground = styled.div`
    background-image: url(/images/games/waves.svg);
    // background-position: center bottom -25vh;
    background-position: center bottom -25rem;
    background-repeat: no-repeat;
    background-size: 100% auto;
    height: 100vh;

    @media only screen and (max-width: 1900px) {
      background-position: center bottom -20vh;
    }
    @media only screen and (max-width: 1800px) {
      background-position: center bottom -15vh;
    }
    @media only screen and (max-width: 1700px) {
      background-position: center bottom -10vh;
    }
    @media only screen and (max-width: 1600px) {
      background-position: center bottom -5vh;
    }
    @media only screen and (max-width: 1500px) {
      background-position: center bottom -1vh;
    }
    @media only screen and (max-width: 1400px) {
      background-position: center bottom 5vh;
    }
    @media only screen and (max-width: 1300px) {
      background-position: center bottom 10vh;
    }
    @media only screen and (max-width: 1150px) {
      background-position: center bottom 15vh;
    }
    @media only screen and (max-width: 1000px) {
      background-position: center bottom 20vh;
    }
    @media only screen and (max-width: 900px) {
      background-position: center bottom 25vh;
    }
`

const GameText = styled.div`
    
`

const CounterText = styled.div`

`

const CounterNumber = styled.div`

`

const BoatContainer = styled.div`
  display:flex;
  flex-direction:column;
  position: absolute;
  bottom: -1vh;
`

const Boat = styled.div`
  margin-left:${props => props.displacement}vw;
  margin-bottom: 10vh;
  
`

const BoatImage = styled.div`
  content: url(/images/games/Boat.svg);
  width: 15vw;

  @media only screen and (max-width: 1400px) {
    width: 20vw;
  }
  @media only screen and (max-width: 1150px) {
    width: 25vw;
  }
  @media only screen and (max-width: 1000px) {
    width: 30vw;
  }
`

const BoatText = styled.div`
  text-align: center;
  z-score: 10;
  position: relative;
  margin-bottom: -4vh;
  font-weight: bold;
`

const BoatParagraphText = styled.div`
  
`


// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root')

class BoatGameTracking extends Component {
  constructor(props) {
    super(props);

    const groupPtr = 0;
    let { currentContent } = this.props;
    currentContent = currentContent.trim();

    const characterMapList = this.createCharacterMapLists(currentContent);
    let styleMapList = this.createStyleMapLists(currentContent);
    styleMapList[0] = styleMapList[0].set(0, 'default-character highlighted');
    this.buildRows=this.buildRows.bind(this)
    this.endRace=this.endRace.bind(this)
    const rows = this.buildRows(characterMapList, styleMapList, 0);

    const currentKey = characterMapList[0].get(0);

    const totalLength = currentContent.length;

    this.resetIncrement=this.resetIncrement.bind(this)
    this.calculateDisplacement=this.calculateDisplacement.bind(this)
    this.intervalHandler;
    this.state = {
      rows,
      characterMapList,
      addTime: false,
      seconds: '00', 
      displacement:0,
      minutes: '',
      styleMapList,
      upDifficulty:false,
      upDifficultyCount:0,
      groupPtr,
      currentKey,
      totalLength,
      charPtr: 0,
      numKeysPressed:0,
      boat1Margin:0,
      boat1Increment:0,
      boat3Margin:0,
      boat3Increment:0,
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
      stopTime:false,
      pauses: [],
      time: 0
    };

  }

  componentWillMount = () => {
    this.determineSpeed();
    this.attachEventListener();
    this.startRace();
  };

  incrementMargin = () => {
      this.setState({
        boat1Margin:(this.state.boat1Margin + (this.state.boat1Increment/20)),
        boat3Margin:(this.state.boat3Margin + (this.state.boat3Increment/20))
      })
      if(this.state.boat1Margin >= 100 || this.state.boat3Margin >= 100){
        clearInterval(this.intervalHandler)
        this.endRace()
        
      }

    

  }

  startRace =() =>{
    this.intervalHandler=setInterval(this.incrementMargin,1000);
  }

  determineSpeed = () =>{
    var difficulty=this.props.baseDifficulty
    var min=0
    var max=0
    var wpm1=0
    var wpm2=0
    if(difficulty == 1){
      min=10
      max=25
    }
    else if(difficulty ==2) {
      min=30
      max=60
    }
    else{
      min=70
      max=95

    }
    wpm1 = min + Math.random() * (max-min)
    wpm2 = min + Math.random() * (max-min)

    var time1 = (this.state.totalLength / 5) * (60/wpm1)
    var time2 = (this.state.totalLength / 5) * (60/wpm2)

    var increment1= 100/time1
    var increment3= 100/time2

    this.setState({
      boat1Increment:increment1,
      boat3Increment:increment3
    })
    console.log(wpm1)
    console.log(wpm2)
    console.log(difficulty)
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
      this.calculateDisplacement();
    }
  };

  endRace= () =>{
     this.setState({stopTime:true})
  }

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
          this.endRace();
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

  calculateDisplacement = () => {
    var margin= (this.state.numKeysPressed/this.state.totalLength)*100
    var prevDisplacement= this.state.displacement
    console.log("previous displacement: " + prevDisplacement)
    console.log("new displacement: " + (margin))
    if(margin >= prevDisplacement){
      this.setState({displacement:(margin)})
    }
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

      <BoatraceGameBackground>
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
              <Counter accuracyInfo={this.state} timerShortStop={this.state.stopTime} PlayerLost={this.props.playerHasLost} baseDifficulty={this.props.difficulty} setTime={this.props.countTime} NeedsToIncrement={this.state.addTime} resetFunction={this.resetIncrement} IncrementLevel={this.state.upDifficulty} />  {/* should make this depend on difficulty*/}
          </div> 
        </div>
        <BoatParagraphText>
            {rows}
        </BoatParagraphText>

        <BoatContainer>
          <Boat displacement={this.state.boat1Margin}>
            <BoatText>Challenger 1</BoatText>
            <BoatImage></BoatImage>
          </Boat>
          <Boat displacement={this.state.displacement}>
            <BoatText>You</BoatText>
            <BoatImage></BoatImage>
          </Boat>
          <Boat displacement={this.state.boat3Margin}>
            <BoatText>Challenger 2</BoatText>
            <BoatImage></BoatImage>
          </Boat>
        </BoatContainer>

      </BoatraceGameBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(BoatGameTracking);
