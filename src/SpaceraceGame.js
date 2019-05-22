import React from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import { tween, styler } from 'popmotion';
import styled from 'styled-components'; 
import Header from './components/header'


import './style/animation.css';

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

`


const RocketContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`


class SpaceraceGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLinks: ["Games", "Learn", "Home"],
      AvailableWords:["wow", "word", "mehhh", "iliana", "sang", "matt", "cesar", "ehi", "i", "hate", "saddness"],
      FirstWords:["hi", "hello", "yay"],
      currentRockets:[],
      rowNum:0,
      currentWordList: ["hi", "hello", "wow"],
      inputWord: "", 
      zIndex:0,
      lives:3,
      playerHasLost:false
    }

    this.doesWordExist = this.doesWordExist.bind(this)
    this.spawnRocket=this.spawnRocket.bind(this)
    this.destroyRocket=this.destroyRocket.bind(this)
    this.subtractLife=this.subtractLife.bind(this)
    this.attachEventListener();
  } 
  state = { isMoving: true };

  componentDidMount() {
    //creates first three rockets
    let word1=this.state.FirstWords[0]
    let word2=this.state.FirstWords[1]
    let word3=this.state.FirstWords[2]
    this.createRocket(word1,0)
    this.createRocket(word2,1)
    this.createRocket(word3,2)
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
    if(this.state.rowNum == 3){
      this.setState({rowNum:0})
    }
  }

  subtractLife= () =>{
    this.setState({lives:this.state.lives -1})
    if(this.state.lives ==0){
      this.setState({playerHasLost:true})
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
    }, 500);
  }

  
  createRocket = (word,rowNum,index,) => {

    let rocket= document.createElement('div')
    let text= document.createElement('p')
    let img= document.createElement('img')
    let parent= document.getElementsByClassName("RocketRow")
    img.src="./images/games/Meteor.svg" //need to add css to this
    img.style.width="100%"
    rocket.style.width="15vw"
    rocket.style.height="auto"
    rocket.style.zIndex=this.state.zIndex
    img.style.height="auto"
    img.style.zIndex=this.state.zIndex
    text.textContent=word
    text.style.zIndex=this.state.zIndex
    rocket.className= word
    rocket.id="not-destroyed"
    rocket.appendChild(text)
    rocket.appendChild(img)
    parent[rowNum].appendChild(rocket)

    //add randomword selected to rocket words (words that are on screen currently)
    this.state.currentRockets.push(word)
    this.state.AvailableWords.splice(index,1)
    
    const extraRocket= styler(document.querySelector('.'+word))
    let randDuration= Math.floor(10000 +  (Math.random() * (18000-10000)))
    let haslostLife=false
    tween({
      from: {x:-window.innerWidth/3, y:0},

      to: { x: window.innerWidth -400, y:0},
      duration: randDuration,

    }).start(v => {

      extraRocket.set({x:v.x})
      if(rocket.id !="destroyed" && !haslostLife && v.x >= window.innerWidth -500 ){
        this.subtractLife()
        haslostLife=true
      }
      if(v.x >= window.innerWidth -500){
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
    if (keyPressed == BACKSPACE){
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
      
      if (this.doesWordExist(this.state.inputWord)) {
        this.destroyRocket(this.state.inputWord)
        this.spawnRocket() //make this variable time either delay it or use setinterval
        
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

    //console.log(currentList);
    const { 
      headerLinks,
      wordList, 
    } = this.state;

    if(!this.state.playerHasLost){
    return (
      <SpaceRaceBackground>
        <Header links={headerLinks} isLoggedIn={false} username={"test"}/>
      <RocketContainer>
        <RocketRow className="RocketRow">
        </RocketRow>

        <RocketRow className="RocketRow">
        </RocketRow>

        <RocketRow className="RocketRow">
        </RocketRow>
        
        <SpaceRaceInputText>
          {this.state.inputWord}
        </SpaceRaceInputText>
      </RocketContainer>

      </SpaceRaceBackground>
    );
    }else{
     return( <div>insert stats page here</div>)
    }
      // <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/>
  }
}

export default (SpaceraceGame);