import React, { Component } from "react";
import { LocalStorageCache} from "./services";


import Button from 'react-button-component'
import styled from 'styled-components';
import Header from './components/header'
import Tutorial from './BoatGameTracking'
import Stats from './BoatStats'
import MainPage from './BoatLevelSelect'
import { tween, styler } from 'popmotion';
import data from "./offline_data.json"

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

class BoatGame extends Component{
    constructor(props){
        super(props);
        this.cache = new LocalStorageCache();

        this.initiate=this.initiate.bind(this)
        this.beginGames=this.beginGames.bind(this)
        this.endGames=this.endGames.bind(this)
        this.exitMainPage=this.exitMainPage.bind(this)
        this.incrementDifficulty=this.incrementDifficulty.bind(this)
        this.totalTime=this.totalTime.bind(this)
        this.showStatspage=this.showStatspage.bind(this)
        this.parse=this.parse.bind(this)
        this.cleanContent=this.cleanContent.bind(this)
        this.returnMainPage=this.returnMainPage.bind(this)
        this.exitGame=this.exitGame.bind(this)
        this.playAgain=this.playAgain.bind(this)
        this.setTotalWords=this.setTotalWords.bind(this)
        this.limitWords=this.limitWords.bind(this)
        this.setInitContent=this.setInitContent.bind(this)
        this.setLimitedContent=this.setLimitedContent.bind(this)
        this.assignPlayerPlace=this.assignPlayerPlace.bind(this)
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



  componentWillMount = () => {
    let randIndex= Math.floor(Math.random() * data.games.boatrace.length)
    console.log(data.games.boatrace[randIndex])
    this.setInitContent(data.games.boatrace[randIndex])
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
        this.setLimitedContent()
        this.setState({
            showMainPage:false,
            isPlayerReady:true,
            gameStart:true,
            playerDifficulty:diffNum,
            baseDifficulty:diffNum
        })
        
    }

    cleanContent(content){
        console.log(content.replace(/(?:\r\n|\r|\n|\\n)/g, '').replace("\"\\n\"",""))
        return content.replace(/(?:\r\n|\r|\n|\\n)/g, '').replace("\"\\n\"","")
    }

    setInitContent(fullContent){
        let parsedContent=this.parse(fullContent)
        this.setState({
            originalContent:parsedContent,
            content:this.limitWords(parsedContent)
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
                console.log("pushing1:" + currPhrase)
                textArray.push(currPhrase)
            }else if( currChar == " "){
                pointer+=1
                currPhrase=content.slice(origin,pointer)
                console.log("pushing2:" + currPhrase)
                textArray.push(currPhrase)
            }else{
                while(content[pointer] !=" "){
                    pointer-=1
                }
                pointer+=1
                currPhrase=content.slice(origin,pointer)
                console.log("pushing3:" + currPhrase)
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

    incrementDifficulty(){
        this.setState({playerDifficulty:this.state.playerDifficulty + 1})
    }

    setTotalWords(wordNum){
        this.setState({totalWords:wordNum})
        console.log(this.state.totalWords)
    }

    setLimitedContent(){
        this.setState({content:this.limitWords(this.state.originalContent)})
        console.log(this.state.content)
    }

    limitWords(finalstr){
        let wordsProcessed=0
        let currWord=""
        let wordLimit=this.state.totalWords
        if(wordLimit !=0){
            for(let pointer=0;pointer<finalstr.length;pointer++){
                if(finalstr[pointer]==" "){
                    wordsProcessed+=1
                    currWord=""
                    if(wordsProcessed==wordLimit){
                        finalstr=finalstr.slice(0,pointer)
                        pointer-=1
                        if(finalstr[pointer]!="." || finalstr[pointer]!="!" || finalstr[pointer] !="?" || finalstr[pointer] != "\""){
                            let periodLastIndex=finalstr.lastIndexOf(".")
                            let qmarkLastIndex=finalstr.lastIndexOf("!")
                            let quoteLastIndex=finalstr.lastIndexOf("?")
                            let excLastIndex=finalstr.lastIndexOf("\"")
                            let endPointArray=[periodLastIndex,qmarkLastIndex,quoteLastIndex,excLastIndex]
                            let max= Math.max(...endPointArray)
                            finalstr=finalstr.slice(0,max+1)
                        }

                        return finalstr
                    }
                }
                currWord+=finalstr[pointer]
            }
        }
        console.log("limit words string")
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
    assignPlayerPlace = (position) =>{
        this.setState({playerPlace:position})
    }

    endGames= (state, time) =>{
        var minutes=time/60
        var totalChars= state.incorrect.length + state.correct.length   
        var playerAccuracy= Math.floor((1- state.incorrect.length/totalChars)*100)
        var wpm = Math.floor(totalChars/(5*minutes))
        this.setState({showSign:true,inputOff:true})
        setTimeout(()=> {
            this.setState({
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
            accuracy:playerAccuracy,
            wordsPerMinute:wpm,
        })},6000)
    }

    showStatspage= () => {
        this.setState({
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
        })

    }

    playAgain(){
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
    exitGame = () =>{
        this.props.history.push("/selectGames")
      }
    
    render(){ 
    let content = this.state.content
    console.log(this.state.totalWords)
    console.log(this.state.showMainPage)
         // this == event, in this cases
    if(this.state.showMainPage){
        return (<MainPage setWords={this.setTotalWords} commenceGame={this.exitMainPage} onLogout={this.props.onLogout} history={this.props.history} />)
    }else if(this.state.gameStart){
            const { 
				badges, 
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
                <Tutorial playerHasLost={this.endGames} inputOff={this.state.inputOff} assignPosition={this.assignPlayerPlace} showStats={this.showStatspage} incrementDifficulty={this.incrementDifficulty} countTime={this.totalTime} difficulty={this.state.playerDifficulty} baseDifficulty={this.state.baseDifficulty} currentContent={content}/>
            </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats data={this.state} exit={this.props.exit} reset={this.playAgain} onLogout={this.props.onLogout} history={this.props.history}/>)
        }
    }
}
  
  export default BoatGame;