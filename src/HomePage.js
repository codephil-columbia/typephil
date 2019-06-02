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
} from './actions/homepage';

import "./style/styles.css";
import "./style/HomePage.css";

class HomePage extends Component {
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
        <Header links={headerLinks} isLoggedIn={true} username={username} history={this.props.history}/>
        <div className="container">
          <div className="title-homepage row">
            <p className="homepage-welcome">Welcome Back, {username}!</p>
          </div>
          <div className="quickstart row">
            <div className="qs-lesson-info column" align="left">
              <h3 className="qs-lesson-title">{title}</h3>
              <h3 className="qs-lesson-excersise">{lesson}</h3>
              <Link to="/tutorial">
                <img src="images/buttons/Start-button.svg"/> 
              </Link>
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
            <div className="qs-image column chapter-image-homepage">
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
    chapter: app.chapter,
    hasFinishedLoading: app.currentLesson.hasFinishedLoading,
    showSpinner: app.currentLesson.showSpinner,
    imagePath: app.currentLesson.chapterImage,
    avgWPM: statsForUser.wpm,
    avgAccuracy: statsForUser.accuracy,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
