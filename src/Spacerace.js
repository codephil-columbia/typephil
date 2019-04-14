import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header'
import ShowSpinner from './components/spinner';
//import styled from 'styled-components';
import Arcade from './fonts/Racetrack/Racetrack_Stencil.otf'; 
import Avenir from './fonts/Racetrack/Racetrack_Stencil.otf'; 
import './style/spacerace.css';
import DifficultyTab from './DifficultyTab'; 
import Button from 'react-button-component'
import SpaceracePlay from './SpaceracePlay';

import { 
  fetchAllChapterNames, 
  fetchAllPairs, 
  fetchCompletedLessons,
  fetchLessonById
} from './actions/learn'

import { getCurrentLessonForUser } from './actions/homepage';

const CustomButton = Button.extend`
        margin-top:4vh;
        height: 82px;   
        width: 270px;   
        border: 5px solid #F5A623;  
        border-radius: 10px;    
        background-color: #FFFFFF;
            font-size: 3.5rem;
`

class Spacerace extends Component {
  constructor(props) {
    super(props);
    this.state ={
            headerLinks: ["Games", "Learn", "Home"],
            isPlay: false,
            difficulty: "easy"
        }   
    }
    
    play = () => {
        this.setState({isPlay:true})
    }

  render() {
    const { 
      isLoading, 
    } = this.props;

    if(isLoading) {
      return <ShowSpinner />
    } 

    const { 
      headerLinks, 
        } = this.state;
        
        return (
            <div>
                <Header 
                    links={headerLinks} 
                    isLoggedIn={this.props.isLoggedIn} 
                    username={this.props.currentUser.username}>
                </Header>   
                {this.state.isPlay === true ? (
                    <SpaceracePlay
                        difficulty={this.state.difficulty}
                        >
                    </SpaceracePlay>
                ) : (
                    <SpaceraceDescription
                        play={this.play}>
                    </SpaceraceDescription>
                )}
            </div>
        )
    }
}

const SpaceraceDescription = ({ play }) => {

    return (
        <div className="MetaWrapper">

            <div className = "GameTitleContainer">
                
                <div className="GameTitle">
                    <p>Space Race</p>
                 </div>

            </div>

            <div className = "TextBoxContainer">

                <div className="TextBox">

                    <p>Type the words on the asteroids as they appear to eliminate them before they make impact on Earth. Each time an asteroid makes it through, you will lose a life. You start with three lives. You can gain a life each time you make it to the next level. As the levels increase, the number of asteroids also increase in number.
                    </p>

                </div>

            </div>

            <div className = "DifficultyTab">
                <div className= "DifficultyText">
                    <p> SELECT DIFFICULTY </p>

                </div>

                <DifficultyTab difficulty={this.EzSelected} updateMed={this.MedSelected} updateHard={this.HardSelected}/>
                <button onClick = {play}> Play </button>
         
             </div>
        	
			<div className = "PlaySection">
            <div className = "PlayBackground">
                <div className = "PlayStars">
                    <img src="../public/images/spacerace/StarsBackground.svg" alt=""/>
                </div>
            </div>
        </div>

         </div>                 
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Spacerace); 
