import React, { Component } from "react";
import Button from 'react-button-component'
import styled from 'styled-components';
import ReactCountdownClock from 'react-countdown-clock'
import Header from './components/header'
import Tutorial from './GameTracking'
import "./style/KeyTracking.css"

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
        this.state={
            isPlayerReady:false,
            beginCountDown:false,
            gameStart:false,
            headerLinks: ["Games", "Learn", "Home"],
        };
    }


    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyPressed);
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyPressed);
       
    }

    onKeyPressed = (e) => {
        let isRightKey =e.key;
        console.log(isRightKey);
    };



    initiate(){
        this.setState({isPlayerReady:true})
        this.setState({beginCountDown:true})
    }
    
    beginGames(){
        this.setState({beginCountDown:false})
        this.setState({playerHasLost:false})
        this.setState({isPlayerReady:false})
        this.setState({gameStart:true})
    }

    
    
    render(){

    var content=`Time is money.\nJust go for it.\nLive the moment.\nChoose to shine.\nYour Time is Now.\nNo pain, no gain.\nI can and I will.\nLet your love out.`

    var contentArray=content.split("\n")
    var cleanContent= ""
    for(var i =0;i<contentArray.length; i++){
        var string = contentArray[i].trim()
        cleanContent = cleanContent + string
    }
         // this == event, in this cases
        if(this.state.isPlayerReady)
        {
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
                <Tutorial currentContent={content}/>
            </div>
            )
        }else{
            const { 
                headerLinks, 
              } = this.state;
            return(
                <div className="challenge-game-background">
                    <Header links={headerLinks}></Header>
                    <div className="ready-container" style={{width:"100vw", height:"100vh",display:"flex", alignItems:"center", justifyContent:"center" }} onClick={this.initiate}>
                        <Ready>Begin</Ready>
                    </div>
                </div>
            )
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