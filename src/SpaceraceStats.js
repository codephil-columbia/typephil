import React, { Component } from 'react'
import Header from './components/header'
import Arcade from './fonts/arcade/ARCADE_N.ttf'
import Button from 'react-button-component'
import { LocalStorageCache, GameService } from "./services";
import ShowSpinner from './components/spinner';

import styled  from 'styled-components'

import './style/font.css'

const EntireWrapper = styled.div`
    background-color: #25365A;
    height: 100vh;
`

const NavigationContainer= styled.div`
    display:flex;
    justify-content:space-between;
    padding-left:10vw;
    width:90vw;
`

const CustomButton = Button.extend`
    margin-top:10vh;
    font-size:1.5rem;
    font-family:"Arcade_real";
    color: #52B094;
    border-color: #52B094;
    background-color: transparent;
`

const StatsWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-content:center;
    text-align:center;
    padding-top: 7vh;
    width: 100%;
`

const StatsRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly
    align-content:center;
    text-align:center;
    width:60vw;
    margin-left:20.5vw;
    margin-right:20.5vw
    color: #DC367A;
    padding-bottom: 2vh;
`

const StatsHighScoreRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly
    align-content:center;
    text-align:center;
    width:60vw;
    margin-left:20.5vw;
    margin-right:20.5vw
    color: #DC367A;
    border-style: solid;
    border-color: #DC367A;
    height: 15vh;
    padding-top: 2vh
    padding-bottom: 2vh
`

const DataContainer = styled.div`
    @font-face {
        font-family: 'Arcade';
        src: url(${Arcade}) format('truetype');
        font-weight: normal;
        font-style: normal;
    } 
    display:flex
    flex-direction:column;
    align-content:center;
    height:10vw;
`

const StatsHeader = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly
    align-content:center;
    text-align:center;
    width:100vw;
    font-family:"Arcade";
    color: #52B094;
    font-size: 2.9rem;
    padding-bottom: 7vh;
`

const StatsData = styled.div`
	font-size: 4rem;
	font-weight: 900;
`

const StatsText = styled.div`
	font-family:"Arcade";
	font-size: 1.5rem;
`

const HighScoreLabel = styled.div`
	display: inline-block;
    margin-left: 37vw;
    margin-right: 37vw;
    align-content: center;
    color: #DC367A;
    font-family:"Arcade";
    width: 26vw;
	text-align: center;
	margin-bottom: -13px;
	z-index: 2;
	font-size: 1.3rem;
	@media only screen and (max-width: 1050px) {
		padding-top: 3vw;
	}

    background-color: #25365A;
`

export default class Statistics extends Component{
    constructor(props) {
        super(props);
        this.cache = new LocalStorageCache();
        this.gameService = new GameService();

        this.state = { 
            isLoading: true,
            username: this.cache.get("username"),
            uid: this.cache.get("uid"),
            headerLinks: ["Stats", "Games", "Learn", "Home"],
        }

        this.playAgain = this.playAgain.bind(this)
        this.exitGame = this.exitGame.bind(this)
    }

    async componentDidMount() {
        this.setState({ isLoading: true });
        const { uid } = this.state;

        const spaceRaceHighScores = await this.gameService.getHighScores(uid, GameService.Games.SPACE_RACE);

        this.setState({
            spaceRaceHighScores,
            isLoading: false
        })
    }

    playAgain = () => {
        this.props.recordHighScore();
        this.props.reset()
    }

    exitGame = ()  =>{
      this.props.recordHighScore();
       this.props.exit()
    }

    render(){
        const { 
            badges, 
            headerLinks, 
            username,
            spaceRaceHighScores
        } = this.state;

        if (this.state.isLoading) {
            return <ShowSpinner />;
        }
          
        return (
            <div>
                <EntireWrapper>
		            <Header 
                        links={headerLinks} 
                        isLoggedIn={true} 
                        username={username} 
                        history={this.props.history}
                        onLogout={this.props.onLogout}
					/>                
                    <StatsWrapper>
                	<StatsHeader>GAME STATS</StatsHeader>
                    <StatsRow>
                        <DataContainer>
                            <StatsData>{this.props.data.wpm}</StatsData>
                            <StatsText>WPM</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>{this.props.data.playerAccuracy}%</StatsData>
                            <StatsText>Accuracy</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>{this.props.data.level}</StatsData>
                            <StatsText>Level</StatsText>
                        </DataContainer>
                    </StatsRow>
	                <HighScoreLabel>
	                	HIGH SCORES
	                </HighScoreLabel>
                    <StatsHighScoreRow>
                        <DataContainer>
                            <StatsData>{spaceRaceHighScores.wpm}</StatsData>
                            <StatsText>WPM</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>{spaceRaceHighScores.accuracy}%</StatsData>
                            <StatsText>Accuracy</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>{spaceRaceHighScores.level}</StatsData>
                            <StatsText>Level</StatsText>
                        </DataContainer>
                    </StatsHighScoreRow>
                </StatsWrapper>
                <NavigationContainer>
                        <CustomButton onClick={this.playAgain}>PLAY AGAIN</CustomButton>
                        <CustomButton onClick={this.exitGame}>EXIT </CustomButton>
                </NavigationContainer>
                </EntireWrapper>
            </div>
        )
    }
}