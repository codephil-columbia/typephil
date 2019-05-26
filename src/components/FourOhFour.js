import React, { Component } from 'react';
import Button from 'react-button-component';
import '../style/fourOhFour.css';



const CustomButton = Button.extend`
    margin-top:10vh;
    font-size:1.5rem;
    color: #52B094;

`

export default class FourOhFour extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
          headerLinks: ["Learn", "Home" ],
          badges: ["WPM", "Accuracy"],
          badgeDescriptions: [
            "Words Per Minute. \n The faster you type, \n the higher the number",
            "Accuracy is how \n accurately you type \n words that appear."
          ]
        }
        this.exitGame = this.exitGame.bind(this)

    }

    exitGame = () =>{
        this.props.history.push("/selectGames")
      }
    
    render(){
        console.log(this.props)
    return (
            <div className="container fourOhFourWrap">
            <CustomButton onClick={this.exitGame}>Start</CustomButton>
            </div>
        )
    }
}

