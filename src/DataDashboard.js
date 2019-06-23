import React, {Component} from 'react'

import Header from './components/header'
import styled  from 'styled-components'

import { LocalStorageCache } from "./services";

import './style/font.css'

const SideBar = styled.div`
    display:flex;
    flex-direction:column;
    align-content:center;
    width:15vw;
    height:92vh;
    background-color: #F2F0F0;
`
const SideTab = styled.div`
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

const ContentContainer = styled.div`
    display:flex;
    flex-direction:row;
`

const Content = styled.div`
    display:flex;
    width:75vw;
    height:92vh;
`
const GameScore = styled.div`
    display:flex;
    flex-direction:column;
    height:50vh;
    width:75vw;
`

const UserStats = styled.div`
    display:flex;
    flex-direction:column;
    padding-top: 5vh;    
`
const GameStatsWrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const StatsRow = styled.div`
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

const SideButtonImage = styled.div`
    padding-top: 5vh;
`

export default class DataDashboard extends Component{
    constructor(props) {
        super(props);
        this.cache = new LocalStorageCache();

        this.resetOptions=this.resetOptions.bind(this)
        this.activateProgress=this.activateProgress.bind(this)
        this.activateGameScore=this.activateGameScore.bind(this)
        this.activateBadges=this.activateBadges.bind(this)
        this.state = { 
            username: this.cache.get("username"),
            headerLinks: ["Stats" ,"Games", "Learn", "Home"],
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




    render() {
        const { 
            badges, 
            headerLinks, 
            username
        } = this.state; 
        
        return (
            <div>
                <Header 
                    links={headerLinks} 
                    isLoggedIn={true} 
                    username={username} 
                    history={this.props.history}
                    onLogout={this.props.onLogout}
                />   
                <ContentContainer>
                <SideBar>
                    <SideTab onClick={this.activateProgress} isActive={this.state.progressActive}>
                      <SideButtonImage>
                        <img src="./images/buttons/my_progress_button.svg"/>
                      </SideButtonImage>
                      
                      My Progress
                    </SideTab>
                    <SideTab onClick={this.activateGameScore} isActive={this.state.gameScoreActive}>
                      <SideButtonImage>
                        <img src="./images/buttons/my_scores_button.svg"/>
                      </SideButtonImage>
                      Game Scores
                    </SideTab>
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


