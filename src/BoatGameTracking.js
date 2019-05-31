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
    background-image: url(./images/games/Waves_extended.svg);
    //background-position: center bottom -130vh;
    background-position: center bottom -130vh;
    background-repeat: no-repeat;
    background-size: 150vw auto;
    // height: 100vh;

    @media only screen and (max-width: 2200px) {
      background-position: center bottom -140vh;
    }

    @media only screen and (max-width: 1900px) {
      background-position: center bottom -135vh;
    }
    @media only screen and (max-width: 1850px) {
      background-position: center bottom -130vh;
    }
    @media only screen and (max-width: 1800px) {
      background-position: center bottom -125vh;
    }
    @media only screen and (max-width: 1750px) {
      background-position: center bottom -120vh;
    }
    @media only screen and (max-width: 1700px) {
      background-position: center bottom -100vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1650px) {
      background-position: center bottom -95vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1600px) {
      background-position: center bottom -90vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1550px) {
      background-position: center bottom -85vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1500px) {
      background-position: center bottom -80vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1450px) {
      background-position: center bottom -75vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1400px) {
      background-position: center bottom -70vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1350px) {
      background-position: center bottom -65vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1300px) {
      background-position: center bottom -60vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1250px) {
      background-position: center bottom -55vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1200px) {
      background-position: center bottom -50vh;
      height: 100vh;
    }
    @media only screen and (max-width: 1150px) {
      background-position: center bottom -45vh;
    }
    @media only screen and (max-width: 1100px) {
      background-position: center bottom -40vh;
    }
    @media only screen and (max-width: 1050px) {
      background-position: center bottom -35vh;
    }
    @media only screen and (max-width: 1000px) {
      background-position: center bottom -30vh;
    }
    @media only screen and (max-width: 950px) {
      background-position: center bottom -25vh;
    }
    @media only screen and (max-width: 900px) {
      background-position: center bottom -20vh;
    }
    @media only screen and (max-width: 850px) {
      background-position: center bottom -15vh;
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
  bottom: -1vh;
`

const Boat = styled.div`
  margin-left:${props => props.displacement}vw;
  padding-bottom: 9.5vh;
  height:auto;
  width:auto;
  transition: all .8s ease-in-out;
`

const BoatImage = styled.div`
  content: url(./images/games/Boat.svg);
  width: 15vw;

  @media only screen and (max-width: 1400px) {
    width: 20vw;
  }
  @media only screen and (max-width: 1150px) {
    width: 25vw;
  }
  @media only screen and (max-width: 1000px) {
    width: 25vw;
  }
`

const BoatText = styled.div`
  z-score: 10;
  position: relative;
  padding-left:5vw;
  margin-bottom: -4vh;
  font-weight: bold;

  @media only screen and (max-width: 1400px) {
    padding-left:7vw;
  }
  @media only screen and (max-width: 1150px) {
    padding-left: 7.5vw;
  }
  @media only screen and (max-width: 1000px) {
    padding-left: 7.5vw;
  }
`
const PlayerText=styled.div`
  z-score: 10;
  position: relative;
  padding-left:6.8vw;
  margin-bottom: -4vh;
  font-weight: bold;

  @media only screen and (max-width: 1400px) {
    padding-left:9vw;
  }
  @media only screen and (max-width: 1150px) {
    padding-left: 11vw;
  }
  @media only screen and (max-width: 1000px) {
    padding-left: 11vw;
  }
`

const BoatParagraphText = styled.div`
  display:flex; 
  flex-direction:row; 
  text-align:center;
  align-content:center;
  justify-content: center;
  font-size:2.9rem;
  width:100vw;

  @media only screen and (max-width: 1100px) {
    font-size:3rem;
  }

  @media only screen and (max-width: 1000px) {
    font-size:2.8rem;
  }

  @media only screen and (max-width: 950px) {
    font-size:2.6rem;
  }

  @media only screen and (max-width: 900px) {
    font-size:2.1rem;
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
Modal.setAppElement('#root')

class BoatGameTracking extends Component {
  constructor(props) {
    super(props);

    const groupPtr = 0;
    
    let currentContent = this.props.currentContent

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
    this.calculatePlayerPlace=this.calculatePlayerPlace.bind(this)
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
    console.log(this.props.currentContent)
    this.startRace();
  };

  incrementMargin = () => {
      this.setState({
        boat1Margin:(this.state.boat1Margin + (this.state.boat1Increment)),
        boat3Margin:(this.state.boat3Margin + (this.state.boat3Increment))
      })
      if(this.state.boat1Margin >= 85 || this.state.boat3Margin >= 85){
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

  calculatePlayerPlace = () =>{
    let position;
    let boat1Position=this.state.boat1Margin
    let playerPosition=this.state.displacement
    let boat3position=this.state.boat3Margin
    let margins=[boat1Position,playerPosition,boat3position]
    console.log(margins)
    margins.sort().reverse()
    return margins.indexOf(playerPosition) + 1
  }
  
  endRace= () =>{
     this.setState({stopTime:true})
     console.log("race has ended")
     let playerPosition= this.calculatePlayerPlace()
     this.props.assignPosition(playerPosition)
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
    if(groupPtr + 1 <= characterMapList.length - 2) {
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

    // rows = rows.map(row => <p  style={{marginBottom:"3vh", width:"75vw", backgroundColor:"white"}} className="line">{[...row]}</p>);
    rows = rows.map(row => <LineStyling className="line">{[...row]}</LineStyling>);
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
    return line.split("\\n")
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
    if(this.props.inputOff) {
      this.removeEventListener();
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
            {rows[0]}
        </BoatParagraphText>
        <BoatParagraphText>
            {rows[1]}
        </BoatParagraphText>   

        <BoatContainer>
          <Boat displacement={this.state.boat1Margin}>
            <BoatText>Challenger 1</BoatText>
            <BoatImage></BoatImage>
          </Boat>
          <Boat displacement={this.state.displacement}>
            <PlayerText>You</PlayerText>
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
