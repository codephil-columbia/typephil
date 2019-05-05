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
    this.doesWordExist=this.doesWordExist.bind(this)
    this.nextWord=this.nextWord.bind(this)
    this.isCorrect=this.isCorrect.bind(this)
    this.nextWordUpdate = this.nextWordUpdate.bind(this)


    this.state = {
        wordList:["hi", "hello", "yay", "wow", "word", "mehhh", "wowword"], 
        wordMap:{}, 
        currentWord: "", 
        isCorrect: "./images/games/Meteor.svg", 
        nextWordUpdate: false 
    }
    this.setState({
      wordList: ["hi", "hello", "yay", "wow", "word", "mehhh", "wowword"], 
      currentWordMap: this.state.wordList.map((word) => word)
    })

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
      loop: 5,
      // yoyo: 5
    }).start(Box.set);

    tween({
      from: {x:-3000, y: -25},

      to: { x: 1000, y: -25},
      duration: 10000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 5,
      // yoyo: 5
    }).start(Box2.set);

    tween({
      from: {x:-1000, y:200},

      to: { x: 1000, y:200 },
      duration: 12000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 5,
      // yoyo: 5
    }).start(Box3.set);

    setInterval(() => {
      this.setState({ isMoving: !this.state.isMoving });
    }, 2000);
  }

  doesWordExist = (checkWord) => {
    console.log(this.state.wordList.includes(checkWord))
    return this.state.wordList.includes(checkWord)
  }

  attachEventListener = () => {
    document.addEventListener("keydown", this.registerUserKeyPress);
  }

  nextWord(){
    var random = Math.random() * this.state.wordList.length
    console.log(Math.floor(random))
    console.log(this.state.wordList[Math.floor(random)])
    return this.state.wordList[Math.floor(random)]

  }

  isCorrect = () => {
    //if (this.state.isCorrect == false)
     // return "./images/games/Meteor.svg"
   // return "./images/games/Meteor_Crash.svg"


  }
  nextWordUpdate = () => {

    return this.state.nextWordUpdate; 
    //if (this.state.isCorrect == false)
     // return "./images/games/Meteor.svg"
   // return "./images/games/Meteor_Crash.svg"


  }

  registerUserKeyPress = ({ key: keyPressed }) => {
    // Starts timer once user presses first key
    // if(this.state.isFirstCharacter) {
    //   this.setState({ startTime: Date.now(), isFirstCharacter: false });
    // }

    //console.log(keyPressed) 
    console.log(this.state.currentWord)
    if (keyPressed == BACKSPACE){

        this.setState({currentWord:this.state.currentWord.slice(0, -1)})
        //this.state.currentWord= this.state.currentWord.slice(0, -1)
    }

    else if (keyPressed == ENTER){
        //this.state.currentWord= this.state.currentWord + ' '

        if (this.doesWordExist(this.state.currentWord)){
          this.setState({isCorrect:"./images/games/Meteor_Crash.svg"}); 
        }
        this.setState({isCorrect:"./images/games/Meteor.svg"}); 
        this.setState({nextWordUpdate: true});
        this.setState({nextWordUpdate: false});
        //for(let i = 0; i < this.state.currentWord.length; i++){
           // this.state.currentWord= this.state.currentWord.slice(0, -1)
            
       //}
       var empty = ''
       this.setState({currentWord:''})

    }
    else {
        this.setState({currentWord:this.state.currentWord + keyPressed})
    }
    //console.log(this.state.currentWord)

    // if(keyPressed === BACKSPACE) {
    //   this.userDidPressBackspace();
    //   // TODO: Make sure this doesn't fire after group and index ptr have reached the end
    // } else if(this.shouldCheckKey(keyPressed) && this.isNotFinished()) {
    //   this.validateUserKeyPressCorrectness(keyPressed);
    // }
    }

    shouldComponentUpdate(nextProps, nextState) {
      console.log(this.nextWordUpdate())
      return this.nextWordUpdate(); 
    }

  render() {
    //const { isMoving } = this.state;
    return (
      // <Box className="box" pose={isMoving ? 'left' : 'right'}> 
        // Hi <img height="42" width="42" src="./Meteor2.svg"/>
      // </Box>
      <div>
      <div><p>{this.state.currentWord}</p></div>

      <div className="box"><p style={{zIndex:2}}>{this.nextWord()}</p>
      <img height="auto" width="100%" src={this.state.isCorrect}/>
      </div>

      <div className="box2"><p style={{zIndex:2}}>{this.nextWord()}</p>
      <img height="auto" width="100%" src="./images/games/Meteor.svg"/>
      </div>

      <div className="box3"><p style={{zIndex:2}}>{this.nextWord()}</p>
      <img height="auto" width="100%" src="./images/games/Meteor.svg"/>
      </div>
      </div>
    );
  }
}

export default (SpaceraceGame);