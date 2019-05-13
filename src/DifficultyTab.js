import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom'
import Arcade from './fonts/arcade/ARCADE_N.ttf'
import styled from 'styled-components';
import { NavigationFullscreenExit } from 'material-ui/svg-icons';
import directions from 'material-ui/svg-icons/maps/directions';


const DifficultyLevelWrapper = styled.div`
display:flex;
flex-direction:column;
align-items:center;
`

const DifficultyLevel = styled.div`
@font-face {
  font-family: 'Arcade';
  src: url(${Arcade}) format('truetype');
  font-weight: normal;
  font-style: normal;
}  
  font-family:'Arcade';
  font-size:3rem;
  color: ${props => props.isActive ? '#F5A623' :'#4A4A4A' };
  background-color: white;
`
const DifficultyContainer=styled.div`
display:flex;
width:100vw;
justify-content: space-evenly;

`

const DifficultyPointer = styled.div`
  display:flex;
  justify-content:center;
  visibility: ${props => props.selected ? 'visible' : 'hidden'};
`

export default class DifficultyTab extends Component {
  constructor(props) {
    super(props);
    this.state={
      ezChosen:false,
      midChosen:false,
      hardChosen:false
    }
    this.disableOtherOptions = this.disableOtherOptions.bind(this);
    this.ezEnabled   = this.ezEnabled.bind(this);
    this.medEnabled  = this.medEnabled.bind(this);
    this.hardEnabled = this.hardEnabled.bind(this);
 
  }
  disableOtherOptions(){
    this.setState(
      {
        ezChosen:false,
        medChosen:false,
        hardChosen:false
      }
    )
  }

  ezEnabled(){
    this.disableOtherOptions();
    this.setState({ezChosen:true});
    this.props.updateEz();
  }

  medEnabled(){
    this.disableOtherOptions();
    this.setState({medChosen:true})
    this.props.updateMed();
  }
  
  hardEnabled(){
    this.disableOtherOptions();
    this.setState({hardChosen:true})
    this.props.updateHard();
  }
  
  
  render() {
      return (
          <div>
          <DifficultyContainer>
            <DifficultyLevelWrapper onClick={this.ezEnabled}>
              <DifficultyPointer selected={this.state.ezChosen}><img src="/images/games/Yellow_Arrow.svg"/></DifficultyPointer>
              <DifficultyLevel isActive={this.state.ezChosen}>Easy</DifficultyLevel>
            </DifficultyLevelWrapper>
          

            <DifficultyLevelWrapper onClick={this.medEnabled}>
              <DifficultyPointer selected={this.state.medChosen}><img src="/images/games/Yellow_Arrow.svg"/></DifficultyPointer>
              <DifficultyLevel isActive={this.state.medChosen}>Medium</DifficultyLevel>
            </DifficultyLevelWrapper>
          
            
            <DifficultyLevelWrapper onClick={this.hardEnabled}>
                <DifficultyPointer selected={this.state.hardChosen}><img src="/images/games/Yellow_Arrow.svg"/></DifficultyPointer>
                <DifficultyLevel isActive={this.state.hardChosen}>Hard</DifficultyLevel>
            </DifficultyLevelWrapper>
          </DifficultyContainer>
          </div>
    )
  }
}

 