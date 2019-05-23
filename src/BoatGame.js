import React, { Component } from "react";
import Button from 'react-button-component'
import styled from 'styled-components';
import ReactCountdownClock from 'react-countdown-clock'
import Header from './components/header'
import Tutorial from './BoatGameTracking'
import Stats from './BoatStats'
import MainPage from './BoatLevelSelect'
import { Connect, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router'

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


class BoatGame extends Component{
    constructor(props){
        super(props);
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
        this.state={
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
            showMainPage:true,
            headerLinks: ["Games", "Learn", "Home"],
        };
    }



  componentWillMount = () => {
    fetch("http://localhost:5000/game/boatrace")
    .then(results => {
        return results.json()
    })
    .then(data => {
       let randIndex= Math.floor(Math.random() * data.length)
       this.setState({content:this.parse(data[randIndex].Txt)})
    })

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
            playerDifficulty:diffNum,
            baseDifficulty:diffNum
        })
    }

    cleanContent(content){
        return content.replace(/(?:\r\n|\r|\n|\\n)/g, ' ').replace("\"\\n\""," ")
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
        textArray.push(currPhrase.trim())
        currPhrase=""
        origin=pointer+2
        let content= response.slice(origin,)

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
            }else{
                while(content[pointer] !=" "){
                    pointer-=1
                }
                pointer+=1
                currPhrase=content.slice(origin,pointer)
                textArray.push(currPhrase)
            }
            origin=pointer
            pointer+=40
            currPhrase=""
        }
        textArray.push(content.slice(origin,content.length))
        console.log(textArray)
        let finalstr=textArray[0]
        for(let i=1;i<textArray.length;i++){
            finalstr+=textArray[i] +"\\n"
        }

        console.log(finalstr)
        return finalstr
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

    showStatspage= () => {
        this.setState({
            playerHasLost:true,
            isPlayerReady:false,
            gameStart:false,
        })

    }
    
    render(){ 
    let content = this.state.content
    
    console.log(content)
         // this == event, in this cases
    if(this.state.showMainPage){
        return (<MainPage commenceGame={this.exitMainPage} />)
    }else if(this.state.isPlayerReady){
        {
            const { 
                headerLinks, 
                } = this.state;

            return(  
                <div>
                    <Header links={headerLinks}></Header>
                    <div className="countdown-clock-description">Starting Game In...</div>
                    <div style={{width:"100vw", height:"45vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <ReactCountdownClock className="countdown-clock" color="#52B094" seconds={3} size={300} onComplete={this.beginGames}/> 
                    </div>
                </div>

            )
        }
        }else if(this.state.gameStart){
            const { 
                headerLinks,
              } = this.state;
            
            return(
            <div className="">
                <Header links={headerLinks}></Header>
                <Tutorial playerHasLost={this.endGames} showStats={this.showStatspage} incrementDifficulty={this.incrementDifficulty} countTime={this.totalTime} difficulty={this.state.playerDifficulty} baseDifficulty={this.state.baseDifficulty} currentContent={content}/>
            </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats restore={this.returnMainPage} data={this.state}></Stats>)
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(BoatGame);