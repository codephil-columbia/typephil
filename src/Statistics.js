import React, {Component} from 'react'
import Header from './components/header'
import Arcade from './fonts/arcade/ARCADE_N.ttf'
import Button from 'react-button-component'

import styled  from 'styled-components'


const NavigationContainer= styled.div`
    display:flex;
    justify-content:space-between;
    padding-left:10vw;
    width:90vw;

`


const CustomButton = Button.extend`
    @font-face {
        font-family: 'Arcade';
        src: url(${Arcade}) format('truetype');
        font-weight: normal;
        font-style: normal;
    } 
    margin-top:10vh;
    font-size:1.5rem;
    font-family:"Arcade";
    color: #52B094;

`

const StatsWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-content:center;
    text-align:center;
    padding-top: 7vh;

    width: 100%
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

    color: #F5A623;

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

    color: #F5A623;

    border-style: solid;
    border-color: #F5A623;
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
    color: #F5A623;

    font-family:"Arcade";
    width: 26vw;
	text-align: center;
	margin-bottom: -13px;
	z-index: 2;
	background-color: white;
	font-size: 1.3rem;

	@media only screen and (max-width: 1050px) {
		padding-top: 3vw;
	}
`


export default class Statistics extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            headerLinks: ["Games", "Learn", "Home"],
        }

        this.playAgain = this.playAgain.bind(this)
        this.exitGame = this.exitGame.bind(this)
      }



    
    playAgain= () =>{
        this.props.history.push("/coco")
    }

    exitGame= ()  =>{
        this.props.history.push("/")
    }

    render()
    {
        const { 
            headerLinks, 
          } = this.state;
        return (
            <div>
                <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} />
                <StatsWrapper>
                	<StatsHeader>GAME STATS</StatsHeader>
                    <StatsRow>
                        <DataContainer>
                            <StatsData>{this.props.data.wordsPerMinute}</StatsData>
                            <StatsText>WPM</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>{this.props.data.accuracy}%</StatsData>
                            <StatsText>Accuracy</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>{this.props.data.playerDifficulty}</StatsData>
                            <StatsText>Level</StatsText>
                        </DataContainer>
                    </StatsRow>
	                <HighScoreLabel>
	                	HIGH SCORES
	                </HighScoreLabel>
                    <StatsHighScoreRow>
                        <DataContainer>
                            <StatsData>98</StatsData>
                            <StatsText>WPM</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>45%</StatsData>
                            <StatsText>Accuracy</StatsText>
                        </DataContainer>
                        <DataContainer>
                            <StatsData>5</StatsData>
                            <StatsText>Level</StatsText>
                        </DataContainer>
                    </StatsHighScoreRow>
                </StatsWrapper>
                <NavigationContainer>
                        <CustomButton onClick={this.playAgain}>PLAY AGAIN</CustomButton>
                        <CustomButton>EXIT</CustomButton>
                </NavigationContainer>
            </div>
        )
    }

}


