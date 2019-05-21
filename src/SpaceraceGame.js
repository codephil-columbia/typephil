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

const Rocket = styled.div`
    opacity:${props => props.opacity};
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
      BoxOpacity1:1
    }
    this.doesWordExist = this.doesWordExist.bind(this)
    this.nextWord = this.nextWord.bind(this)
    this.spawnRocket=this.spawnRocket.bind(this)


    const wordList = ["hi", "hello", "yay", "wow", "word", "mehhh", "iliana", "sang", "matt", "cesar", "ehi", "i", "hate", "saddness"]
    const currentList = [wordList[this.state.count]];

    this.state = {
      currentList,
      wordList,
      BoxOpacity1:1,
      wordMap:{},
      Windowidth:0, 
      currentWord: 0.0,
      currentWordList: ["hi", "hello", "wow"],
      inputWord: "", 
      nextWordUpdate: false,
      i: 0, 
      j: 0, 
      k: 0, 
      isEnd1:false, 
      isStart1:true,
      count: 0
    }

    this.attachEventListener();
  } 
  state = { isMoving: true };

  componentDidMount() {
    this.spawnRocket('target1',0)
    this.spawnRocket('target2',1)
    this.spawnRocket('target3',2)
  }


  doesWordExist = checkWord => { 
    let whichList = null;
    let wasFound = false;

    if (this.state.wordList.includes(checkWord)) {
      whichList = 0;
      wasFound = true
      this.setState({isCorrect1:"./images/games/Meteor_Crash.svg"});   
    } 
   return { wasFound };
  }

  attachEventListener = () => {
    document.addEventListener("keydown", this.registerUserKeyPress);
  }

  
  nextWord(n) {
    let newIndex;
    let newWord;
    console.log(this.state.count)
    newIndex = this.state.count + 1
    newWord = this.setState({count: newIndex })
    return newWord

  }


  nextWordUpdate = () => {
    return this.state.nextWordUpdate; 
  }

  spawnRocket = (word,rowNum) => {
    let rocket= document.createElement('div')
    rocket.style.zIndex=2
    let text= document.createElement('p')
    let img= document.createElement('img')
    img.src="./images/games/Meteor.svg" //need to add css to this
    img.style.maxWidth="75%"
    img.style.height="auto"
    text.textContent=word
    rocket.className= word
    rocket.appendChild(text)
    rocket.appendChild(img)
    let parent= document.getElementsByClassName("RocketRow")
    parent[rowNum].appendChild(rocket)
    const extraRocket= styler(document.querySelector('.'+word))
    
    let randDuration= 7000 +  (Math.random() * (18000-7000))
    console.log(randDuration)

    tween({
      from: {x:-window.innerWidth/3, y:0},

      to: { x: window.innerWidth -350, y:0},
      duration: randDuration,

    }).start(v => {

      extraRocket.set({x:v.x})
      if(v.x >= window.innerWidth -400){
        img.src="./images/games/Meteor_Crash.svg"
        setTimeout(function() {
          rocket.style.visibility="hidden"
        }, 1000);
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
      const { whichList, wasFound } = this.doesWordExist(this.state.inputWord);
      if (wasFound) {
        console.log("i am in")
        //console.log(whichList)
        this.spawnRocket(this.nextWord(this.state.count),1)
        console.log(this.state.count)

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
      // <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/>
  }
}

export default (SpaceraceGame);