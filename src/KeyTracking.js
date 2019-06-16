import React, { Component } from "react";
import Button from 'react-button-component'
import styled from 'styled-components';
import Header from './components/header'
import Tutorial from './GameTracking'
import Stats from './Statistics'
import MainPage from './Challenge'
import { Connect, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router'
import data from "./offline_data.json"
import { Route, Switch, Redirect } from 'react-router-dom'
import GameOverSign from './components/gameOver'
import shuffle from 'shuffle-array';

import {LocalStorageCache} from "./services";

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
        this.cache = new LocalStorageCache();

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
            inputOff:false,
            beginningDifficulty:1,
            totalMinutes:0,
            wordsPerMinute:0,
            accuracy:0,
            gameStart:false,
            playerDifficulty:1,
            showMainPage:true,
            username: this.cache.get("username"),
            headerLinks: ["Games", "Learn", "Home"],
            showSign:false,
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
        this.setState({showSign:true,inputOff:true})
        setTimeout(()=>{
            this.setState({
                playerHasLost:true,
                isPlayerReady:false,
                gameStart:false,
                accuracy:playerAccuracy,
                wordsPerMinute:wpm
            })
        },6000)
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
        showMainPage:true,
        showSign:false})
    }

    exitGame = () =>{
        this.props.history.push("/selectGames")
      }

    render(){
    
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
				badges, 
				headerLinks, 
				username
			} = this.state; 
            
            return(
            <div className="challenge-game-background">
                {this.state.showSign && <GameOverSign/>}
                <Header links={headerLinks}></Header>
                <Tutorial playerHasLost={this.endGames} inputOff={this.state.inputOff} incrementDifficulty={this.incrementDifficulty} countTime={this.totalTime} difficulty={this.state.playerDifficulty} currentContent={cleanContent}/>
            </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats data={this.state} exit={this.props.exit} reset={this.playAgain}></Stats>)
        }
    }
}

export default KeyTracking;