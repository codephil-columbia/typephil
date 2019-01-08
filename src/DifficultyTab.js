import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './style/DifficultyTab.css';
import styled from 'styled-components';
import Arcade from './fonts/arcade/ARCADE_N.TTF'

const difficultyLevel = styled.div`

`

{/*finish implementing custom font for styled components */}

const diffcultyPointer = styled.div`
`


export default class DifficultyTab extends Component {
  constructor(props) {
    super(props);
    this.state={
      opacity:false,
      isActive:false
    }
  }

  onSelection(){
   
  }
  
  render() {

      return (
          <div>
            <div className="difficulty-pointer">
            ****
            </div>
            <difficultyLevel>
              {this.props.difficulty}
            </difficultyLevel>
          </div>
    )
  }
}

