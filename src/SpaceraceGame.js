import React from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import { tween, styler } from 'popmotion';
import styled from 'styled-components'; 
import Header from './components/header';
import {withRouter} from 'react-router'
import Statistics from './SpaceraceStats'

import './style/animation.css';
import './style/font.css';

const BACKSPACE = "Backspace";
const ENTER = "Enter";
const SHIFT = "Shift";
const CONTROL = "Control";
const META = "Meta";
const TAB = "Tab";

const RCGameText = styled.div`
    margin-top:4vh;
    height: 10vh;	
    width: 80vw;	
    border: 5px solid #F5A623;	
    border-radius: 10px;	
    background-color: #FFFFFF;
    font-size: 3.5rem;
    display:flex;
    justify-content:center;
`

const RocketRow = styled.div`
    display:flex;
    flex-direction:inline-row;
    width:100vw;
    height:26vh;
    text-align: center;
`

const SpaceRaceBackground = styled.div`
    background-image: url(/images/games/Stars_Background.svg), url(/images/games/Earth.svg);
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
    font-size: 1.5em;
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


class SpaceraceGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLinks: ["Games", "Learn", "Home"],
      AvailableWords:["wow", "weightlifting", "word", "mehhh", "iliana", "ehi", "i", "hate", "saddness"],
      FirstWords:["hi", "weightlifting", "yay"],
      currentRockets:[],
      rowNum:0,
      seconds:0,
      currentWordList: ["hi", "hello", "wow"],
      inputWord: "",
      startPeriod:true,
      wpm:20,
      zIndex:5,
      lives:3,
      playerHasLost:false, 
      needToincrement:false,
      level:1, 
      duration:10,
      totalWordsTyped:0,
      startPresses:0,
      totalCorrect:0,
      playerAccuracy:0,
      ref1:0,
      ref2:0,
      live1:"./images/games/Heart.svg", 
      live2:"./images/games/Heart.svg", 
      live3:"./images/games/Heart.svg",

    } 

    this.doesWordExist = this.doesWordExist.bind(this)
    this.spawnRocket=this.spawnRocket.bind(this)
    this.destroyRocket=this.destroyRocket.bind(this)
    this.subtractLife=this.subtractLife.bind(this)
    this.incrementDifficulty=this.incrementDifficulty.bind(this)
    this.tick=this.tick.bind(this)
    this.checkDifficultyIncrement= this.checkDifficultyIncrement.bind(this)
    this.spawnInitRocket=this.spawnInitRocket.bind(this)
    this.initGame= this.initGame.bind(this)
    this.calculateStats=this.calculateStats.bind(this)
    this.playAgain=this.playAgain.bind(this)
    this.getParentDiv=this.getParentDiv.bind(this)
    this.attachEventListener();
    
  } 
  state = { isMoving: true };

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  checkDifficultyIncrement = () => {
    if(this.state.seconds % 30 == 0){
      this.incrementDifficulty()
      this.setState({level:this.state.level +1})
      console.log("current wpm: " + this.state.wpm)
    }
    console.log("checking need to increment ")
  }
  tick = () => {
    this.setState({seconds:this.state.seconds + 1})
    console.log(this.state.seconds)
  }

  incrementDuration = () => {
    let prevDuration= this.state.duration
    if(prevDuration==10){
      this.setState({duration:12})
    }else if(prevDuration==12){
      this.setState({duration:11})
    }else if( prevDuration==11){
      this.setState({duration:10})
    }
    return prevDuration * 1000
  }

  incrementDifficulty = () => {
     this.setState({wpm:this.state.wpm + 5,
    level:this.state.level +1 })
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

  playAgain(){
    this.setState({
    playerHasLost:false,
    currentRockets:[],
    lives:3,
    live1:"./images/games/Heart.svg", 
    live2:"./images/games/Heart.svg", 
    live3:"./images/games/Heart.svg"})
    console.log(this.rows)
  }

  spawnRocket = () => {
    // note need to account for different words
    //determine word and rowNum where we need to spawn rocket
    let AvailableWords= this.state.AvailableWords
    console.log(this.state.AvailableWords)
    let randIndex= Math.floor(Math.random()* AvailableWords.length)
    let rocketWord=AvailableWords[randIndex]

    //creates rocket and iterates over row - adds word to currentRockets 
    this.createRocket(rocketWord,this.state.rowNum,randIndex)
    this.setState({rowNum:this.state.rowNum + 1})
    this.setState({zIndex:this.state.zIndex + 1})
    // if (this.state.zIndex%5 === 0){
    //   this.setState({zIndex:this.state.zIndex + 1})
    //   console.log("level up"); 
    //   console.log(this.state.zIndex); 
    // }
    if(this.state.rowNum == 3){
      this.setState({rowNum:0})
    }
  }

  subtractLife= () =>{
    if (this.state.lives === 3){
      this.setState({live3: null})
    }else if (this.state.lives === 2){
      this.setState({live2: null})
    }else if (this.state.lives === 1){
      this.setState({live1: null})
  }
    this.setState({lives:this.state.lives -1})
    if(this.state.lives ==0){
      this.setState({playerHasLost:true})
      this.calculateStats()
      console.log(this.state.level)
      clearInterval(this.state.ref1)
      clearInterval(this.state.ref2)
    }
  }

  destroyRocket= (targetDiv) => {
    let target = document.getElementsByClassName(targetDiv)[0]
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

    setTimeout(function() {
      target.style.visibility="hidden"
      target.style.width="0vw"
      target.style.height="0vh"
      target.className= "null"
      text.textContent=""
    }, 100);
  }

  calculateStats= () =>  {
    let accuracy= Math.floor((this.state.totalCorrect/this.state.totalWordsTyped)*100)
    this.setState({playerAccuracy:accuracy})
  }
  
  
  createRocket = (word,rowNum,index,) => {

    let rocket= document.createElement('div')
    let text= document.createElement('p')
    let img= document.createElement('img')
    let parent= document.getElementsByClassName("RocketRow")
    img.src="./images/games/Meteor.svg" //need to add css to this
    img.style.width="100%"
    rocket.style.width="25vw"
    rocket.style.height="auto"
    rocket.style.zIndex=this.state.zIndex
    img.style.height="auto"
    img.style.zIndex=this.state.zIndex
    text.textContent=word
    text.style.zIndex=this.state.zIndex
    text.style.color = "white"
    text.style.fontSize = "2vw"
    text.style.textAlign = "center"
    text.style.position = "relative"
    // text.style.top = "6.5rem"
    // text.style.left = "7rem"
    text.style.top = "5vw"
    text.style.left = "5vw"


    
    rocket.className= word
    rocket.id="not-destroyed"
    rocket.appendChild(text)
    rocket.appendChild(img)
    parent[rowNum].appendChild(rocket)

    //add randomword selected to rocket words (words that are on screen currently)
    this.state.currentRockets.push(word)
    this.state.AvailableWords.splice(index,1)
    const extraRocket= styler(document.querySelector('.'+word))

    let haslostLife=false

    tween({
      from: {x:-window.innerWidth/3, y:0},

      to: { x: window.innerWidth -600, y:0},
      duration: this.incrementDuration(),

    }).start(v => {
      extraRocket.set({x:v.x})
      if(rocket.id !="destroyed" && !haslostLife && v.x >= window.innerWidth -600 ){
        this.subtractLife()
        haslostLife=true
      }
      if(v.x >= window.innerWidth -600){
        img.src="./images/games/Meteor_Crash.svg"
        setTimeout(function() {
          rocket.style.visibility="hidden"
          rocket.style.width="0vw"
          rocket.style.height="0vh"
          rocket.className= "null"
        }, 1000); // possibly change this
      }
      else if(v.x <= 0){
        img.src= "./images/games/Meteor.svg"
      } 

    });
    

  }

  initGame = () =>{
    this.spawnInitRocket(this.state.FirstWords[0],0,10)
    this.spawnInitRocket(this.state.FirstWords[1],1,12)
    this.spawnInitRocket(this.state.FirstWords[2],2,11)
  }

  getParentDiv() {
    return document.getElementsByClassName("RocketRow")
  }


  spawnInitRocket = (word, row, d) => {
    let rocket= document.createElement('div')
    let text= document.createElement('p')
    let img= document.createElement('img')
    let parent= this.getParentDiv()
    img.src="./images/games/Meteor.svg" //need to add css to this
    img.style.width="100%"
    rocket.style.width="25vw"
    rocket.style.height="auto"
    rocket.style.zIndex=this.state.zIndex
    img.style.height="auto"
    img.style.zIndex=this.state.zIndex
    text.textContent=word
    text.style.zIndex=this.state.zIndex
    text.style.color = "white"
    text.style.fontSize = "2vw"
    text.style.textAlign = "center"
    text.style.position = "relative"
    // text.style.top = "6.5rem"
    // text.style.left = "7rem"
    text.style.top = "5vw"
    text.style.left = "5vw"


    
    rocket.className= word
    rocket.id="not-destroyed"
    rocket.appendChild(text)
    rocket.appendChild(img)
    parent[row].appendChild(rocket)

    //add randomword selected to rocket words (words that are on screen currently)
    this.state.currentRockets.push(word)
    const extraRocket= styler(document.querySelector('.'+word))
    let haslostLife=false

    tween({
      from: {x:-window.innerWidth/3, y:0},

      to: { x: window.innerWidth -600, y:0},
      duration:d *100,

    }).start(v => {
      extraRocket.set({x:v.x})
      if(rocket.id !="destroyed" && !haslostLife && v.x >= window.innerWidth -600 ){
        this.subtractLife()
        haslostLife=true
      }
      if(v.x >= window.innerWidth -600){
        img.src="./images/games/Meteor_Crash.svg"
        setTimeout(function() {
          rocket.style.visibility="hidden"
          rocket.style.width="0vw"
          rocket.style.height="0vh"
          rocket.className= "null"
        }, 1000); // possibly change this
      }
      else if(v.x <= 0){
        img.src= "./images/games/Meteor.svg"
      } 

    });
    
  }

  

  registerUserKeyPress = ({ key: keyPressed }) => {
    if(this.state.startPeriod){
      this.setState({startPresses:this.state.startPresses +1})
      if(this.state.startPresses==3){
        this.setState({startPeriod:false})
        this.setState({
          ref1:setInterval(this.tick,1000),
          ref2:setInterval(this.checkDifficultyIncrement, 1000),
        })
        this.spawnRocket()
        this.spawnRocket()
        this.spawnRocket()
      }
    }else if (keyPressed == BACKSPACE){
        this.setState({inputWord:this.state.inputWord.slice(0, -1)})
    //special inputs
    } else if (keyPressed == SHIFT){
      this.setState({inputWord:this.state.inputWord})
    } else if (keyPressed == META){
      this.setState({inputWord:this.state.inputWord})
    } else if (keyPressed == CONTROL){
      this.setState({inputWord:this.state.inputWord})
    } else if (keyPressed == TAB){
      this.setState({inputWord:this.state.inputWord})
      
    } else if (keyPressed == ENTER){
      this.setState({totalWordsTyped:this.state.totalWordsTyped + 1})

      if (this.doesWordExist(this.state.inputWord)) {
        this.destroyRocket(this.state.inputWord)
        this.setState({totalCorrect: this.state.totalCorrect + 1})
        setTimeout(this.spawnRocket(),this.state.wpm/60 )//make this variable time either delay it or use setinterval
        
      }      
      this.setState({inputWord:''})
    }
    else {
      this.setState({nextWordUpdate: true});
      this.setState({inputWord:this.state.inputWord + keyPressed})
    }

  }

  render() {
    const { currentList } = this.state;
    const { live1 } = this.state;
    const { live2 } = this.state;
    const { live3 } = this.state;

    const { 
      headerLinks,
      wordList, 
    } = this.state;

    if(!this.state.playerHasLost){

    return (
      <SpaceRaceBackground>
        <Header links={headerLinks} isLoggedIn={false} username={"test"}/>
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
    }else{
     return( <Statistics data={this.state} reset={this.playAgain}/>)
    }
      // <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/>
  }
}

const SpaceRaceGame = withRouter(SpaceraceGame)

export default (SpaceraceGame);