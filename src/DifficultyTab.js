import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style/DifficultyTab.css';
import styled from 'styled-components';
import Arcade from './fonts/arcade/ARCADE_N.ttf'

const DifficultyLevel = styled.div`
@font-face {
  font-family: 'Arcade';
  font-style: normal;
  font-weight: 600;
  src:url(${Arcade});
}

  font-family:'Arcade';
  font-size:3rem;
`


const DifficultyPointer = styled.div`
  display:flex;
  justify-content:center;

`


export default class DifficultyTab extends Component {
  constructor(props) {
    super(props);
    this.state={
      opacity:false,
      isActive:false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState( prevState => ({
      isActive: !prevState.isActive
    }));
  }

  
  
  render() {

      return (
          <div>
            <DifficultyPointer>
            ****
            </DifficultyPointer>
            <DifficultyLevel>
                <p>{this.props.difficulty}</p>
            </DifficultyLevel>
          </div>
    )
  }
}

