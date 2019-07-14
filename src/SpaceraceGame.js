import React, { Component } from 'react';
import { tween, styler } from 'popmotion';
import shuffle from 'shuffle-array'

import Header from './components/header';
import styled from 'styled-components'; 
import Statistics from './SpaceraceStats'
import Spacerace from './Spacerace'
import GameOverSign from './components/GameOverSign'
import data from "./offline_data.json"

import { LocalStorageCache, GameService } from "./services";

import './style/animation.css';
import './style/font.css';

const BACKSPACE = "Backspace";
const ENTER = "Enter";
const SHIFT = "Shift";
const CONTROL = "Control";
const META = "Meta";
const TAB = "Tab";
const CAPSLOCK = "CapsLock";
const SPACE = " "

const SpaceRaceBackground = styled.div`
  background-image: url(./images/games/Stars_Background.svg), url(./images/games/Earth.svg);
  background-position: center bottom 0vh, center right;
  background-repeat: repeat, no-repeat;
  background-size: 100vw auto, 30vw auto;
  background-color: #25365A;
  width: 100vw;
  height: 100vh;

  @media only screen and (max-width: 1300px) {
    background-position: center bottom 0vh, center right -10vw;
    background-size: 100vw auto, 40vw auto;
  }
  @media only screen and (max-width: 1000px) {
    background-position: center bottom 0vh, center right -15vw;
    background-size: 100vw auto, 50vw auto;
  }
`

const SpaceRaceInputText = styled.div`
  color: white;
  font-size: 4rem;
  text-align: center;
  height:10vh;
  width:60vw;
  background-color: #25365A;
  border-color:white;
  border: 5px solid;
  border-radius:20px;
  z-index:2;
  margin: 0 auto;
`

const RocketContainer = styled.div`
  display:flex;
  flex-direction:column;
  height: 80vh;
  text-align: center;
  font-size: 2em;
  color: white;
`

const LivesContainer = styled.div`
  margin-top:1vh;
  margin-left:2vh;
  display:flex;
  flex-direction:row;
  text-align: center;
  font-size: 3em;
  color: white;
`
const Lives = styled.div`
  display:flex;
  flex-direction:row;
  width:5vw;
  height:6vh;
  text-align: left;
`

const LevelContainer = styled.div`
  color: #DC367A;
  position: absolute;
  right: 3vw;
  top: 8rem;
  font-size: 2.5rem;
  font-weight: 900;
  text-align: right;
  font-family: Arcade_real;
`

const StartingInstructions = styled.div`
  position: absolute;
  color: #DC367A;
  font-family: Arcade_real;
  font-size: 3.5rem;
  top: 30vh;
  width: 80vw;
  margin: 0 auto;
  left: 10vw;
  text-align: center;
  text-decoration: underline;
  ${props => props.hasStarted ? ' ' : 'visibility: hidden;' };
`

class SpaceraceGame extends React.Component {
  constructor(props) {
    super(props);

    this.cache = new LocalStorageCache();
    this.gameService = new GameService();

    this.state = {
      username: this.cache.get("username"),
      headerLinks: ["Stats", "Games", "Learn", "Home"],
      FirstWords:  ["Friday", "Monday", "Sunday"],
      AllWords:[],
      currentRockets:[],
      rowNum:0,
      seconds:0,
      currentWordList: ["Friday", "Monday", "Sunday"],
      inputWord: "",
      startPeriod:true,
      wpm:20,
      zIndex:5,
      lives:3,
      playerHasLost:false,
      level:1, 
      duration:10,
      totalWordsTyped:0,
      startPresses:0,
      totalCorrect:0,
      playerAccuracy:0,
      timeOutInstance:0,
      ref1:0,
      ref2:0,
      ref3:0,
      live1:"./images/games/Heart.svg", 
      live2:"./images/games/Heart.svg", 
      live3:"./images/games/Heart.svg",
      showMainPage:true,
      AvailableWords:[],
      isPlayerReady:false,
      showSign:false,
      difficultySelected:"",
    } 

    this.doesWordExist = this.doesWordExist.bind(this);
    this.spawnRocket = this.spawnRocket.bind(this);
    this.destroyRocket = this.destroyRocket.bind(this);
    this.subtractLife = this.subtractLife.bind(this);
    this.incrementDifficulty = this.incrementDifficulty.bind(this);
    this.tick = this.tick.bind(this);
    this.checkDifficultyIncrement = this.checkDifficultyIncrement.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
    this.playAgain = this.playAgain.bind(this);
    this.getParentDiv = this.getParentDiv.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.returnMainPage = this.returnMainPage.bind(this);
    this.exitMainPage = this.exitMainPage.bind(this);
    this.setAvailableWords = this.setAvailableWords.bind(this);
    this.createStyler = this.createStyler.bind(this);
    this.recordHighScore = this.recordHighScore.bind(this);
    this.initiateTimeOut = this.initiateTimeOut.bind(this);

    this.attachEventListener();
  }

  componentDidMount() {
    this.setState({AllWords:data.games.spacerace})    
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.registerUserKeyPress);
    clearTimeout(this.state.timeOutInstance)
    clearInterval(this.state.ref1)
    clearInterval(this.state.ref2)
    clearInterval(this.state.ref3)
  }

  exitMainPage = (difficulty) => {
    this.setState({
      showMainPage:false, 
      isPlayerReady:true
    })

    if(difficulty === "easy"){
      this.setState({
        difficultySelected : "easy", 
        wpm:20
      })
    }else if(difficulty === "Medium"){
      this.setState({
        difficultySelected : "medium",
        wpm:25
      })
    }else if(difficulty === "Hard"){
      this.setState({
        difficultySelected : "hard",
        wpm:30
      })
    }
  }
  
  checkDifficultyIncrement = () => {
    const{
      seconds,
      difficultySelected
    } = this.state;

    if(seconds % 30 === 0){
      this.incrementDifficulty()
    }
    if (difficultySelected === "easy"){
      if(seconds % 30 === 0){
        this.spawnRocket(); 
      }
    }else if (difficultySelected === "hard"){
      if(seconds % 5 === 0){
        this.spawnRocket();   
      }
    } else {
      if(seconds % 25 === 0){
        this.spawnRocket();    
      }
    }
  }

  tick = () => {
    this.setState({seconds:this.state.seconds + 1})
  }

  incrementDuration = () => {
    let prevDuration= this.state.duration

    if(prevDuration === 10){
      this.setState({duration:12})
    }else if(prevDuration === 12){
      this.setState({duration:11})
    }else if(prevDuration === 11){
      this.setState({duration:10})
    }
    return prevDuration * 1000
  }

  incrementDifficulty = () => {
    clearInterval(this.state.ref3)
    this.setState({
      level:this.state.level +1, 
      wpm:this.state.wpm + 5,
      ref3:setInterval(this.spawnRocket,this.state.wpm/60 *10000)
    })
  }

  doesWordExist = checkWord => { 
    return this.state.currentRockets.includes(checkWord)
  }

  attachEventListener = () => {
    document.addEventListener("keydown", this.registerUserKeyPress);
  }

  nextWordUpdate = () => {
    return this.state.nextWordUpdate; 
  }

  async recordHighScore() {
    await this.gameService.addGameScoreAndUpdateIfHigher(
      this.cache.get('uid'),
      GameService.Games.SPACE_RACE,
      {
        wpm:this.state.wpm,
        accuracy:this.state.playerAccuracy,
        level:this.state.level
      }
    );
  }

  playAgain(){
    this.setState({
      playerHasLost:false,
      startPeriod:true,
      showMainPage:true,
      startRocketSpawning:false,
      showSign:false,
      seconds:0,
      startPresses:0,
      difficultySelected:"",
      difficulty:"",
      wpm:20,
      currentRockets:[],
      level:1,
      lives:3,
      live1:"./images/games/Heart.svg", 
      live2:"./images/games/Heart.svg", 
      live3:"./images/games/Heart.svg"
    })
    this.attachEventListener();    
  }

  spawnRocket = () => {
    //determine word and rowNum where we need to spawn rocket
    let AvailableWords = this.state.AvailableWords
    let randIndex = Math.floor(Math.random()* AvailableWords.length)
    let rocketWord = AvailableWords[randIndex]

    //creates rocket and iterates over row - adds word to currentRockets 
    this.createRocket(rocketWord,this.state.rowNum,randIndex)
    this.setState({
      rowNum:this.state.rowNum + 1,
      zIndex:this.state.zIndex + 1
    })

    if(this.state.rowNum === 3){
      this.setState({rowNum:0})
    }
  }

  initiateTimeOut = () => {
    return setTimeout(() => {this.setState({playerHasLost:true})},6000)
  }

  subtractLife = () => {
    if (this.state.lives === 3){
      this.setState({live3: null})
    }else if (this.state.lives === 2){
      this.setState({live2: null})
    }else if (this.state.lives === 1){
      this.setState({live1: null})
    }
    this.setState({lives:this.state.lives -1})
    if(this.state.lives === 0){
      this.setState({showSign:true})
      clearInterval(this.state.ref1)
      clearInterval(this.state.ref2)
      clearInterval(this.state.ref3)
      document.removeEventListener("keydown", this.registerUserKeyPress);
      this.calculateStats()
      this.setState({timeOutInstance:this.initiateTimeOut()})
    }
  }

  destroyRocket = (targetDiv) => {
    if(!document.getElementsByClassName(targetDiv)[0]){
      return
    }
    let target=document.getElementsByClassName(targetDiv)[0]
    let childNodes = target.childNodes
    let text= childNodes[0]
    let img = childNodes[1]
    target.id="destroyed"

    //find word in currentRockets and places it in available words
    let index= this.state.currentRockets.findIndex(wordInArray => wordInArray === text.textContent)
    this.state.currentRockets.splice(index,1)
    this.state.AvailableWords.push(text.textContent)

    //destory rocket
    img.src="./images/games/Meteor_Crash.svg"
    img.style.width= "5vw"
    img.style.height= "auto"

    setTimeout(function() {
      target.style.visibility="hidden"
      target.style.width="0vw"
      target.style.height="0vh"
      target.className= "null"
      text.textContent=""
    }, 100);
    
  }

  calculateStats = () =>  {
    let accuracy= Math.floor((this.state.totalCorrect/this.state.totalWordsTyped)*100)
    this.setState({playerAccuracy:accuracy})
  }
  
  
  createRocket = (word,rowNum,index,) => {
    let rocket = document.createElement('div')
    let text = document.createElement('p')
    let img = document.createElement('img')
    let parent = document.getElementsByClassName("RocketRow")

    img.src = "./images/games/Meteor.svg" 
    img.style.width = "100%"

    rocket.style.width = "25vw"
    rocket.style.height = "auto"

    img.style.height = "auto"

    text.textContent = word
    text.style.color = "white"
    text.style.fontSize = "2.6vw"
    text.style.fontWeight = "bold"
    text.style.textAlign = "center"
    text.style.position = "relative"
    text.style.top = "5.5vw"
    text.style.left = "5.5vw"

    rocket.className = word
    rocket.id = "not-destroyed"
    rocket.appendChild(text)
    rocket.appendChild(img)
    parent[rowNum].appendChild(rocket)

    //add randomword selected to rocket words (words that are on screen currently)
    this.state.currentRockets.push(word)
    this.state.AvailableWords.splice(index,1)
    const extraRocket= this.createStyler(word)
    let haslostLife = false

    tween({
      from: {x:-window.innerWidth/3,    y:0},
      to:   {x: window.innerWidth -600, y:0},
      duration: this.incrementDuration(),
    })
    .start(v => {
      extraRocket.set({x:v.x})
      if(rocket.id !== "destroyed" && !haslostLife && v.x >= window.innerWidth -600 ){ //i think this might be an issue 
        this.subtractLife()
        haslostLife = true
      }
      if(v.x >= window.innerWidth -600){
        img.src = "./images/games/Meteor_Crash.svg"
        img.style.width = "5vw"
        img.style.height = "auto"

        setTimeout(function() {
          rocket.style.visibility = "hidden"
          rocket.style.width = "0vw"
          rocket.style.height = "0vh"
          rocket.className = "null"
        }, 1000); 
      }
      else if(v.x <= 0){
        img.src = "./images/games/Meteor.svg"
      } 
    });
  }
  createStyler = (word) => {
    return styler(document.querySelector('.'+word))
  }

  returnMainPage = () => {
    this.setState({showMainPage:true})
  }

  setAvailableWords = () => {
    const{
      difficultySelected,
      AvailableWords,
      AllWords
    } = this.state;

    if (difficultySelected === "easy"){
      this.setState({AvailableWords: AllWords.slice(0, 145)})
      shuffle(AvailableWords)
    }else if (difficultySelected === "hard"){
      this.setState({AvailableWords: AllWords.slice(408, -1)})
      shuffle(AvailableWords)
    }else {
      this.setState({AvailableWords: AllWords.slice(145, 409)})
      shuffle(AvailableWords)
    }
  }

  getParentDiv = () => {
    return document.getElementsByClassName("RocketRow")
  }

  exitGame = () => {
    this.props.history.push("/selectGames")
  }

  registerUserKeyPress = ({ key: keyPressed }) => {
    const{
      startPeriod,
      startPresses,
      inputWord,
      totalWordsTyped,
      totalCorrect
    } = this.state;
    
    if(startPeriod){
      this.setAvailableWords()
      this.setState({startPresses: startPresses + 1})
      if(startPresses === 1){
        this.setState({
          startPeriod:false,
          startRocketSpawning:true,
          ref1:setInterval(this.tick,1000),
          ref2:setInterval(this.checkDifficultyIncrement, 1000),
          ref3:setInterval(this.spawnRocket,this.state.wpm/60 *10000)
        })
      }
    } else if (keyPressed === BACKSPACE) {
      this.setState({inputWord:inputWord.slice(0, -1)})
    } else if (keyPressed === SHIFT) {
      this.setState({inputWord:inputWord})
    } else if (keyPressed === CAPSLOCK) {
      this.setState({inputWord:inputWord})
    } else if (keyPressed === META) {
      this.setState({inputWord:inputWord})
    } else if (keyPressed === CONTROL) {
      this.setState({inputWord:inputWord})
    } else if (keyPressed === TAB) {
      this.setState({inputWord:inputWord})    
    } else if (keyPressed === ENTER || keyPressed === SPACE) {
      this.setState({totalWordsTyped: totalWordsTyped + 1})
      if (this.doesWordExist(inputWord)) {
        this.destroyRocket(inputWord)
        this.setState({totalCorrect:totalCorrect + 1})
      }      
      this.setState({inputWord:''})
    }
    else {
      this.setState({
        nextWordUpdate: true,
        inputWord:inputWord + keyPressed
      })
    }

  }

  render() {
    const {
      live1,live2,live3, 
      headerLinks, 
    } = this.state;

    if(this.state.showMainPage){
      return (<Spacerace data={this.state} commenceGame={this.exitMainPage} onLogout={this.props.onLogout} history={this.props.history} />)
    } else if(!this.state.playerHasLost){
        return (
          <SpaceRaceBackground>
            {this.state.showSign && <GameOverSign/>}
            <Header 
              links={headerLinks} 
              isLoggedIn={true} 
              username={this.state.username}
              history={this.props.history}
              onLogout={this.props.onLogout}
            />
            <LivesContainer>
              <Lives className="Lives">
                <img height="auto" width="100%" src={live1}/>
              </Lives>
              
              <Lives className="Lives">
                <img height="auto" width="100%" src={live2}/>
              </Lives>

              <Lives className="Lives">
                <img height="auto" width="100%" src={live3}/>
              </Lives>
            </LivesContainer>

            <LevelContainer>
              Level {this.state.level}
            </LevelContainer>

            <StartingInstructions hasStarted={this.state.startPeriod}>
              Press Any Key To Start!
            </StartingInstructions>

          <RocketContainer>
            <div style={{display:"flex",flexDirection:"inline-row",width:"100vw",height:"26vh",textAlign:"center"}} className="RocketRow">
            </div>

            <div style={{display:"flex",flexDirection:"inline-row",width:"100vw",height:"26vh",textAlign:"center"}} className="RocketRow">
            </div>

            <div style={{display:"flex",flexDirection:"inline-row",width:"100vw",height:"26vh",textAlign:"center"}} className="RocketRow">
            </div>

            <SpaceRaceInputText>
              {this.state.inputWord}
            </SpaceRaceInputText>
          </RocketContainer>

          </SpaceRaceBackground>
        );
    } else{
      return ( 
        <Statistics 
          recordHighScore={this.recordHighScore}
          data={this.state} 
          exit={this.props.exit} 
          reset={this.playAgain} 
          onLogout={this.props.onLogout} 
          history={this.props.history}
        />
      )
    }
  }
}

export default (SpaceraceGame);