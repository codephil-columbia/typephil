import React, { Component } from "react";
import Button from 'react-button-component'
import styled from 'styled-components';
import Header from './components/header'
import Tutorial from './ExamTracking'
import Stats from './ExamStats'
import { Connect, connect } from 'react-redux';
import { tween, styler } from 'popmotion';
import { bindActionCreators } from 'redux';
import data from "./offline_data.json"


import { Route, Switch, Redirect } from 'react-router-dom'

import { 
    fetchAllChapterNames, 
    fetchAllPairs, 
    fetchCompletedLessons,
    fetchLessonById
  } from './actions/learn'
  
import { getCurrentLessonForUser } from './actions/homepage';
import GameOverSign from "./components/gameOver";

const Ready = Button.extend`
    margin-top:4vh;
    height: 82px;	
    width: 270px;	
    border: 5px solid #F5A623;	
    border-radius: 10px;	
    background-color: #FFFFFF;
    font-size:30px;
`

class ExamPage extends Component{
    constructor(props){
        super(props);
        this.initiate=this.initiate.bind(this)
        this.beginGames=this.beginGames.bind(this)
        this.endGames=this.endGames.bind(this)
        this.exitMainPage=this.exitMainPage.bind(this)
        this.totalTime=this.totalTime.bind(this)
        this.showStatspage=this.showStatspage.bind(this)
        this.parse=this.parse.bind(this)
        this.cleanContent=this.cleanContent.bind(this)
        this.exitGame=this.exitGame.bind(this)
        this.playAgain=this.playAgain.bind(this)
        this.addText=this.addText.bind(this)
        this.setInitContent=this.setInitContent.bind(this)
        this.state={
            isPlayerReady:false,
            beginCountDown:false,
            totalWords:100,
            totalMinutes:0,
            wordsPerMinute:0,
            content:"",
            accuracy:0,
            gameStart:true,
            playerPlace:0,
            inputOff:false,
            words:0,
            headerLinks: ["Games", "Learn", "Home"],
        };
    }



  componentWillMount = () => {
    // fetch("http://localhost:5000/game/boatrace")
    // .then(results => {
    //     return results.json()
    // })
    // .then(data => {
    //    let randIndex= Math.floor(Math.random() * data.length)
    //    console.log(data.length)
    //    for (let i=0;i<data.length;i++){
    //        let content=this.parse(data[i].Txt)
    //        console.log(content)
    //    }
    // })

    //enable this for prev settings
    // console.log(data.games.boatrace)

        let shuffle = require('shuffle-array')
        let fullcontent = ""
        let jsonData= data.games.boatrace
        shuffle(jsonData)
        for (let i=0;i<jsonData.length;i++){
            let content=this.parse(jsonData[i])
            fullcontent+=content 
        }
        this.setInitContent(fullcontent)
    };
  

    exitMainPage(difficulty){
        this.setState({
            showMainPage:false,
            isPlayerReady:true,
            gameStart:true,
        })
        
    }

    cleanContent(content){
        return content.replace(/(?:\r\n|\r|\n|\\n)/g, '').replace("\"\\n\"","")
    }

    setInitContent(fullContent){
        this.setState({
            content:fullContent
        })
    }

    parse(response){
        let currPhrase=""
        let textArray=[]
        let origin=0
        let pointer=0
        //Finds Title
        while(response[pointer]+ response[pointer+1]!="\\n"){
            pointer+=1
        }
        currPhrase=response.slice(origin, pointer);
        textArray.push(currPhrase.trim()+"\\n")
        currPhrase=""
        origin=pointer+2
        let content= response.slice(origin,)
        origin=0
        pointer=35

        
        //removes new line characters
        content=this.cleanContent(content)
        while(pointer<content.length){
            let currChar=content[pointer]
            if ( currChar == "." || currChar =="?" || currChar=="!"){
                pointer+=2
                currPhrase=content.slice(origin,pointer)
                textArray.push(currPhrase)
            }else if( currChar == " "){
                pointer+=1
                currPhrase=content.slice(origin,pointer)
                textArray.push(currPhrase)
            }else{
                while(content[pointer] !=" "){
                    pointer-=1
                }
                pointer+=1
                currPhrase=content.slice(origin,pointer)
                textArray.push(currPhrase)
            }
            origin=pointer
            pointer+=35
            currPhrase=""
        }
        textArray.push(content.slice(origin,content.length))
        let finalstr=textArray[0]
        for(let i=1;i<textArray.length;i++){
            finalstr+=textArray[i] +"\\n"
        }
        console.log("parsed string")
        console.log(finalstr)
        return finalstr
    }
    

    initiate(){
        this.setState({
            isPlayerReady:true,
            beginCountDown:true
        })
    }
    
    totalTime(time){
        var minutes=time/60
        this.setState({totalMinutes:minutes})
    }
    
    beginGames(){
        this.setState({
            beginCountDown:false,
            playerHasLost:false,
            isPlayerReady:false,
            gameStart:true
        })
    }

    endGames= (state, time) =>{
        var minutes=this.props.time
        var totalChars= state.incorrect.length + state.correct.length   
        var playerAccuracy= Math.floor((1- state.incorrect.length/totalChars)*100)
        var wpm = Math.floor(totalChars/(5*minutes))
        var wordsTyped = wpm * minutes
        console.log(minutes)
        this.setState({
            inputOff:true,
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
            accuracy:playerAccuracy,
            wordsPerMinute:wpm,
            words:wordsTyped
        })
    
    }

    showStatspage= () => {
        this.setState({
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
        })

    }

    addText = () => {
        let randIndex= Math.floor(Math.random() * data.games.boatrace.length)
        console.log("new content")
        console.log(data.games.boatrace[randIndex])
        this.setInitContent(data.games.boatrace[randIndex])
    }

    playAgain(){
        
        this.setState({
            isPlayerReady:false,
            beginCountDown:false,
            playerHasLost:false,
            totalMinutes:0,
            wordsPerMinute:0,
            content:"",
            accuracy:0,
            gameStart:true,
            inputOff:false,
        })
        this.componentWillMount()
    }
    exitGame = () =>{
        console.log("exit pressed")
        console.log(this.props)
        this.props.history.push("/exam")
      }
    
    render(){ 
        const { 
            headerLinks,
            content
          } = this.state;
    console.log(this.state.totalWords)
 
         // this == event, in this cases
        if(this.state.gameStart){
            return(
            <div>
                <Header links={headerLinks}></Header>
                <Tutorial playerHasLost={this.endGames} insertText={this.addText} inputOff={this.state.inputOff} countTime={this.totalTime} time={this.props.time} currentContent={content}/>
            </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats data={this.state} exit={this.props.exit} reset={this.playAgain}/>)
        }
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
      fetchAllChapterNames, 
      fetchAllPairs, 
      fetchCompletedLessons,
      fetchLessonById,
      getCurrentLessonForUser
    }, dispatch);
  }
  
  const mapStateToProps = ({ app, auth }) => {
    return {
      allChapters: app.allChapters,
      isLoading: app.isLoading,
      chapterLessonPairs: app.chapterLessonPairs,
      completedLessons: app.completedLessons,
      currentUser: auth.currentUser,
      isLoggedIn: auth.isLoggedIn,
      currentLessonName: app.currentLesson.lessonName
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ExamPage);