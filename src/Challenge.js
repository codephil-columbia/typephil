import React, { Component } from 'react';
import './style/Challenge.css';
import './style/styles.css';
import Button from 'react-button-component'
import Header from './components/header'
import DifficultyTab from './DifficultyTab'
import ShowSpinner from './components/spinner';

const CustomButton = Button.extend`
    margin-top:4vh;
    height: 82px;	
    width: 270px;	
    border: 5px solid #F5A623;	
    border-radius: 10px;	
    background-color: #FFFFFF;
    font-size:30px;

`

class Challenge extends Component {
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
  BeginChallenge(state){
    var difficulty="";
    if(state.isEzActive == true)
    {
      difficulty="easy"
    }
    else if(state.isMidActive == true)
    {
      difficulty="medium"
    }
    else (state.isHardActive == true)
    {
      difficulty="hard"
    }
    /*figure out how to carry over difficulty to challenge*/
    this.props.history.push("/cocotype");

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
        <div className="challenge-game-selection-background">
          <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/>
          <div className="game-title-container">
            <div className="game-description-title">
                <p>Challenge</p>
            </div>
            <div className="game-description">
                <p>Type as many phrases as possible before time runs out.</p>
                <p>Everytime you correctly type a phrase, more time will be added to</p>
                <p>your counter and your streak will increase.</p>
            </div>

          </div>
          <div className="difficulty-selection">
            <div className="difficulty-text">
                <p> SELECT DIFFICULTY </p>
            </div>
            <DifficultyTab updateEz={this.EzSelected} updateMed={this.MedSelected} updateHard={this.HardSelected}/>            
          </div>
          <div className="play-button">
            <CustomButton onClick={() => this.BeginChallenge(this.state)}>
              <p>PLAY</p>
            </CustomButton>
          </div>

      </div>
    )
  }
}

export default Challenge;
