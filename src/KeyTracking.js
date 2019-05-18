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
        };
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
    
    render(){
        
    let content="Time is money. \nJust go for it. \nLive the moment. \nChoose to shine. \nYour Time is Now. \nNo pain, no gain. \nI can and I will. \nLet your love out. \nToo clever is dumb, Yes, No, Maybe So. \nOwn less. \nDo more. \nWe''re all mad here. \nYou live only once. \nPaint the town red. \nRide like the wind. \nNo feeling is final, Kindness is wisdom. \nOrder brings peace. \nWhat''s done is done. \nIt''s never too late. \nDon’t rush things. \nNever stop dreaming. \nTime is all we have. \nYou are your choices. \nFollow your own star. \nWork hard stay humble, Every moment matters. \nShine like the stars. \nTime discovers truth. \nThink outside the box. \nWhat is normal anyway?, Nobody cares about it. \nDon''t worry, be happy. \nThink Less. \nFeel More. \nGood things take time. \nTime eases all things. \nThoughts rule the world, Make today awesome!, My life is my argument. \nDream big. \nPray bigger. \nWork hard. \nStay humble. \nKindness is contagious. \nBe true to who you are. \nCuriouser and curiouser!, Tomorrow is another day. \nDance lightly with life. \nEnjoy the little things. \nLeave no stone unturned. \nEnjoy the little things. \nThe best is yet to come. \nYou make my heart smile. \nBe obsessively grateful. \nFaith can move mountains. \nSuccess and nothing less. \nFight till the last gasp. \nBetter things are coming. \nWhat we think, we become. \nTruth is a pathless land. \nNever doubt your instinct. \nI can, therefore I am. \nStay hungry. \nStay foolish. \nBroken crayons still color. \nBeginnings are always messy. \nCourage doesn''t always roar. \nI think, therefore I am. \nAnd so the adventure begins. \nIf you want it, work for it. \nNever, never, never give up. \nIf you are good life is good. \nUltimately love is everything, If there is no wind, row. \nYou can if you think you can. \nEvery day is a second chance. \nKindness is always beautiful. \nEven monkeys fall from trees. \nWhat you seek is seeking you. \nLife is tough but so you are. \nMuch effort, much prosperity. \nTwo rights don''t equal a left. \nDream big and dare to fail. \nCollect moments – not things. \nFeel the fear and do it anyway. \nYou are amazing. \nRemember that. \nLive the life you’ve dreamed. \nLost time is never found again. \nTime brings all things to pass. \nNever, never, never give up. \nWhatever you are, be a good one. \nImpossible is for the unwilling. \nNothing worth having comes easy. \nHappiness depends upon ourselves. \nGrow through what you go through. \nTake the risk or lose the chance. \nDo it with passion or not at all. \nWhen nothing goes right, go left. \nYou will never regret being kind. \nYou are capable of amazing things. \nIn the end, only kindness matters. \nDon’t stop until you’re proud. \nThe struggle is part of the story. \nIf you dream it, you can do it. \n Be awesome, be amazing, be you. \nShe believed she could, so she did. \nThe past does not equal the future. \nIt’s pain that changes our lives. \nWhatever you are, bo a good one. \nIf you don’t ask, you don’t get. \nWhatever happens, take responsibility, If not us, who? If not now, when?, Today a reader, tomorrow a leader, Stars can’t shine without darkness. \nI’m strong because I’ve been weak. \nNobody can be uncheered with a balloon. \nEverything you can imagine is real. \nThe best way out is always through. \nGood things happen to those who hustle. \nAt the end of hardship comes happiness. \nForget about style; worry about results. \nWhatever you do, do with all your might. \nDream without fear. \nLove without limits. \nKind people are the best kind of people. \nAn obstacle is often a stepping stone, Learn as if you were to live forever. \nTechnology has to be invented or adopted. \nDon’t dream your life, live your dream. \nYou can do anything you set your mind to. \nIf it matters to you, you’ll find a way. \nWe are twice armed if we fight with faith. \nKindness is not an act, it’s a lifestyle. \nWherever you go, go with all your heart. \nTechnology is teaching us to be human again. \nDon’t count the days. \nMake the days count. \nAll happiness depends on courage and work, The human spirit must prevail over technology. \nDon’t regret the past, just learn from it. \nChange is the end result of all true learning, Be faithful to that which exists within yourself. \nAll things are difficult before they are easy. \nI never learned from a man who agreed with me. \nDon’t wait. \nThe time will never be just right. \n"

    var contentArray=content.split("\n")
    var cleanContent= ""
    for(var i =0;i<contentArray.length; i++){
        var string = contentArray[i].trim()
        cleanContent = cleanContent + string
    }
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
            <div className="challenge-game-background">
                <Header links={headerLinks}></Header>
                <Tutorial playerHasLost={this.endGames} incrementDifficulty={this.incrementDifficulty} countTime={this.totalTime} difficulty={this.state.playerDifficulty} currentContent={content}/>
            </div>
            )
        }else if(this.state.playerHasLost){
            return(<Stats data={this.state}></Stats>)
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(KeyTracking);