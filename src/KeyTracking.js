import React, { Component } from "react";

import Header from './components/header'
import Tutorial from './GameTracking'
import Stats from './Statistics'
import MainPage from './Challenge'
import data from "./offline_data.json"
import GameOverSign from './components/GameOverSign'

import { LocalStorageCache, GameService } from "./services";

import "./style/KeyTracking.css"

class KeyTracking extends Component{
  constructor(props){
    super(props);

    this.cache = new LocalStorageCache();
    this.gameService = new GameService();

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
      headerLinks: ["Stats", "Games", "Learn", "Home"],
      showSign:false,
      jsonArray:[],
      dataArray:[]
    };

    this.endGames = this.endGames.bind(this);
    this.exitMainPage = this.exitMainPage.bind(this);
    this.incrementDifficulty = this.incrementDifficulty.bind(this);
    this.totalTime = this.totalTime.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  exitMainPage = (difficulty) => {
    let diffString = difficulty
    let diffNum = 1

    if(diffString === "easy"){
      diffNum = 1
    }
    else if(diffString === "medium"){
      diffNum = 2
    }
    else{
      diffNum = 3
    }

    this.setState({
      showMainPage:false,
      gameStart:true,
      isPlayerReady:true,
      playerDifficulty:diffNum
    });
  }

  incrementDifficulty = () => {
    this.setState({playerDifficulty:this.state.playerDifficulty + 1})
  }
  
  totalTime = (time) => {
    let minutes = time/60
    this.setState({totalMinutes:minutes})
  }
  


  endGames = async (state, time) => {
    let minutes = time/60
    let totalChars = state.incorrect.length + state.correct.length   
    let playerAccuracy = Math.floor((1- state.incorrect.length/totalChars)*100)
    let wpm = Math.floor(totalChars/(5*minutes))
    this.setState({showSign:true,inputOff:true})

    await this.gameService.addGameScoreAndUpdateIfHigher(
      this.cache.get('uid'),
      GameService.Games.CHALLENGE,
      { wpm, accuracy:playerAccuracy, level:this.state.playerDifficulty }
    );

    setTimeout(() => {
      this.setState({
        playerHasLost:true,
        isPlayerReady:false,
        gameStart:false,
        accuracy:playerAccuracy,
        wordsPerMinute:wpm
      })
    }, 6000);
  }

  playAgain = () => {
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
    showSign:false
  })
  }

  render(){
    let cleanContent = ""
    for(let i =0;i<data.games.challenge.length; i++){
        let string = data.games.challenge[i]
        cleanContent = cleanContent + string +"\n"
    }

    if (this.state.showMainPage){
      return <MainPage commenceGame={this.exitMainPage} onLogout={this.props.onLogout} history={this.props.history} />;
    } else if (this.state.gameStart){
        return(
          <div className="challenge-game-background">
            {this.state.showSign && <GameOverSign/>}
            <Header 
              links={this.state.headerLinks} 
              isLoggedIn={true} 
              username={this.state.username}
              history={this.props.history}
              onLogout={this.props.onLogout} 
            >
            </Header>
            <Tutorial 
              playerHasLost={this.endGames} 
              inputOff={this.state.inputOff} 
              incrementDifficulty={this.incrementDifficulty} 
              countTime={this.totalTime} 
              difficulty={this.state.playerDifficulty} 
              currentContent={cleanContent}
            />
          </div>
        )
    } else if (this.state.playerHasLost){
        return (
          <Stats 
            data={this.state} 
            exit={this.props.exit} 
            reset={this.playAgain} 
            onLogout={this.props.onLogout} 
            history={this.props.history}>
          </Stats>
        );
    }
  }
}

export default KeyTracking;