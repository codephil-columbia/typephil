import React, {Component} from 'react'
import Header from './components/header'
import Arcade from './fonts/arcade/ARCADE_N.ttf'
import Button from 'react-button-component'
import styled  from 'styled-components'


const SideBar= styled.div`
    display:flex;
    flex-direction:column;
    align-content:center;
    width:10vw;
    height:100vh;
`
const SideTab= styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    width:10vw;
    height:25vh;
`

const ContentContainer=styled.div`
    display:flex;
    flex-direction:row;
`

const Content=styled.div`
    display:flex;
    width:75vw;
    height:100vh;
`
const GameScore=styled.div`
    display:flex;
    flex-direction:column;
    height:100vw;
    width:75vw
`

const UserStats=styled.div`
    display:flex;
    flex-direction:column;
    padding-left:1vw;
    
`
const GameStatsWrapper=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
`
const StatsRow=styled.div`
    display:flex;
    width:95vw
    height:15vh;
    flex-direction:row;
    justify-content:space-evenly;
    padding-top:5vh;
    padding-bottom:5vh;
    align-items:left;
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


export default class DataDashboard extends Component{
    constructor(props) {
        super(props);
        this.resetOptions=this.resetOptions.bind(this)
        this.activateProgress=this.activateProgress.bind(this)
        this.activateGameScore=this.activateGameScore.bind(this)
        this.activateBadges=this.activateBadges.bind(this)
        this.state = { 
            headerLinks: ["Games", "Learn", "Home"],
            progressActive:false,
            gameScoreActive:true,
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
        const { 
            headerLinks, 
          } = this.state;
        return (
            <div>
             <Header links={headerLinks}/>
            <ContentContainer>
                <SideBar>
                    <SideTab onClick={this.activateProgress}>My Progress</SideTab>
                    <SideTab onClick={this.activateGameScore}>Game Scores</SideTab>
                    <SideTab onClick={this.activateBadges}>My Badges</SideTab>
                </SideBar>
                <Content>
                    { this.state.progressActive &&
                        <div>Progress clicked</div> }
                    { this.state.gameScoreActive &&
                       <GameScore>
                        <div> Game Score </div>
                        <UserStats>
                            <StatsRow>
                               <GameStatsWrapper>
                                   <div>75</div>
                                   <div>WPM</div>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <div>90%</div>
                                   <div>Accuracy</div>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <div>5</div>
                                   <div>Level</div>
                               </GameStatsWrapper>
                            </StatsRow>
                            <StatsRow>
                               <GameStatsWrapper>
                                   <div>75</div>
                                   <div>WPM</div>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <div>90%</div>
                                   <div>Accuracy</div>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <div>5</div>
                                   <div>Level</div>
                               </GameStatsWrapper>
                            </StatsRow>
                            <StatsRow>
                               <GameStatsWrapper>
                                   <div>75</div>
                                   <div>WPM</div>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <div>90%</div>
                                   <div>Accuracy</div>
                               </GameStatsWrapper>
                               <GameStatsWrapper>
                                   <div>5</div>
                                   <div>Level</div>
                               </GameStatsWrapper>
                            </StatsRow>
                        </UserStats>
                       </GameScore>}
                    { this.state.badgesActive &&
                        <div>My Badges clicked </div>}
                </Content>
                </ContentContainer>
            </div>
        )
    }

}


