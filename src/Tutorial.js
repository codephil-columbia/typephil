import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './style/Tutorial.css'

import { 
  moveIndexPtr, 
  unFreeze, 
  freeze, 
  completedTutorial,
  fetchCurrentLessonIfNeeded
} from './actions/tutorial';

import LessonTutorialButtons from './components/TutorialButtons';
import TutorialContent from './components/TutorialContent';
import Header from './components/header';
import Keyboard from './components/Keyboard';
import RightHand from './components/RightHand';
import LeftHand from './components/LeftHand';

class Tutorial extends Component {

  constructor(props) {
    super(props);
    
    this.props.fetchCurrentLessonIfNeeded(this.props.currentUser.uid);

    const { currentLesson } = this.props;
    const { lessonContent, lessonInformation } = currentLesson;

    const contentLength = lessonContent.length;
    const infoLength = lessonInformation.length;

    this.state = {
      contentLength,
      infoLength,
      lessonContent,
      lessonInformation,
      indexPtr: 0,
      isFinished: false,
      shouldFreeze: true,
      wpm: 0,
      totalTime: 0,

      headerLinks: ["Learn", "Progress", "Home"],
    };
  }

  componentWillMount = () => {
    this.freezeTimerIfIsLessonInfo();
  }

  setTutorialStats = ({ wpm, time, accuracy }) => {
    this.setState({ wpm, accuracy, time });
  }

  calculateTime = txt => {
    // Sang's ~magical algorithm~
    return (txt.length/5) * 60/200 * 100;
  };

  next = () => {
    let { indexPtr, contentLength } = this.state;
    if(indexPtr + 1 < contentLength) {
      indexPtr += 1;
      this.freezeTimerIfIsLessonInfo();
    }
    this.setState({ indexPtr });
  };

  prev = () => {
    let { indexPtr } = this.state;
    if(indexPtr - 1 < 0) {
      indexPtr = 0;
    } else {
      indexPtr -= 1;
    }

    this.setState({ indexPtr });
  };

  finishedLesson = () => {
    console.log("FINISHED");
    this.setState({ isFinished: true });
  };

  getNextPair = () => {
    const {
      indexPtr,
      lessonContent,
      lessonInformation
    } = this.state;

    if(indexPtr >= lessonContent.length) {
      this.finishedLesson();
    }

    return { 
      content: lessonContent[indexPtr],
      info: lessonInformation[indexPtr]
    }
  };

  freezeTimerIfIsLessonInfo = () => {
    const { indexPtr, lessonInformation } = this.state;
    if(!lessonInformation[indexPtr]) {
      return;
    }
    const totalTime = this.calculateTime(lessonInformation[indexPtr]);
    this.setState({ shouldFreeze: true });
    setTimeout(() => {
      this.setState({ shouldFreeze: false });
    }, totalTime);
  };

  showTutorialStats = () => {
    console.log("tutorialstats");
  };

  render() { 
    const { 
      headerLinks, 
      lessonContent, 
      lessonInformation, 
      indexPtr,
      contentLength,
      isFinished,
      shouldFreeze
    } = this.state;

    const { content, info } = this.getNextPair();
    const isActive = content !== "";

    //TODO: decouple keyboard & hands from this component to be apart of TutorialContent
    return (
      <div>
        <Header links={headerLinks}/>
        <div className="container tutorial">
          {!isActive && <div className="info-text">
            <h4>{info}</h4>
          </div>}
          {isActive && <TutorialContent
            currentContent={content}
            isActive={isActive}
            completed={this.finishedLesson}
            completedStats={this.setTutorialStats}
            isFinished={isFinished}
            currentUser={this.props.currentUser}
          />}
          {!isActive && !isFinished && <div className="tutorial-hands-keyboard">
            <LeftHand />
            <Keyboard />
            <RightHand />
          </div>}
          <LessonTutorialButtons 
            next={this.next} 
            prev={this.prev} 
            isNextActive={shouldFreeze}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({ 
    moveIndexPtr, 
    unFreeze, 
    freeze, 
    completedTutorial, 
    fetchCurrentLessonIfNeeded 
  }, dispatch)
}

const mapStateToProps = ({ app, auth }) => ({
  currentLesson: app.currentLesson,
  currentUser: auth.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial);
