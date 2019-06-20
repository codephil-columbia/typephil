import React, { Component } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import Header from './components/header';
import Button from 'react-button-component';
import styled from 'styled-components';
import { LocalStorageCache } from "./services";

import ExamPage from './ExamPage'
import ExamStatistics from './ExamStats'

import './style/font.css';


const LeftExamSelectionPanel = styled.div`
	float: left;
	width: 50%;
	height: 93vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const RightExamSelectionPanel = styled.div`
	float: right;
	width: 50%;
	height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: 1px solid #52B094;
    padding-top: 20vh;
`

const FiveMinuteSelection = styled.div`
	font-size: 5rem;
	font-weight: bold;
	height: 33%;
	text-align: center;
	padding-top: 10vh;
	cursor: pointer;
	color: ${props => props.isActive ? '#F5A623' :'#4A4A4A' };
	@media only screen and (max-width: 1150px) {
		font-size: 4rem;
	}
`

const ThreeMinuteSelection = styled.div`
	font-size: 5rem;
	font-weight: bold;
	height: 33%;
	text-align: center;
	padding-top: 12vh;
	cursor: pointer;
	color: ${props => props.isActive ? '#F5A623' :'#4A4A4A' };
	@media only screen and (max-width: 1150px) {
		font-size: 4rem;
	}
`

const OneMinuteSelection = styled.div`
	font-size: 5rem;
	font-weight: bold;
	height: 33%;
	text-align: center;
	padding-top: 11vh;
	cursor: pointer;
	color: ${props => props.isActive ? '#F5A623' :'#4A4A4A' };
	@media only screen and (max-width: 1150px) {
		font-size: 4rem;
	}
`

const ExamSelectionLine = styled.div`
	border-bottom: 1px solid #979797;
	width: 10vw;
`

const InstructionsHeader = styled.div`
	padding-top: 4vh;
	font-size: 2.5rem;
	font-weight: bold;
	color: #52B094;
`

const InstructionsDescription = styled.div`
	padding-top: 2.5rem;
	padding-right: 10vw;
	padding-left: 10vw;
	font-size: 1.75rem;
`



const ExamSelectionButton = Button.extend`
	margin-top: 4vh;
	background-color: #52B094;
	border-radius: 10px;
	font-size: 1.5rem;
	color: white;
`

export default class ExamSelection extends Component {
  	constructor(props) {
	    super(props);
	    this.cache = new LocalStorageCache();
	    this.state = { 
				headerLinks: ["Stats", "Games", "Learn", "Home"],
				oneMinuteExamEnabled:false,
				showOneMinuteExam:false,
				threeMinuteExamEnabled:false,
				showThreeMinuteExam:false,
				fiveMinuteEnabled:false,
				showfiveMinuteExam:false,
				username: this.cache.get("username"),
	    }
		this.oneMinuteExamSelected = this.oneMinuteExamSelected.bind(this);
		this.threeMinuteExamSelected = this.threeMinuteExamSelected.bind(this);
		this.fiveMinuteExamSelected = this.fiveMinuteExamSelected.bind(this);
		this.returnToSelection=this.returnToSelection.bind(this)
		this.BeginExam = this.BeginExam.bind(this)
		this.exit=this.exit.bind(this)
    }

    componentDidMount(){
    	this.setState({
	      oneMinuteExamEnabled:true,
	      threeMinuteExamEnabled:false,
	      fiveMinuteExamEnabled:false,
	      gameDescription: "\
			Test how accurately and quickly you can type. \
			Once the test is completed, \
			you will get feedback on how many words you typed, \
			how quickly you typed, and how accurately you typed.\
	      ",
    	})
    }

    oneMinuteExamSelected()
    {
    	this.setState({
				oneMinuteExamEnabled:true,
	      threeMinuteExamEnabled:false,
	      fiveMinuteExamEnabled:false,
	      examDescription: "\
			Test how accurately and quickly you can type. \
			Once the test is completed, \
			you will get feedback on how many words you typed, \
			how quickly you typed, and how accurately you typed.\
	      ",
    	})
		}
		
		returnToSelection(){
			this.setState({
				showBoatRace:false,
				showChallenge:false,
				showSpaceRace:false
			})
		}

    threeMinuteExamSelected()
    {
    	this.setState({
				oneMinuteExamEnabled:false,
	      threeMinuteExamEnabled:true,
	      fiveMinuteExamEnabled:false,
	      examDescription: "\
			Test how accurately and quickly you can type. \
			Once the test is completed, \
			you will get feedback on how many words you typed, \
			how quickly you typed, and how accurately you typed.\
	      ",
    	})
    	console.log("boatrace selected")
    }

    fiveMinuteExamSelected()
    {
    	this.setState({
				oneMinuteExamEnabled:false,
	      threeMinuteExamEnabled:false,
	      fiveMinuteExamEnabled:true,
	      examDescription: "\
			Test how accurately and quickly you can type. \
			Once the test is completed, \
			you will get feedback on how many words you typed, \
			how quickly you typed, and how accurately you typed.\
	      ",
    	})
    	console.log("challenge selected")
		}
		
		BeginExam(){
			if (this.state.oneMinuteExamEnabled === true){
				this.setState({showOneMinuteExam:true})
			} else if (this.state.threeMinuteExamEnabled === true){
				this.setState({showThreeMinuteExam:true})
			} else if (this.state.fiveMinuteExamEnabled === true){
				this.setState({showFiveMinuteExam:true})
				console.log("was reached")
			}	
		}

		exit= () =>{
			this.setState({
				showOneMinuteExam:false,
				showThreeMinuteExam:false,
				showFiveMinuteExam:false
			})
		}

    render() {
	    const { 
				headerLinks,
				badges, 
				username,
				showOneMinuteExam,
				showThreeMinuteExam,
				showFiveMinuteExam
			} = this.state;
			
			if(showOneMinuteExam){
				return(<ExamPage exit={this.exit} time={1} onLogout={this.props.onLogout} history={this.props.history}/>)
			}else if(showThreeMinuteExam){
				return(<ExamPage time={3} onLogout={this.props.onLogout} history={this.props.history}/>)
			}else if(showFiveMinuteExam){
				return(<ExamPage time={5} onLogout={this.props.onLogout} history={this.props.history}/>)
			}else{
        return(
            <div>
            	<Header 
            		links={headerLinks}
            		isLoggedIn={true}
            		username={username}
            		history={this.props.history}
            		onLogout={this.props.onLogout}
            	/>
            	<LeftExamSelectionPanel>
            		<OneMinuteSelection onClick={this.oneMinuteExamSelected} 
            		isActive={this.state.oneMinuteExamEnabled}>
            			One Minute
            		</OneMinuteSelection>

            		<ExamSelectionLine/>

            		<ThreeMinuteSelection onClick={this.threeMinuteExamSelected} 
            		isActive={this.state.threeMinuteExamEnabled}>
            			Three Minutes
            		</ThreeMinuteSelection>

            		<ExamSelectionLine/>

            		<FiveMinuteSelection onClick={this.fiveMinuteExamSelected} 
            		isActive={this.state.fiveMinuteExamEnabled}>
            			Five Minutes
            		</FiveMinuteSelection>
            	</LeftExamSelectionPanel>


            	<RightExamSelectionPanel>
            		<InstructionsHeader>
            			INSTRUCTIONS
            		</InstructionsHeader>

            		<InstructionsDescription>
            			{this.state.gameDescription}

            		</InstructionsDescription>

		            <ExamSelectionButton onClick={() => this.BeginExam()}>
		              <p>START TEST</p>
		            </ExamSelectionButton>

            	</RightExamSelectionPanel>
            </div>
				)
			}
    }
}