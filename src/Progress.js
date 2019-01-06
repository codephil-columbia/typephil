import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'rc-progress';

import ShowSpinner from './components/spinner';
import Header from './components/header';
import avgUserStats from './components/avgUserStats';

import { 
  getCurrentLessonForUser,
  getAverageStats,
  getChapterProgress
} from './actions/progress';

import "./style/styles.css";
import "./style/Progress.css";

class Progress extends Component {
  constructor(props) {
      super(props);

      const { uid } = this.props.currentUser;
      this.setup(uid);

      this.state = {
        headerLinks: ["Learn", "Home" ],
        badges: ["WPM", "Accuracy"],
        badgeDescriptions: [
          "Words Per Minute. \n The faster you type, \n the higher the number",
          "Accuracy is how \n accurately you type \n words that appear."
        ]
      }
  }

  setup(uid) {
    this.props.getCurrentLessonForUser(uid);
    this.props.getAverageStats(uid);
    this.props.getChapterProgress(uid);
  }

  redirectLesson = () => {
      this.setState({redirectLesson: true})
  }

  formatText = (chapterName, lessonName) => {
    const title = `${chapterName.split(":")[0]} | ${lessonName.split(":")[0]}`
    const lesson = lessonName.split(":")[1];
    return { title, lesson };
  }

  render() {
    console.log(this.props);
    const { 
      badges, 
      headerLinks, 
      badgeDescriptions 
    } = this.state;
    const { 
      chapterName, 
      lessonName, 
      hasFinishedLoading, 
      imagePath,
      avgWPM,
      avgAccuracy,
      isStatsLoading,
      percentageComplete,
      isPercentageLoading,
    } = this.props;

    if(!hasFinishedLoading || isStatsLoading || isPercentageLoading) {
      return ShowSpinner();
    }

    const { title, lesson } = this.formatText(chapterName, lessonName);
    const stats = avgUserStats(badges, badgeDescriptions, [avgWPM, avgAccuracy]);
    const { username } = this.props.currentUser

    return (
      <div>
        <Header links={headerLinks} isLoggedIn={true} username={username} />
        <div className="container">
          <div className="quickstart row">
            <div className="qs-lesson-info column" align="left">
              <h3 className="qs-lesson-title">SKRRT</h3>
              <h3 className="qs-lesson-excersise">WE THE BEST MUSIC</h3>
              <div className="homepage-spacing"> </div>
              <Line 
                percent={percentageComplete} 
                strokeWidth="2" 
                strokeColor="#77BFA3" 
              />
              <div>
                <h4 className="qs-progress-info">
                  Current Progress - {percentageComplete}%
                </h4>
              </div>
            </div>
            <div className="column">
              <h3 className="qs-lesson-title">SKRRT</h3>
              <h3 className="qs-lesson-excersise">WE THE BEST MUSIC</h3>
              <img src={imagePath} alt="lesson" className="homepage-chapter-image"></img>
            </div>
          </div>
          <hr className="line row"/>
          {stats}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ auth, app, statsForUser, chapterProgressPercentage }) => {
  return {
    lessonName: app.currentLesson.lessonName,
    chapterName: app.currentLesson.chapterName,
    hasFinishedLoading: app.currentLesson.hasFinishedLoading,
    showSpinner: app.currentLesson.showSpinner,
    imagePath: app.currentLesson.chapterImage,
    avgWPM: statsForUser.avgWPM,
    avgAccuracy: statsForUser.avgAccuracy,
    isStatsLoading: statsForUser.isStatsLoading,
    percentageComplete: chapterProgressPercentage.percentageComplete,
    isPercentageLoading: chapterProgressPercentage.isPercentageLoading,
    currentUser: auth.currentUser,
    isLoggedIn: auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ 
    getCurrentLessonForUser,
    getAverageStats,
    getChapterProgress
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Progress);
