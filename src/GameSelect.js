import React, { Component } from 'react';
import Header from './components/header'
import Button from 'react-button-component'
import styled from 'styled-components'

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
	font-size: 3rem;
	height: 33%;
	text-align: center;
	padding-top: 10vh;

	@font-face {
	    font-family: 'SpaceRaceFont';
	    font-style: normal;
	    src:url(../fonts/breecbo/BREECBO_.TTF);
	}
	font-family: "SpaceRaceFont";

`

const BoatRaceSelection = styled.div`
	font-family: "Racetrack";
	font-size: 3rem;
	height: 33%;
	text-align: center;
	padding-top: 12vh;
`

const ChallengeSelection = styled.div`
	font-family: "Racetrack";
	font-size: 5rem;
	height: 33%;
	text-align: center;
	padding-top: 11vh;
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
	      headerLinks: ["Games", "Learn", "Home"]
	    }
    }

    render() {
	    const { 
	      headerLinks, 
	    } = this.state;

        return(
            <div>
            	<Header links={headerLinks}/>

            	<LeftGameSelectionPanel>
            		<SpaceRaceSelection>
            			Space Race
            		</SpaceRaceSelection>

            		<GameSelectionLine/>

            		<BoatRaceSelection>
            			Ready, Set, Type!
            		</BoatRaceSelection>

            		<GameSelectionLine/>

            		<ChallengeSelection>
            			Challenge
            		</ChallengeSelection>
            	</LeftGameSelectionPanel>


            	<RightGameSelectionPanel>
            		<InstructionsHeader>
            			INSTRUCTIONS
            		</InstructionsHeader>

            		<InstructionsDescription>
						Type the long passages as quickly and accurately as 
						you can. The faster you type, the faster your boat 
						will travel. Try to beat your opponents and your own 
						best WPM as you race towards the finish line!
            		</InstructionsDescription>

            		<GameScreenshot>
            			<img src="/images/games/game_placeholder.png"/>
            		</GameScreenshot>

		            <GameSelectionButton>
		              <p>PLAY GAME</p>
		            </GameSelectionButton>

            	</RightGameSelectionPanel>
            </div>
        )
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