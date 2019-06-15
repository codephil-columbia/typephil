import React, { Component } from "react";
import Button from 'react-button-component'
import styled from 'styled-components';
import ReactCountdownClock from 'react-countdown-clock'
import { LocalStorageCache} from "./services";

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router'

import Tutorial from './GameTracking'
import Stats from './Statistics'
import MainPage from './Challenge'
import Header from './components/header'

import "./style/KeyTracking.css"

import data from "./offline_data.json"

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
            beginningDifficulty:1,
            totalMinutes:0,
            wordsPerMinute:0,
            accuracy:0,
            gameStart:false,
            playerDifficulty:1,
            showMainPage:true,
            username: this.cache.get("username"),
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
            gameStart:false,
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
    }else if(this.state.isPlayerReady){
        {
            const { 
				badges, 
				headerLinks, 
				username
			} = this.state;
			
            return(  
                <div>
                    <Header 
                        links={headerLinks} 
                        isLoggedIn={true} 
                        username={username} 
                        history={this.props.history}
                        onLogout={this.props.onLogout}
                    />                    
                    <div className="countdown-clock-description">Starting Game In...</div>
                    <div style={{width:"100vw", height:"45vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <ReactCountdownClock className="countdown-clock" color="#52B094" seconds={3} size={300} onComplete={this.beginGames}/> 
                    </div>
                </div>

            )
        }
        }else if(this.state.gameStart){
            const { 
				badges, 
				headerLinks, 
				username
			} = this.state; 
            
            return(
            <div className="challenge-game-background">
                <Header 
                    links={headerLinks} 
                    isLoggedIn={true} 
                    username={username} 
                    history={this.props.history}
                    onLogout={this.props.onLogout}
                />   
                <Tutorial playerHasLost={this.endGames} incrementDifficulty={this.incrementDifficulty} countTime={this.totalTime} difficulty={this.state.playerDifficulty} currentContent={cleanContent}/>
            </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats data={this.state} exit={this.exitGame} reset={this.playAgain}></Stats>)
        }
    }
}

export default KeyTracking;