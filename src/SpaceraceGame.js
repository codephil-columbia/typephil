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
    width100vw;
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

    this.state = { 
      headerLinks: ["Games", "Learn", "Home"],
      BoxOpacity1:1
    }
    this.doesWordExist = this.doesWordExist.bind(this)
    this.nextWord = this.nextWord.bind(this)
    this.spawnRocket=this.spawnRocket.bind(this)
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
      BoxOpacity1:1,
      wordMap:{},
      Windowidth:0, 
      currentWord: 0.0,
      currentWordList: ["hi", "hello", "wow"],
      inputWord: "", 
      isCorrect1: "./images/games/Meteor.svg", 
      isCorrect2: "./images/games/Meteor.svg", 
      isCorrect3: "./images/games/Meteor.svg", 
      nextWordUpdate: false,
      i: 0, 
      j: 0, 
      k: 0, 
      isEnd1:false, 
      isStart1:true,
      isEnd2:false, 
      isStart2:true,
      isEnd3:false, 
      isStart3:true,

    }

    this.attachEventListener();
  } 

  state = { isMoving: true };

  componentDidMount() {
    this.setState({Windowidth: window.innerWidth});
    console.log(window.innerWidth)
    const Box = styler(document.querySelector('.box'));
    //const Box2 = styler(document.querySelector('.box2'));
    //const Box3 = styler(document.querySelector('.box3'));
    
    let k = 0; 
    tween({
      from: {x:-window.innerWidth/2 -100, y:0},

      to: { x: window.innerWidth/2 -350, y:0},
      duration: 10000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 10000000,
      // yoyo: 5
    }).start(v => {
      console.log(v)
      Box.set({x:v.x})
      if(v.x >= 500){

       this.isEnd1(); 
       if (k === 0){
        this.nextWord(0);
       }
       k = k+1 
      }
      else if(v.x <= 0){
        this.isStart1(); 
        k = 0; 
      }
      
    })

    // //.start(Box.set,v => {console.log()});
    // let k2 = 0; 
    // tween({
    //   from: {x:-window.innerWidth/2 -100, y:0},

    //   to: { x: window.innerWidth/2 -350, y:0},
    //   duration: 10000,
    //   //flip: Infinity,
    //   // elapsed: 500,
    //   loop: 10000000,
    //   // yoyo: 5
    // }).start(v => {
    //   Box2.set({x:v.x})
    //   if(v.x >= 500){
    //    //this.setState({isEnd:true})
    //    this.isEnd2(); 
    //    //console.log(k2)
    //    if (k2 === 0){
    //     this.nextWord(1);
    //    }
    //    k2 = k2 + 1; 
    //    console.log(k2)


    //   }
    //   else if(v.x <= 0){
    //     this.isStart2();
    //     k2=0
         

    //   }
      
    // })

    // tween({
    //   from: {x:-window.innerWidth/2 -100, y:0},

    //   to: { x: window.innerWidth/2 -350, y:0},
    //   duration: 12000,
    //   //flip: Infinity,
    //   // elapsed: 500,
    //   loop: 10000000,
    //   // yoyo: 5
    // }).start(v => {
    //   Box3.set({x:v.x})
    //   if(v.x >= 500){
    //    //this.setState({isEnd:true})
    //    this.isEnd3(); 
      
    //    //this.isEnd; 


    //   }
    //   else if(v.x <= 0){
    //     this.isStart3(); 
    //   }
      
    // })

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
  isEnd1 = () => {

    this.setState({isCorrect1:"./images/games/Meteor_Crash.svg"});
    //something that keeps track of lives
  }
  isStart1 = () => {

    this.setState({isCorrect1:"./images/games/Meteor.svg"});
    
  }

  //middle rocket 
  isEnd2 = () => {

    this.setState({isCorrect2:"./images/games/Meteor_Crash.svg"});
    
    //something that keeps track of lives
  }
  isStart2 = () => {

    this.setState({isCorrect2:"./images/games/Meteor.svg"});
    
  }
  //bottom rocket 
  isEnd3 = () => {

    this.setState({isCorrect3:"./images/games/Meteor_Crash.svg"});
    //something that keeps track of lives
  }
  isStart3 = () => {

    this.setState({isCorrect3:"./images/games/Meteor.svg"});
    
  }

  spawnRocket = (word,rowNum) => {
    let rocket= document.createElement('div')
    let text= document.createElement('p')
    let img= document.createElement('img')
    img.src=this.state.isCorrect2 //need to add css to this
    text.textContent=word
    rocket.className= word
    rocket.appendChild(text)
    rocket.appendChild(img)
    let parent= document.getElementsByClassName("RocketRow")
    console.log(parent)
    parent[rowNum].appendChild(rocket)
    const extraRocket= styler(document.querySelector('.'+word))
    tween({
      from: {x:-window.innerWidth/2 -100, y:0},

      to: { x: window.innerWidth/2 -350, y:0},
      duration: 10000,
      //flip: Infinity,
      // elapsed: 500,
      loop: 10000000,
      // yoyo: 5
    }).start(extraRocket.set)

  }



  registerUserKeyPress = ({ key: keyPressed }) => {
    //this.setState({isCorrect1:"./images/games/Meteor.svg"}); 
    //this.setState({isCorrect2:"./images/games/Meteor.svg"}); 
    //this.setState({isCorrect3:"./images/games/Meteor.svg"}); 
    
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
        console.log(whichList)
        this.nextWord(whichList);
      }
      this.spawnRocket('target',1)
      
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
    const { 
      headerLinks, 
    } = this.state;

    return (
      <SpaceRaceBackground>
        <Header links={headerLinks} isLoggedIn={false} username={"test"}/>
      <RocketContainer>
        <RocketRow className="RocketRow">
          <Rocket>
            <div className="box"style={{height:"25vh"}}><p>{currentList[0]}</p>
              <img height="auto" width="100%" src={isCorrect1}/>
            </div>
          </Rocket>
        </RocketRow>

        <RocketRow className="RocketRow">
          <Rocket>
            <div className="box2"style={{height:"25vh"}}><p>{currentList[1]}</p>
              <img height="auto" width="100%" src={isCorrect2}/>
            </div>
          </Rocket>
        </RocketRow>

        <RocketRow className="RocketRow">
        <Rocket>
          <div className="box3"style={{height:"27vh"}}><p>{currentList[2]}</p>
            <img height="auto" width="100%" src={isCorrect3}/>
          </div>
        </Rocket>
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