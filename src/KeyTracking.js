import React, { Component } from "react";
import Button from 'react-button-component'
import styled from 'styled-components';
import ReactCountdownClock from 'react-countdown-clock'
import Header from './components/header'
import Tutorial from './GameTracking'
import Stats from './Statistics'
import "./style/KeyTracking.css"
import MainPage from './Challenge'
import { Connect, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router'
import data from "./offline_data.json"
import { Route, Switch, Redirect } from 'react-router-dom'

import { 
    fetchAllChapterNames, 
    fetchAllPairs, 
    fetchCompletedLessons,
    fetchLessonById
  } from './actions/learn'
  
import { getCurrentLessonForUser } from './actions/homepage';

const Ready = Button.extend`
    margin-top:4vh;
    height: 82px;	
    width: 270px;	
    border: 5px solid #F5A623;	
    border-radius: 10px;	
    background-color: #FFFFFF;
    font-size:30px;
`


class KeyTracking extends Component{
    constructor(props){
        super(props);
        this.initiate=this.initiate.bind(this)
        this.beginGames=this.beginGames.bind(this)
        this.endGames=this.endGames.bind(this)
        this.exitMainPage=this.exitMainPage.bind(this)
        this.incrementDifficulty=this.incrementDifficulty.bind(this)
        this.totalTime=this.totalTime.bind(this)
        this.returnMainPage=this.returnMainPage.bind(this)
        this.playAgain=this.playAgain.bind(this)
        this.exitGame=this.exitGame.bind(this)
        this.state={
            isPlayerReady:false,
            beginCountDown:false,
            beginningDifficulty:1,
            totalMinutes:0,
            wordsPerMinute:0,
            accuracy:0,
            gameStart:false,
            playerDifficulty:1,
            showMainPage:true,
            headerLinks: ["Games", "Learn", "Home"],
            jsonArray:[],
            dataArray:[]
        };

    }

    componentWillMount = () => {

        // let shuffle = require('shuffle-array')
        // let cocoContent= data.games.challenge
        // console.log(cocoContent)


      
        

        
        // fetch(data)
        // .then(results => {
        //     return results.json()
        // })
        // .then(data => {
        //    this.setState({jsonArray:shuffle(data)})
        // })
    
      };
    

    returnMainPage(){
        this.setState({showMainPage:true})
        this.componentWillMount()
    }
    exitMainPage(difficulty){
        var diffString= difficulty
        var diffNum=1

        if(diffString=="easy"){
            diffNum=1
        }
        else if(diffString=="medium"){
            diffNum=2
        }
        else{
            diffNum=3
        }
        this.setState({
            showMainPage:false,
            gameStart:true,
            isPlayerReady:true,
            playerDifficulty:diffNum
        })
    }


    incrementDifficulty(){
        this.setState({playerDifficulty:this.state.playerDifficulty + 1})
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
        var minutes=time/60
        var totalChars= state.incorrect.length + state.correct.length   
        var playerAccuracy= Math.floor((1- state.incorrect.length/totalChars)*100)
        var wpm = Math.floor(totalChars/(5*minutes))
        this.setState({
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
            accuracy:playerAccuracy,
            wordsPerMinute:wpm
        })
    }

    playAgain(){
        this.setState({
        isPlayerReady:false,
        beginCountDown:false,
        beginningDifficulty:1,
        totalMinutes:0,
        wordsPerMinute:0,
        accuracy:0,
        gameStart:false,
        playerDifficulty:1,
        showMainPage:true })
        this.props.history.push("/coco")
    }

    exitGame = () =>{
        this.props.history.push("/selectGames")
      }

    render(){
        
    let shuffle = require('shuffle-array')
    console.log(shuffle(data.games.challenge))
    let cleanContent=""
    for(var i =0;i<data.games.challenge.length; i++){
        var string = data.games.challenge[i]
        cleanContent = cleanContent + string +"\n"
    }
         // this == event, in this cases
    if(this.state.showMainPage){
        return (<MainPage commenceGame={this.exitMainPage} />)
    }else if(this.state.gameStart){
            const { 
                headerLinks,
              } = this.state;
            
            return(
            <div className="challenge-game-background">
                <Header links={headerLinks}></Header>
                <Tutorial playerHasLost={this.endGames} incrementDifficulty={this.incrementDifficulty} countTime={this.totalTime} difficulty={this.state.playerDifficulty} currentContent={cleanContent}/>
            </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats data={this.state} exit={this.exitGame} reset={this.playAgain}></Stats>)
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

  const main = withRouter(KeyTracking);
  
  export default connect(mapStateToProps, mapDispatchToProps)(KeyTracking);