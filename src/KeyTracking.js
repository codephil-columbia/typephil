import React, { Component } from "react";
import Button from 'react-button-component'
import styled from 'styled-components';
import ReactCountdownClock from 'react-countdown-clock'
import Header from './components/header'
import Cocotype from './CocoType'
import { connect } from "net";

const Ready = Button.extend`
    margin-top:4vh;
    height: 82px;	
    width: 270px;	
    border: 5px solid #F5A623;	
    border-radius: 10px;	
    background-color: #FFFFFF;
    font-size:30px;
`


class KeyTracking extends Component{
    constructor(props){
        super(props);
        this.initiate=this.initiate.bind(this)
        this.beginGames=this.beginGames.bind(this)
        this.state={
            isPlayerReady:false,
            beginCountDown:false,
            gameStart:false,
            headerLinks: ["Games", "Learn", "Home"],
        };
    }


    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyPressed);
    }
    
    componentDidMount() {
        document.addEventListener('keydown', this.onKeyPressed);
       
    }

    onKeyPressed = (e) => {
        let isRightKey =e.key;
        console.log(isRightKey);
    };



    initiate(){
        this.setState({isPlayerReady:true})
        this.setState({beginCountDown:true})
    }
    
    beginGames(){
        this.setState({beginCountDown:false})
        this.setState({playerHasLost:false})
        this.setState({isPlayerReady:false})
        this.setState({gameStart:true})
    }

    
    
    render(){

    var content=`Time is money.
    Just go for it.
    Live the moment.
    Choose to shine.
    Your Time is Now.
    No pain, no gain.
    I can and I will.
    Let your love out.`

         // this == event, in this cases
        if(this.state.isPlayerReady)
        {
            {
                const { 
                    headerLinks, 
                  } = this.state;

                return(  
                    <div>
                        <Header links={headerLinks}></Header>
                        <div style={{width:"100vw", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <ReactCountdownClock seconds={3} onComplete={this.beginGames}/>
                        </div>
                    </div>

                )
            }
        }else if(this.state.gameStart){

            const { 
                headerLinks,
              } = this.state;
            
            return(
            <div>
                <Cocotype fullText={content}/>
            </div>
            )
        }else{
            const { 
                headerLinks, 
              } = this.state;
            return(
                <div>
                    <Header links={headerLinks}></Header>
                    <div className="ready-container" style={{width:"100vw", height:"100vh",display:"flex", alignItems:"center", justifyContent:"center" }} onClick={this.initiate}>
                        <Ready>Begin</Ready>
                    </div>
                </div>
            )
        }
    }
}

export default KeyTracking