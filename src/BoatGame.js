import React, { Component } from "react";

import Header from './components/header'
import Tutorial from './BoatGameTracking'
import Stats from './BoatStats'
import MainPage from './BoatLevelSelect'
import GameOverSign from "./components/GameOverSign";
import data from "./offline_data.json"

import { LocalStorageCache, GameService} from "./services";

class BoatGame extends Component{
    constructor(props){
        super(props);
        this.cache = new LocalStorageCache();
        this.gameService = new GameService();

        this.state={
            isPlayerReady:false,
            beginCountDown:false,
            beginningDifficulty:1,
            showSign:false,
            totalWords:100,
            totalMinutes:0,
            wordsPerMinute:0,
            originalContent:"",
            content:"",
            accuracy:0,
            timeOutInstance:0,
            gameStart:false,
            playerPlace:0,
            playerDifficulty:1,
            inputOff:false,
            baseDifficulty:1,
            showMainPage:true,
            username: this.cache.get("username"),
            headerLinks: ["Stats" ,"Games", "Learn", "Home"],
        };

        
    }

    async recordHighScore() {
        await this.gameService.addGameScoreAndUpdateIfHigher(
          this.cache.get('uid'),
          GameService.Games.READY_SET_TYPE,
          {
            wpm:this.state.wordsPerMinute,
            accuracy:this.state.accuracy,
            level:this.state.playerDifficulty
          }
        );
      }


    componentWillMount = () => {
        let randIndex = Math.floor(Math.random() * data.games.boatrace.length)
        this.setInitContent(data.games.boatrace[randIndex])
    }

    componentWillUnmount = () => {
        clearTimeout(this.state.timeOutInstance)
    }

    exitMainPage = (difficulty) => {
        let diffString = difficulty
        let diffNum = 1

        if( diffString === "easy" ){
            diffNum = 1
        }
        else if( diffString === "medium" ){
            diffNum = 2
        }else{
            diffNum = 3
        }
        this.setLimitedContent()
        this.setState({
            showMainPage:false,
            isPlayerReady:true,
            gameStart:true,
            playerDifficulty:diffNum,
            baseDifficulty:diffNum
        })
    }

    cleanContent = (content) => {
        return content.replace(/(?:\r\n|\r|\n|\\n)/g, '').replace("\"\\n\"","")
    }

    setInitContent = (fullContent) => {
        let parsedContent = this.parse(fullContent)
        this.setState({
            originalContent:parsedContent,
            content:this.limitWords(parsedContent)
        })
    }

    parse = (response) => {
        let currPhrase = ""
        let textArray = []
        let origin = 0
        let pointer = 0
        //Finds Title
        while( response[pointer]+ response[pointer+1] !== "\\n" ){
            pointer+=1
        }
        currPhrase = response.slice(origin, pointer);
        textArray.push(currPhrase.trim()+"\\n")
        currPhrase = ""
        origin = pointer+2
        let content = response.slice(origin,)
        origin = 0
        pointer = 35

        
        //removes new line characters
        content = this.cleanContent(content)
        while( pointer < content.length ){
            let currChar = content[pointer]
            if ( currChar === "." || currChar ==="?" || currChar === "!"){
                pointer+=2
                currPhrase = content.slice(origin,pointer)
                textArray.push(currPhrase)
            }else if( currChar === " "){
                pointer+=1
                currPhrase = content.slice(origin,pointer)
                textArray.push(currPhrase)
            }else{
                while( content[pointer] !== " " ){
                    pointer-=1
                }
                pointer+=1
                currPhrase = content.slice(origin,pointer)
                textArray.push(currPhrase)
            }
            origin = pointer
            pointer+=35
            currPhrase = ""
        }
        textArray.push(content.slice(origin,content.length))
        let finalstr = textArray[0]
        for(let i=1;i<textArray.length;i++){
            finalstr+=textArray[i] +"\\n"
        }
        return finalstr
    }

    incrementDifficulty = () => {
        this.setState({playerDifficulty:this.state.playerDifficulty + 1})
    }

    setTotalWords = (wordNum) => {
        this.setState({totalWords:wordNum})
    }

    setLimitedContent = () => {
        this.setState({content:this.limitWords(this.state.originalContent)})
    }

    limitWords = (finalstr) => {
        let wordsProcessed = 0
        let currWord = ""
        let wordLimit = this.state.totalWords
        if(wordLimit !== 0){
            for(let pointer=0;pointer<finalstr.length;pointer++){
                if( finalstr[pointer] === " " ){
                    wordsProcessed+=1
                    currWord = ""
                    if( wordsProcessed === wordLimit ){
                        finalstr=finalstr.slice(0,pointer)
                        pointer-=1
                        if(finalstr[pointer] !== "." || finalstr[pointer] !== "!" || finalstr[pointer] !== "?" || finalstr[pointer] !== "\"" ){
                            let periodLastIndex = finalstr.lastIndexOf(".")
                            let qmarkLastIndex = finalstr.lastIndexOf("!")
                            let quoteLastIndex = finalstr.lastIndexOf("?")
                            let excLastIndex = finalstr.lastIndexOf("\"")
                            let endPointArray = [periodLastIndex,qmarkLastIndex,quoteLastIndex,excLastIndex]
                            let max = Math.max(...endPointArray)
                            finalstr = finalstr.slice(0,max+1)
                        }
                        return finalstr
                    }
                }
                currWord+=finalstr[pointer]
            }
        }
        return finalstr
    }
    
    totalTime = (time) => {
        let minutes=time/60
        this.setState({totalMinutes:minutes})
    }
    
    assignPlayerPlace = (position) => {
        this.setState({playerPlace:position})
    }

    initiateTimeOut = (playerAccuracy,wpm) => {
        return setTimeout(() => {
          this.setState({
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
            accuracy:playerAccuracy,
            wordsPerMinute:wpm
          })
        }, 6000);
      }

    endGames= (state, time) => {
        let minutes=time/60
        let totalChars= state.incorrect.length + state.correct.length   
        let playerAccuracy= Math.floor((1- state.incorrect.length/totalChars)*100)
        let wpm = Math.floor(totalChars/(5*minutes))
        this.setState({showSign:true,inputOff:true})
        
        this.setState({timeOutInstance:this.initiateTimeOut(playerAccuracy,wpm)})
    }

    showStatspage = () => {
        this.setState({
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
        })
    }

    playAgain = () => {
        this.setState({
        isPlayerReady:false,
        beginCountDown:false,
        beginningDifficulty:1,
        totalMinutes:0,
        wordsPerMinute:0,
        content:"",
        accuracy:0,
        gameStart:false,
        playerDifficulty:1,
        baseDifficulty:1,
        showSign:false,
        playerPlace:0,
        inputOff:false,
        showMainPage:true})
        this.componentWillMount()
    }
    
    render() { 
    let content = this.state.content
  
    if( this.state.showMainPage ){
        return (
            <MainPage 
                setWords={this.setTotalWords} 
                commenceGame={this.exitMainPage} 
                history={this.props.history}
                onLogout={this.props.onLogout}
            />
        )
    }else if( this.state.gameStart ){
            const { 
				headerLinks, 
				username
            } = this.state;
            
            return(
            <div className="">
                {this.state.showSign && <GameOverSign isBoatGame={true} place={this.state.playerPlace}/>}
                <Header 
                    links={headerLinks}
                    isLoggedIn={true}
                    username={username}
                    history={this.props.history}
                    onLogout={this.props.onLogout}
                >
                </Header>
                <Tutorial 
                    playerHasLost={this.endGames} 
                    inputOff={this.state.inputOff}
                    assignPosition={this.assignPlayerPlace}
                    showStats={this.showStatspage}
                    incrementDifficulty={this.incrementDifficulty}
                    countTime={this.totalTime} 
                    difficulty={this.state.playerDifficulty} 
                    baseDifficulty={this.state.baseDifficulty} 
                    currentContent={content}
                />
            </div>
            )
        }else if(this.state.playerHasLost){
            return (
                <Stats 
                    recordHighScore={this.recordHighScore}
                    data={this.state} 
                    exit={this.props.exit} 
                    reset={this.playAgain} 
                    onLogout={this.props.onLogout} 
                    history={this.props.history}
                />
            )
        }
    }
}
  export default BoatGame;