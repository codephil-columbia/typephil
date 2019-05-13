import React from 'react';
import { bindActionCreators } from 'redux';
import ReactDOM from 'react-dom';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import { tween } from 'popmotion';
import { styler } from 'popmotion';
import Tracker from "./RacecarTracking"; 
import styled from 'styled-components'; 


import './style/spacerace.css';

const BACKSPACE = "Backspace";
const ENTER = "Enter";

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
  background-color: #25365A;

`

const charPoses = {
  exit: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    delay: ({ charIndex }) => charIndex * 30
  }
};

function App() {
  return (
    <div className="container">
      <SplitText initialPose="exit" pose="enter" charPoses={charPoses}>
        React Pose Text
      </SplitText>
    </div>
  );
}

class SpaceraceGame extends React.Component {
  constructor(props) {
    super(props);

    this.doesWordExist = this.doesWordExist.bind(this)
    this.nextWord = this.nextWord.bind(this)
    //this.isCorrect = this.isCorrect.bind(this)


    const wordList = ["hi", "hello", "yay", "wow", "word", "mehhh", "iliana", "sang", "matt", "cesar", "ehi", "i", "hate", "saddness"]
    const wordList1 =  wordList.slice(0, Math.floor(wordList.length/3));
    const wordList2 = wordList.slice(Math.floor(wordList.length/3), Math.floor(wordList.length/3 * 2));
    const wordList3 = wordList.slice(Math.floor(wordList.length/3 * 2), Math.floor(wordList.length));

    const currentList = [wordList1[0], wordList2[0], wordList3[0]];

    this.state = {
      currentList,
      wordList,
      wordList1,
      wordList2,
      wordList3,
      wordMap:{}, 
      currentWord: "",
      currentWordList: ["hi", "hello", "wow"],
      inputWord: "", 
      isCorrect1: "./images/games/Meteor.svg", 
      isCorrect2: "./images/games/Meteor.svg", 
      isCorrect3: "./images/games/Meteor.svg", 
      nextWordUpdate: false,
      i: 0, 
      j: 0, 
      k: 0
    }

    this.attachEventListener();
  } 

  state = { isMoving: true };

  componentDidMount() {
    const Box = styler(document.querySelector('.box'));
    const Box2 = styler(document.querySelector('.box2'));
    const Box3 = styler(document.querySelector('.box3'));

    tween({
      from: {x:-2000, y:-250},

      to: { x: 1000, y:-250},
      duration: 8000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 10000000,
      // yoyo: 5
    }).start(Box.set);

    tween({
      from: {x:-3000, y: -25},

      to: { x: 1000, y: -25},
      duration: 10000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 10000000,
      // yoyo: 5
    }).start(Box2.set);

    tween({
      from: {x:-1000, y:200},

      to: { x: 1000, y:200 },
      duration: 12000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 10000000,
      // yoyo: 5
    }).start(Box3.set);

    setInterval(() => {
      this.setState({ isMoving: !this.state.isMoving });
    }, 2000);
  }

  doesWordExist = checkWord => { 
    let whichList = null;
    let wasFound = false;

    if (this.state.wordList1.includes(checkWord)) {
      whichList = 0;
      wasFound = true
      this.setState({isCorrect1:"./images/games/Meteor_Crash.svg"}); 
      
    } else if (this.state.wordList2.includes(checkWord)) {
      whichList = 1;
      wasFound = true
      this.setState({isCorrect2:"./images/games/Meteor_Crash.svg"});

    }
    else if (this.state.wordList3.includes(checkWord)) {
      whichList = 2;
      wasFound = true
      this.setState({isCorrect3:"./images/games/Meteor_Crash.svg"}); 
    }
    return { whichList, wasFound };
  }

  attachEventListener = () => {
    document.addEventListener("keydown", this.registerUserKeyPress);
  }

  
  nextWord(n) {
    let newIndex;
    let newWord;
    console.log(this.state.i)
   // console.log(this.state.j)
  //  console.log(this.state.k)

    if (n === 0) {
      
      if (this.state.i >= this.state.wordList1.length-1){
        newIndex = 0;
      } else{
        newIndex = this.state.i + 1; 
      }
      this.setState({i: newIndex})
      newWord = this.state.wordList1[newIndex];
    } else if (n === 1) {
      newIndex = this.state.j + 1;
      if (this.state.j >= this.state.wordList2.length-1){
        newIndex = 0;
      } else{
        newIndex = this.state.j + 1;
      }
      this.setState({j: newIndex})
      newWord = this.state.wordList2[newIndex];
    } else if (n === 2){
      newIndex = this.state.k + 1;
      if (this.state.k >= this.state.wordList3.length-1){
        newIndex = 0;
      } else{
        newIndex = this.state.k + 1;
      }
      this.setState({k: newIndex})
      newWord = this.state.wordList3[newIndex];
    } 

    let { currentList } = this.state;
    currentList[n] = newWord;
    
    this.setState({ currentList });
  }
  /*
  isCorrect = () => {
    if (this.state.isCorrect == true) {
      return "./images/games/Meteor_Crash.svg"
    }
    
    return "./images/games/Meteor.svg"
    


  }
  */
  nextWordUpdate = () => {

    return this.state.nextWordUpdate; 
    //if (this.state.isCorrect == false)
     // return "./images/games/Meteor.svg"
   // return "./images/games/Meteor_Crash.svg"


  }

  registerUserKeyPress = ({ key: keyPressed }) => {
    this.setState({isCorrect1:"./images/games/Meteor.svg"}); 
    this.setState({isCorrect2:"./images/games/Meteor.svg"}); 
    this.setState({isCorrect3:"./images/games/Meteor.svg"}); 
    
    if (keyPressed == BACKSPACE){
        this.setState({inputWord:this.state.inputWord.slice(0, -1)})
    } else if (keyPressed == ENTER){
      const { whichList, wasFound } = this.doesWordExist(this.state.inputWord);
      if (wasFound) {
        console.log("i am in")
        console.log(whichList)
        this.nextWord(whichList);
      }

      
      this.setState({inputWord:''})
    }
    else {
      this.setState({nextWordUpdate: true});
      this.setState({inputWord:this.state.inputWord + keyPressed})
    }
    //this.setState({isCorrect1:"./images/games/Meteor.svg"}); 
    //this.setState({isCorrect2:"./images/games/Meteor.svg"}); 
   // this.setState({isCorrect3:"./images/games/Meteor.svg"}); 
  }

  render() {
    const { currentList } = this.state;
    const { isCorrect1 } = this.state;
    const { isCorrect2 } = this.state;
    const { isCorrect3 } = this.state;
    console.log(currentList);
    return (
      <SpaceRaceBackground>
        <SpaceRaceInputText>
          {this.state.inputWord}
        </SpaceRaceInputText>

        <div className="box"><p style={{zIndex:2}}>{currentList[0]}</p>
          <img height="auto" width="100%" src={isCorrect1}/>
        </div>

        <div className="box2"><p style={{zIndex:2}}>{currentList[1]}</p>
          <img height="auto" width="100%" src={isCorrect2}/>
        </div>

        <div className="box3"><p style={{zIndex:2}}>{currentList[2]}</p>
          <img height="auto" width="100%" src={isCorrect3}/>
        </div>
      </SpaceRaceBackground>
    );
  }
}

export default (SpaceraceGame);