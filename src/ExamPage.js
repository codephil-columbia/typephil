import React, { Component } from "react";
import shuffle from 'shuffle-array'

import Header from './components/header'
import Tutorial from './ExamTracking'
import Stats from './ExamStats'
import data from "./offline_data.json"

import { LocalStorageCache } from "./services";

class ExamPage extends Component{
    constructor(props){
        super(props);
        this.cache = new LocalStorageCache();

        this.endGames=this.endGames.bind(this)
        this.totalTime=this.totalTime.bind(this)
        this.parse=this.parse.bind(this)
        this.cleanContent=this.cleanContent.bind(this)
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
            headerLinks: ["Stats" ,"Games", "Learn", "Home"],
            username: this.cache.get("username"),
        };
    }



    componentWillMount() {
        let fullcontent = ""
        let jsonData = data.games.boatrace
        shuffle(jsonData)
        for (let i = 0;i < jsonData.length;i++){
            let content = this.parse(jsonData[i])
            fullcontent+= content 
        }
        this.setInitContent(fullcontent)
    };


    cleanContent = (content) => {
        return content.replace(/(?:\r\n|\r|\n|\\n)/g, '').replace("\"\\n\"","")
    }

    setInitContent = (fullContent) => {
        this.setState({
            content:fullContent
        })
    }

    parse = (response) => {
        let currPhrase = ""
        let textArray = []
        let origin = 0
        let pointer = 0

        //Finds Title
        while(response[pointer]+ response[pointer+1] !== "\\n"){
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
        while(pointer < content.length){
            let currChar = content[pointer]
            if (currChar === "." || currChar === "?" || currChar=== "!"){
                pointer+=2
                currPhrase = content.slice(origin,pointer)
                textArray.push(currPhrase)
            }else if(currChar === " "){
                pointer+=1
                currPhrase = content.slice(origin,pointer)
                textArray.push(currPhrase)
            }else{
                while(content[pointer] !== " "){
                    pointer-=1
                }
                pointer+=1
                currPhrase = content.slice(origin,pointer)
                textArray.push(currPhrase)
            }
            origin = pointer
            pointer+= 35
            currPhrase = ""
        }
        textArray.push(content.slice(origin,content.length))
        let finalstr=textArray[0]
        for(let i=1;i<textArray.length;i++){
            finalstr+=textArray[i] +"\\n"
        }
        return finalstr
    }
    
    initiate = () => {
        this.setState({
            isPlayerReady:true,
            beginCountDown:true
        })
    }
    
    totalTime = (time) => {
        var minutes=time/60
        this.setState({totalMinutes:minutes})
    }
    


    endGames = (state) => {
        var minutes=this.props.time
        var totalChars= state.incorrect.length + state.correct.length   
        var playerAccuracy= Math.floor((1- state.incorrect.length/totalChars)*100)
        var wpm = Math.floor(totalChars/(5*minutes))
        var wordsTyped = wpm * minutes
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

    addText = () => {
        let randIndex= Math.floor(Math.random() * data.games.boatrace.length)
        this.setInitContent(data.games.boatrace[randIndex])
    }

    playAgain = () => {
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
        });
        this.componentWillMount();
    }

    
    render() { 
        const { 
            headerLinks,
            username,
            content
        } = this.state;

        if(this.state.gameStart){
            return(
                <div>
                    <Header 
                        links={headerLinks}
                        isLoggedIn={true}
                        username={username}
                        history={this.props.history}
                        onLogout={this.props.onLogout}
                    />
                    <Tutorial 
                        playerHasLost={this.endGames} 
                        insertText={this.addText} 
                        inputOff={this.state.inputOff} 
                        countTime={this.totalTime} 
                        time={this.props.time} 
                        currentContent={content}
                    />
                </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats data={this.state} exit={this.props.exit} reset={this.playAgain} onLogout={this.props.onLogout} history={this.props.history}/>)
        }
    }
}

export default ExamPage;
