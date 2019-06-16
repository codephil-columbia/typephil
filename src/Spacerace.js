import React, { Component } from 'react';
import styled from 'styled-components'
import Button from 'react-button-component'

import Header from './components/header'
import DifficultyTab from './DifficultyTab'
import ShowSpinner from './components/spinner';
import { LocalStorageCache } from './services';

const SpaceracePlayButtonDiv = styled.div`
    p {
      text-align: center;
      height: 44px; 
      width: 88px;
      color: ##326BAE;   
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

const SpaceraceCustomButton = Button.extend`
    margin-top:4vh;
    padding-bottom: 2vh;
    height: 82px; 
    width: 270px; 
    border: 5px solid #326BAE;  
    border-radius: 10px;  
    background-color: #FFFFFF;
    font-size:30px;
    // add image instead
`

const SpaceraceGameTitleContainer = styled.div`
    width:100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const SpaceraceGameDescriptionTitle = styled.div`
    display: flex;
    justify-content: center;
    font-family: 'SpaceRaceFont';
    color: #326BAE;
    font-size: 90px;  
    letter-spacing: 4.88px; 
    line-height: 129px;
    margin-top:5vh;

    @media only screen and (max-width: 900px) {
      font-size: 9vw;
    }
`

const SpaceraceGameDescription = styled.div`
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

const SpaceraceDifficultySelection = styled.div`
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SpaceraceDifficultyText = styled.div`
    width:100vw;
    height:auto;
    display: flex;
    justify-content: center;
    padding-bottom: 3vh;
    color: #4A4A4A; 
    font-size: 28px;
    font-weight: bold;
`

const SpaceraceGameSelectionBackground = styled.div`
    background-image: url(./images/games/space_race_background.svg);
    // background-position: center bottom -55vw;
    background-position: center bottom -5vw;
    background-repeat: no-repeat;
    background-size: 100% auto;
    height: 100vh;

    @media only screen and (max-width: 1150px) {
      background-position: center bottom;
    }

    @media only screen and (max-width: 900px) {
      background-position: center bottom;
    }
`


class Spacerace extends Component {
  constructor(props) {
    super(props);

    this.cache = new LocalStorageCache();

    this.state = { 
      headerLinks: ["Games", "Learn", "Home"],
      isEzActive:false,
      isMidActive:false,
      isHardActive: false,

      isLoggedIn: this.cache.get("isLoggedIn"),
      username: this.cache.get("username")
    }
    this.BeginSpaceRace=this.BeginSpaceRace.bind(this)
    this.EzSelected= this.EzSelected.bind(this)
    this.MedSelected=this.MedSelected.bind(this)
    this.HardSelected=this.HardSelected.bind(this)
  }

  EzSelected()
  {
    this.setState({
      isEzActive:true,
      isMidActive:false,
      isHardActive: false
    })
    console.log("difficulty selected:easy")
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

  BeginSpaceRace(state){
    var difficulty="";
    console.log(state.isEzActive)
    console.log(state.isMidActive)
    console.log(state.isHardActive)
    if(state.isEzActive)
    {
      difficulty="easy"
    }
    else if(state.isMidActive)
    {
      difficulty="medium"
    }
    else if(state.isHardActive)
    {
      difficulty="hard"
    }
    console.log(difficulty)
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
        <SpaceraceGameSelectionBackground>
          <Header links={headerLinks} isLoggedIn={this.state.isLoggedIn} username={this.state.username}/>
          <SpaceraceGameTitleContainer>
            <SpaceraceGameDescriptionTitle>
                <p>Spacerace</p>
            </SpaceraceGameDescriptionTitle>
            <SpaceraceGameDescription>
                <p>Type the words on the asteroids as they appear to eliminate them before they make</p>
                <p>impact on Earth. Each time an asteroid makes it through, you will lose a life. You</p>
                <p>start with three lives. You can gain a life each time you make it to the next level. As</p>
                <p>the levels increase, the number of asteroids also increase in number.</p>
            </SpaceraceGameDescription>

          </SpaceraceGameTitleContainer>
          <SpaceraceDifficultySelection>
            <SpaceraceDifficultyText>
                <p> SELECT DIFFICULTY </p>
            </SpaceraceDifficultyText>
            <DifficultyTab updateEz={this.EzSelected} updateMed={this.MedSelected} updateHard={this.HardSelected} gameSource="SpaceRace"/>            
          </SpaceraceDifficultySelection>
          <SpaceracePlayButtonDiv>
            <SpaceraceCustomButton onClick={() => this.BeginSpaceRace(this.state)}>
              <p>PLAY</p>
            </SpaceraceCustomButton>
          </SpaceracePlayButtonDiv>
      </SpaceraceGameSelectionBackground>
    )
  }
}


export default Spacerace; 

