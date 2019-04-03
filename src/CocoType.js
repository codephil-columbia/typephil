import React, { Component } from 'react';
import Header from './components/header'
import ShowSpinner from './components/spinner';
import KeyPressTracker from './KeyTracking.js'
import './style/CocoType.css'
import styled from 'styled-components';

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  fetchLessonById
} from './actions/learn'

import { getCurrentLessonForUser } from './actions/homepage';
import { PassThrough } from 'stream';


const GameText = styled.div`
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

class CocoType extends Component {
  constructor(props) {
    super(props);
    this.typeString=this.typeString.bind(this)
    this.updateIndex=this.updateIndex.bind(this)
    this.updateString=this.updateString.bind(this)
    this.updateLevel=this.updateLevel.bind(this)
    this.back=this.back.bind(this)
    this.state ={
      headerLinks: ["Games", "Learn", "Home"],
      Time:"00:15",
      currLine:"",
      currLinenum:0,
      fullText:this.props.fullText,
      currChar:"",
      Level:1,
      Streak:0,
      indexptr:0,
      LongestStreak:0
    }
  }


  onKeyPressed = (e) => {
   let currindex= this.state.indexptr
    let isRightKey =e.key;
    if(isRightKey=="Shift"){
      console.log("Waiting for input to uppercase")
    }else if(isRightKey=="Backspace"){
      this.setState({Streak:0})
      this.back()
    }else if(isRightKey == this.state.currChar){
      console.log(true)
      this.setState({Streak:this.state.Streak + 1})
      this.updateIndex()
    }else{
      console.log(false)
      if(this.state.LongestStreak <= this.state.Streak){
        this.setState({LongestStreak:this.state.Streak})
      }
      this.setState({Streak:0})
      this.updateIndex()
    }
  };

  updateIndex(){
    var newIndex=this.state.indexptr;
    var newIndex= newIndex +1;
    this.setState({indexptr:newIndex})
    this.setState({currChar:this.state.currLine[newIndex]})
    if(newIndex==this.state.currLine.length){
      this.updateString()
    }
    
  }
  back(){
    if(this.state.indexptr == 0){
      this.setState({currChar:this.state.currLine[0]})
    }
    var newIndex= this.state.indexptr-1
    this.setState({indexptr:newIndex, currChar:this.state.currLine[newIndex]})
  }

  updateString()
  {
    var nextLinenum = this.state.currLinenum + 1
    this.setState({currLinenum:nextLinenum, indexptr:0})
    this.typeString()
  }

  typeString(){
    var lines= this.state.fullText.split("\n")
    console.log(this.state.currLinenum)
    console.log(lines.length)
    if(this.state.currLinenum > lines.length-1){
      this.updateLevel()
    }
    var nextLine= lines[this.state.currLinenum].trim()
    this.setState({currLine:nextLine,currChar:nextLine[this.state.indexptr]})
  };

  updateLevel(){
    
  }

  componentDidMount() {
    this.typeString()
    document.addEventListener('keydown', this.onKeyPressed);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyPressed);
  }

  render() {
    const { 
      isLoading, 
    } = this.props;
    
    
    if(isLoading) {
      return <ShowSpinner />
    } 

    const { 
      headerLinks, 
    } = this.state;
      return (
        <div>
          
        </div>
    )
  }
}


export default (CocoType);