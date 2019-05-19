import React, {Component} from 'react'
import Header from './components/header'
import Arcade from './fonts/arcade/ARCADE_N.ttf'
import Button from 'react-button-component'
import styled  from 'styled-components'

import './style/font.css'


const SideBar= styled.div`
    display:flex;
    flex-direction:column;
    align-content:center;
    width:15vw;
    height:92vh;
    background-color: #F2F0F0;
`
const SideTab= styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:15vw;
    height:25vh;
    color: #4A4A4A;
    font-weight: 500;
    cursor: pointer;

    background-color: ${props => props.isActive ? 'white' :'#F2F0F0' };
`

const ContentContainer=styled.div`
    display:flex;
    flex-direction:row;
`

const Content=styled.div`
    display:flex;
    width:75vw;
    height:92vh;
`
const GameScore=styled.div`
    display:flex;
    flex-direction:column;
    height:50vh;
    width:75vw;
`

const UserStats=styled.div`
    display:flex;
    flex-direction:column;
    padding-top: 5vh;
    // padding-left:1vw;
    
`
const GameStatsWrapper=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const StatsRow=styled.div`
    display:flex;
    width:85vw;
    height:15vh;
    flex-direction:row;
    justify-content:space-evenly;
    padding-bottom: 18vh;
    padding-top: 2vh;
    align-items:left;

  @media only screen and (max-height: 800px) {
    padding-bottom: 10vh;
  }
`

const GameHeader = styled.div`
  color: #52B094;
  font-weight: 500;
  font-size: 3rem;
  padding-left: 5vw;
  padding-top: 5vh;
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



const StatsHighScoreRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly
    align-content:center;
    text-align:center;
    width:60vw;
    margin-left:20.5vw;
    margin-right:20.5vw

    color: #199893;

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
    color: #199893;

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

const GamesStatsNumber = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: #4A4A4A;

  @media only screen and (max-height: 800px) {
    font-size: 3.5rem;
  }
`

const GamesStatsNumberCaption = styled.div`
  color: #4A4A4A;
  font-size: 2rem;
  font-weight: 500;

  @media only screen and (max-height: 800px) {
    font-size: 1.75rem;
  }
`

const GameSpaceRaceRowHeader = styled.div`
    display:flex;
    padding-left: 10vw;
    font-size: 2.75rem;
    font-family: SpaceRaceFont;
    color: #326BAE;
`

const GameReadySetTypeRowHeader = styled.div`
    display:flex;
    padding-left: 10vw;
    font-size: 3rem;
    font-family: ReadySetTypeFont;
    color: #039894;
`

const GameChallengeRowHeader = styled.div`
    display:flex;
    padding-left: 10vw;
    font-size: 2.75rem;
    font-family: ChallengeFont;
    color: #F5A623;
`

const ProgressStatsNumberWPM = styled.div`
  font-size: 5.5rem;
  font-weight: 900;
  color: #4A4A4A;
  text-align: center;

  background-color: #97C9A3;
  padding-top: 4vh;
  padding-bottom: 4vh;
  // padding-left: 5vw;
  // padding-right: 5vw;
  width: 15vw;

  border-radius: 10px;
`

const ProgressStatsNumberAccuracy = styled.div`
  font-size: 5.5rem;
  font-weight: 900;
  color: #4A4A4A;
  text-align: center;

  background-color: #DDE7C7;
  padding-top: 4vh;
  padding-bottom: 4vh;
  // padding-left: 3vw;
  // padding-right: 3vw;
  width: 15vw;

  border-radius: 100px;
`

const ProgressNumberCaption = styled.div`
  color: #4A4A4A;
  font-size: 2.25rem;
  font-weight: 500;

  padding-top: 3vh;
`

const ProgressNumberSubCaption = styled.div`
  color: #4A4A4A;
  font-size: 1.5rem;

  text-align: center;
`


export default class DataDashboard extends Component{
    constructor(props) {
        super(props);
        this.resetOptions=this.resetOptions.bind(this)
        this.activateProgress=this.activateProgress.bind(this)
        this.activateGameScore=this.activateGameScore.bind(this)
        this.activateBadges=this.activateBadges.bind(this)
        this.state = { 
            headerLinks: ["Games", "Learn", "Home"],
            progressActive:true,
            gameScoreActive:false,
            badgesActive:false
        }


    
    }

    resetOptions = () => {
        this.setState({
            progressActive:false,
            gameScoreActive:false,
            badgesActive:false
        })
    }

    activateProgress = () => {
        this.resetOptions()
        this.setState({progressActive:true})
    }

    activateGameScore = () => {
        this.resetOptions()
        this.setState({gameScoreActive:true})
    }

    activateBadges = () => {
        this.resetOptions()
        this.setState({badgesActive:true})
    }




    render(){

        console.log(this.props.data)
        console.log(this.state.progressActive)
        const { 
            headerLinks, 
          } = this.state;
        return (
            <div>
             <Header links={headerLinks}/>
            <ContentContainer>
                <SideBar>
                    <SideTab onClick={this.activateProgress} isActive={this.state.progressActive}>My Progress</SideTab>
                    <SideTab onClick={this.activateGameScore} isActive={this.state.gameScoreActive}>Game Scores</SideTab>
                </SideBar>
                <Content>
                    { this.state.progressActive &&
                      <GameScore>
                        <GameHeader> My Progress </GameHeader>
                        <UserStats>
                          <StatsRow>
                             <GameStatsWrapper>
                                 <ProgressStatsNumberWPM>75</ProgressStatsNumberWPM>
                                 <ProgressNumberCaption>Average WPM</ProgressNumberCaption>
                                 <ProgressNumberSubCaption>This is your average<br/> Words Per Minute score.</ProgressNumberSubCaption>
                             </GameStatsWrapper>
                             <GameStatsWrapper>
                                 <ProgressStatsNumberAccuracy>90%</ProgressStatsNumberAccuracy>
                                 <ProgressNumberCaption>Average Accuracy</ProgressNumberCaption>
                                 <ProgressNumberSubCaption>This is your average<br/> accuracy score.</ProgressNumberSubCaption>
                             </GameStatsWrapper>
                          </StatsRow>
                        </UserStats>
                      </GameScore>

                    }
                    { this.state.gameScoreActive &&
                       <GameScore>
                        <GameHeader> Game Score </GameHeader>
                        <UserStats>
                            <GameSpaceRaceRowHeader>Space Race</GameSpaceRaceRowHeader>
                            <StatsRow>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>75</GamesStatsNumber>
                                   <GamesStatsNumberCaption>WPM</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>90%</GamesStatsNumber>
                                   <GamesStatsNumberCaption>Accuracy</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>5</GamesStatsNumber>
                                   <GamesStatsNumberCaption>Level</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                            </StatsRow>
                            <GameReadySetTypeRowHeader>Ready, Set, Type!</GameReadySetTypeRowHeader>
                            <StatsRow>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>75</GamesStatsNumber>
                                   <GamesStatsNumberCaption>WPM</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>90%</GamesStatsNumber>
                                   <GamesStatsNumberCaption>Accuracy</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>5</GamesStatsNumber>
                                   <GamesStatsNumberCaption>Level</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                            </StatsRow>
                            <GameChallengeRowHeader>Challenge</GameChallengeRowHeader>
                            <StatsRow>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>75</GamesStatsNumber>
                                   <GamesStatsNumberCaption>WPM</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>90%</GamesStatsNumber>
                                   <GamesStatsNumberCaption>Accuracy</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <GamesStatsNumber>5</GamesStatsNumber>
                                   <GamesStatsNumberCaption>Level</GamesStatsNumberCaption>
                               </GameStatsWrapper>
                            </StatsRow>
                        </UserStats>
                       </GameScore>
                     }
                  </Content>
                </ContentContainer>
            </div>
        )
    }

}


