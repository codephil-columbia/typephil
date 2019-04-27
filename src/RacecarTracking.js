import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import styled from 'styled-components'; 

const BACKSPACE = "Backspace";
const ENTER = "Enter";


const RCGameText = styled.div`
    margin-top:4vh;
    height: 10vh;	
    width: 80vw;	
    border: 5px solid #F5A623;	
    border-radius: 10px;	
    background-color: #FFFFFF;
    font-size: 3.5rem;
    display:flex;
    justify-content:center;
  
`
class RacecarTracking extends Component {
    constructor(props) {
        super(props);
        this.doesWordExist=this.doesWordExist.bind(this)
       // this.handleSubmit=this.handleSubmit.bind(this)


        this.state = {
            wordList:[], 
            wordMap:{}, 
            currentWord: ""
        }
    }

    componentDidMount(){
        this.setState({
            wordList: ["hi", "hello", "yay", "wow", "word", "mehhh", "wowword"], 
            wordMap: this.state.wordList.map((word) => word)
        })

         this.attachEventListener(); 

    }

    doesWordExist = (checkWord) => {
        console.log("!!!")
        console.log(this.state.wordList.includes(checkWord))
        return this.state.wordList.includes(checkWord)
    }

    attachEventListener = () => {
        document.addEventListener("keydown", this.registerUserKeyPress);
      }

    //handleSubmit(event) {
    //    event.
        
   // }
    //need this to check enter and backspace 
    registerUserKeyPress = ({ key: keyPressed }) => {
    // Starts timer once user presses first key
    // if(this.state.isFirstCharacter) {
    //   this.setState({ startTime: Date.now(), isFirstCharacter: false });
    // }

    //console.log(keyPressed) 
    console.log(this.state.currentWord)
    if (keyPressed == BACKSPACE){

        this.setState({currentWord:this.state.currentWord.slice(0, -1)})
        //this.state.currentWord= this.state.currentWord.slice(0, -1)
    }

    else if (keyPressed == ENTER){
        //this.state.currentWord= this.state.currentWord + ' '

        this.doesWordExist(this.state.currentWord)
        //for(let i = 0; i < this.state.currentWord.length; i++){
           // this.state.currentWord= this.state.currentWord.slice(0, -1)
            
       //}
       var empty = ''
       this.setState({currentWord:''})

    }
    else {
        this.setState({currentWord:this.state.currentWord + keyPressed})
    }
    //console.log(this.state.currentWord)

    // if(keyPressed === BACKSPACE) {
    //   this.userDidPressBackspace();
    //   // TODO: Make sure this doesn't fire after group and index ptr have reached the end
    // } else if(this.shouldCheckKey(keyPressed) && this.isNotFinished()) {
    //   this.validateUserKeyPressCorrectness(keyPressed);
    // }
    }



    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                 {this.doesWordExist('hi')}
                <div><p>{this.state.currentWord}</p></div>
                
                </form>
            </div>
        )
    }
}

export default (RacecarTracking); 

//make an input box 
//listen 
//clear text box
//call function wordExists 
//<textarea rows='1' cols = '50'></textarea> <textarea rows='1' cols = '50'></textarea> 