import React, {Component} from 'react'
import Header from './components/header'
import Arcade from './fonts/arcade/ARCADE_N.ttf'
import Button from 'react-button-component'

import styled  from 'styled-components'
import './style/Statistics.css'


const NavigationContainer= styled.div`
    display:flex;
    justify-content:space-between;
    padding-left:3vw;
    width:96vw;

`


const CustomButton = Button.extend`
    @font-face {
        font-family: 'Arcade';
        src: url(${Arcade}) format('truetype');
        font-weight: normal;
        font-style: normal;
    } 
    margin-top:4vh;
    
    font-size:30px;
    font-family:"Arcade"

`

const StatsWrapper = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-evenly;
    align-content:center;
    text-align:center
`

const StatsRow = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-evenly
    align-content:center;
    text-align:center;
    width:100vw;

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
                    <StatsRow>
                        <DataContainer>
                            <p id="stats-data">92</p>
                            <p id="stats-text">WPM</p>
                        </DataContainer>
                        <DataContainer>
                            <p id="stats-data">25%</p>
                            <p id="stats-text">Accuracy</p>
                        </DataContainer>
                        <DataContainer>
                            <p id="stats-data">3</p>
                            <p id="stats-text">Level</p>
                        </DataContainer>
                    </StatsRow>
                    <StatsRow>
                        <DataContainer>
                            <p id="stats-data">92</p>
                            <p id="stats-text">WPM</p>
                        </DataContainer>
                        <DataContainer>
                            <p id="stats-data">25%</p>
                            <p id="stats-text">Accuracy</p>
                        </DataContainer>
                        <DataContainer>
                            <p id="stats-data">3</p>
                            <p id="stats-text">Level</p>
                        </DataContainer>
                    </StatsRow>
                </StatsWrapper>
                <NavigationContainer>
                        <CustomButton onClick={this.playAgain}>PLAY AGAIN</CustomButton>
                        <CustomButton>EXIT</CustomButton>
                </NavigationContainer>
            </div>
        )
    }

}


