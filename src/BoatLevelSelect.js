import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-button-component'
import Header from './components/header'
import DifficultyTab from './DifficultyTab'
import ShowSpinner from './components/spinner';
import styled from 'styled-components'
import './style/font.css'

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
    font-size:30px;

`

const BoatracePlayButtonDiv = styled.div`
    p {
      text-align: center;
      height: 44px; 
      width: 88px;
      color: #199893;   
      font-size: 30px;  
      font-weight: 600; 
      letter-spacing: 4px;  
      line-height: 41px;
      font-family: "Avenir";
      margin-top:1vh;
      font-weight: bold;
    }
    display: flex;
    width:100vw;
    justify-content: center;
    padding-top: 3rem;
`

const BoatraceCustomButton = Button.extend`
    margin-top:4vh;
    padding-bottom: 1vh;
    height: 82px; 
    width: 270px; 
    border: 5px solid #199893;  
    border-radius: 10px;  
    background-color: #FFFFFF;
    font-size:30px;
    // add image instead
`

const BoatraceGameTitleContainer = styled.div`
    width:100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const BoatraceGameDescriptionTitle = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'ReadySetTypeFont';
    color: #199893;
    font-size: 90px;  
    letter-spacing: 4.88px; 
    line-height: 129px;
    margin-top:5vh;
    @media only screen and (max-width: 900px) {
      font-size: 9vw;
    }
`

const BoatraceGameDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top:5vh;
    padding-bottom:5vh;
    color: #4A4A4A;   
    font-size: 23px;
    @media only screen and (max-width: 900px) {
      font-size: 2.5vw;
    }
`

const BoatraceDifficultySelection = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const BoatraceDifficultyText = styled.div`
    width:100vw;
    height:auto;
    display: flex;
    justify-content: center;
    padding-bottom: 3vh;
    color: #4A4A4A; 
    font-size: 28px;
    font-weight: bold;
`

const BoatraceGameSelectionBackground = styled.div`
    background-image: url(../public/images/games/waves.svg);
    background-position: center bottom -60vh;
    background-repeat: no-repeat;
    background-size: 100% auto;
    height: 100vh;
    @media only screen and (max-width: 1500px) {
      background-position: center bottom -55vh;
    }
    @media only screen and (max-width: 1400px) {
      background-position: center bottom -50vh;
    }
    @media only screen and (max-width: 1300px) {
      background-position: center bottom -40vh;
    }
    @media only screen and (max-width: 1150px) {
      background-position: center bottom -35vh;
    }
    @media only screen and (max-width: 1000px) {
      background-position: center bottom -30vh;
    }
    @media only screen and (max-width: 900px) {
      background-position: center bottom -20vh;
    }
`

class BoatLevelSelect extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      headerLinks: ["Games", "Learn", "Home"],
      isEzActive:false,
      isMidActive:false,
      isHardActive: false
    }
    this.BeginChallenge=this.BeginChallenge.bind(this)
    this.EzSelected= this.EzSelected.bind(this)
    this.MedSelected=this.MedSelected.bind(this)
    this.HardSelected=this.HardSelected.bind(this)
    
   
  }
  componentDidMount(){
    this.setState({isMidActive:true})
  }

  EzSelected()
  {
    this.setState({
      isEzActive:true,
      isMidActive:false,
      isHardActive: false
    })
    console.log("difficulty selected:Easy")
  }

  MedSelected()
  {
    this.setState({
      isEzActive:false,
      isMidActive:true,
      isHardActive: false
    })
    console.log("difficulty selected: Medium ")
  }

  HardSelected()
  {
    this.setState({
      isEzActive:false,
      isMidActive:false,
      isHardActive: true
    })
    console.log("difficulty selected: Hard" )
  }
  BeginChallenge(state){
    var difficulty="";
    if(state.isEzActive === true){
      difficulty="easy";
    }
    else if(state.isMidActive === true){
      difficulty="medium";
    }
    else {
      difficulty="hard";
    }
    /*figure out how to carry over difficulty to challenge*/
    this.props.commenceGame(difficulty);

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
        <BoatraceGameSelectionBackground>
          <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/>
          <BoatraceGameTitleContainer>
            <BoatraceGameDescriptionTitle>
                <p>Ready, Set, Type!</p>
            </BoatraceGameDescriptionTitle>
            <BoatraceGameDescription>
                <p>Type the long passages as quickly and accurately as you can. The faster</p>
                <p>you type, the faster your boat will travel. Try to beat your opponents and</p>
                <p>your own best WPM as you race towards the finish line!</p>
            </BoatraceGameDescription>

          </BoatraceGameTitleContainer>
          <BoatraceDifficultySelection>
            <BoatraceDifficultyText>
                <p> SELECT DIFFICULTY </p>
            </BoatraceDifficultyText>
            <DifficultyTab updateEz={this.EzSelected} updateMed={this.MedSelected} updateHard={this.HardSelected} gameSource="BoatRace"/>            
          </BoatraceDifficultySelection>
          <BoatracePlayButtonDiv>
            <BoatraceCustomButton onClick={() => this.BeginChallenge(this.state)}>
              <p>PLAY</p>
            </BoatraceCustomButton>
          </BoatracePlayButtonDiv>
      </BoatraceGameSelectionBackground>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(BoatLevelSelect);
