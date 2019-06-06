import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import Header from './components/header';
import Button from 'react-button-component';
import styled from 'styled-components';
import BoatGame from './BoatGame'
import KeyTracking from './KeyTracking'
import SpaceraceGame from './SpaceraceGame'
import GameOverSign from './components/gameOver'
import './style/font.css';


const LeftGameSelectionPanel = styled.div`
	float: left;
	width: 50%;
	height: 93vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RightGameSelectionPanel = styled.div`
	float: right;
	width: 50%;
	height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: 1px solid #52B094;
    margin-top: 5vh;
    marign-bottom: -5vh;
`

const SpaceRaceSelection = styled.div`
	font-family: "SpaceRaceFont";
	font-size: 5rem;
	height: 33%;
	text-align: center;
	padding-top: 10vh;
	cursor: pointer;
	color: ${props => props.isActive ? '#326BAE' :'#4A4A4A' };

	@media only screen and (max-width: 1150px) {
		font-size: 4rem;
	}
`

const BoatRaceSelection = styled.div`
	font-family: "ReadySetTypeFont";
	font-size: 5rem;
	height: 33%;
	text-align: center;
	padding-top: 12vh;
	cursor: pointer;
	color: ${props => props.isActive ? '#039894' :'#4A4A4A' };

	@media only screen and (max-width: 924px) {
		padding-top: 5vh;
	}
`

const ChallengeSelection = styled.div`
	font-family: "Racetrack";
	font-size: 5rem;
	height: 33%;
	text-align: center;
	padding-top: 11vh;
	cursor: pointer;
	color: ${props => props.isActive ? '#F5A623' :'#4A4A4A' };
`

const GameSelectionLine = styled.div`
	border-bottom: 1px solid #979797;
	width: 10vw;
`

const InstructionsHeader = styled.div`
	padding-top: 4vh;
	font-size: 2.5rem;
	font-weight: bold;
	color: #52B094;
`

const InstructionsDescription = styled.div`
	padding-top: 2.5rem;
	padding-right: 10vw;
	padding-left: 10vw;
`

const GameScreenshot = styled.div`
	padding-top: 2vh;
	padding-right: 10vw;
	padding-left: 10vw;

	@media only screen and (max-width: 1150px) {
		padding-right: 5vw;
		padding-left: 5vw;
	}
`

const GameSelectionButton = Button.extend`
	margin-top: 4vh;
	background-color: #52B094;
	border-radius: 10px;
	font-size: 1.5rem;
	color: white;
`

export default class GameSelect extends Component {
  	constructor(props) {
	    super(props);
	    this.state = { 
				headerLinks: ["Games", "Learn", "Home"],
				spaceraceEnabled:false,
				showSpaceRace:false,
				boatraceEnabled:false,
				showBoatRace:false,
				challengeEnabled:false,
				showChallenge:false,
	    }
		this.spaceraceSelected = this.spaceraceSelected.bind(this);
		this.boatraceSelected = this.boatraceSelected.bind(this);
		this.challengeSelected = this.challengeSelected.bind(this);
		this.returnToSelection=this.returnToSelection.bind(this)
		this.BeginGame = this.BeginGame.bind(this)
    }

    componentDidMount(){
    	this.setState({
	      spaceraceEnabled:true,
	      boatraceEnabled:false,
	      challengeEnabled:false,
	      gameDescription: "\
			Type the words on the asteroids as they appear \
			to eliminate them before they make impact on Earth. \
			Each time an asteroid makes it through, you will lose a life. \
			You start with three lives. You can gain a life each time you \
			make it to the next level. As the levels increase, the number of \
			asteroids also increase in number.\
	      ",
	      gameScreenshot: "./images/games/spacerace_placeholder.png"
    	})
    	console.log("spacerace selected on default")
    }

    spaceraceSelected()
    {
    	this.setState({
				spaceraceEnabled:true,
				boatraceEnabled:false,
	      challengeEnabled:false,
	      gameDescription: "\
			Type the words on the asteroids as they appear \
			to eliminate them before they make impact on Earth. \
			Each time an asteroid makes it through, you will lose a life. \
			You start with three lives. You can gain a life each time you \
			make it to the next level. As the levels increase, the number of \
			asteroids also increase in number.\
	      ",
	      gameScreenshot: "./images/games/spacerace_placeholder.png"
    	})
    	console.log("spacerace selected")
		}
		
		returnToSelection(){
			this.setState({
				showBoatRace:false,
				showChallenge:false,
				showSpaceRace:false
			})
		}

    boatraceSelected()
    {
    	this.setState({
	      spaceraceEnabled:false,
	      boatraceEnabled:true,
	      challengeEnabled:false,
	      gameDescription: "\
			Type the long passages as quickly and accurately as \
			you can. The faster you type, the faster your boat \
			will travel. Try to beat your opponents and your own \
			best WPM as you race towards the finish line!\
	      ",
	      gameScreenshot: "./images/games/boatrace_placeholder.png"
    	})
    	console.log("boatrace selected")
    }

    challengeSelected()
    {
    	this.setState({
				spaceraceEnabled:false,
	      boatraceEnabled:false,
	      challengeEnabled:true,
	      gameDescription: "\
			Type as many phrases as possible before time runs out. \
			Every time you correctly type a phrase, more time will be \
			added to your counter and your streak will increase.\
	      ",
	      gameScreenshot: "./images/games/challenge_placeholder.png"
    	})
    	console.log("challenge selected")
		}
		
		BeginGame(state){
			if (this.state.spaceraceEnabled === true){
				this.setState({showSpaceRace:true})
			} else if (this.state.challengeEnabled === true){
				this.setState({showChallenge:true})
			} else if (this.state.boatraceEnabled === true){
				this.setState({showBoatRace:true})
				console.log("was reached")
			}	
		}

    render() {
	    const { 
	      headerLinks, 
	    } = this.state;
			if(this.state.showBoatRace){
				console.log("boat has been activated")
				return(<BoatGame exit={this.returnToSelection}/>)
			}else if(this.state.showChallenge){
				console.log("challenge has been activated")
				return(<KeyTracking exit={this.returnToSelection}/>)
			}else if(this.state.showSpaceRace){
				console.log("spaceRace has been activated")
				return(<SpaceraceGame exit={this.returnToSelection}/>)
			}else{
        return(
            <div>
            	<Header links={headerLinks}/>
            	<LeftGameSelectionPanel>
            		<SpaceRaceSelection onClick={this.spaceraceSelected} 
            		isActive={this.state.spaceraceEnabled}>
            			Space Race
            		</SpaceRaceSelection>

            		<GameSelectionLine/>

            		<BoatRaceSelection onClick={this.boatraceSelected} 
            		isActive={this.state.boatraceEnabled}>
            			Ready, Set, Type!
            		</BoatRaceSelection>

            		<GameSelectionLine/>

            		<ChallengeSelection onClick={this.challengeSelected} 
            		isActive={this.state.challengeEnabled}>
            			Challenge
            		</ChallengeSelection>
            	</LeftGameSelectionPanel>


            	<RightGameSelectionPanel>
            		<InstructionsHeader>
            			INSTRUCTIONS
            		</InstructionsHeader>

            		<InstructionsDescription>
            			{this.state.gameDescription}

            		</InstructionsDescription>

            		<GameScreenshot>
            			<img src={this.state.gameScreenshot}/>
            		</GameScreenshot>

		            <GameSelectionButton onClick={() => this.BeginGame(this.state)}>
		              <p>PLAY GAME</p>
		            </GameSelectionButton>

            	</RightGameSelectionPanel>
            </div>
				)
			}
    }
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