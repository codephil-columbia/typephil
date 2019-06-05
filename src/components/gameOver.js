import React, { Component } from 'react';
import styled from 'styled-components';


const GameOverWrapper=styled.div`
    position:absolute;
    width:100vw;
    height:100vh;
    display:flex
    flex-direction:column;
    z-index:99999999999;
    text-align:center;
    align-items:center;
    justify-content:center;
    visibility: ${props => props.visible ? "visible" : "hidden"}

`

const GameOverText=styled.div`
    z-index:99999999999;
    width:50vw;
    height:10vh;
    font-size: 5rem;
    font-weight: bold;
    background-color: white;
    border: 5px solid #199893;
`

export default class GameOverSign extends Component{
    constructor(props) {
        super(props);
        this.state = {
            hidden:this.props.show,
            numFlashes:0,
            ref:0
        }
        this.flash=this.flash.bind(this)
        this.animate=this.animate.bind(this)
    }

    componentDidMount(){
        this.animate()
    }

    flash() {
        this.setState({
            hidden:!this.state.hidden,
            numFlashes:this.state.numFlashes+1
        })
        if(this.state.numFlashes>5){
            clearInterval(this.state.ref)
        }
    }
    animate(){
       this.setState({ref:setInterval(this.flash,1000)})
    }

    render(){
        return(
            <GameOverWrapper className="game-over" visible={this.state.hidden}>
                <GameOverText>GAME OVER</GameOverText>
                {this.props.isBoatGame && 
                <GameOverText>FINAL POSITION {this.props.place}</GameOverText>}
            </GameOverWrapper>

        )
    }
}