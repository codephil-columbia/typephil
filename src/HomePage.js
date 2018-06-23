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

      this.props.getCurrentLessonForUser("bbu9uqje8cdm8j5109ug");
      this.props.getAverageStats("bbu9uqje8cdm8j5109ug");
      this.props.getChapterProgress("bbu9uqje8cdm8j5109ug");

      this.state = {
        headerLinks: ["Learn", "Progress" ], //"Home"],
        badges: ["WPM", "Accuracy", "Badges"],
        badgeDescriptions: [
          "Words Per Minute. \n The faster you type, \n the higher the number",
          "Accuracy is how \n accurately you type \n words that appear.",
          "The number of badges \n you have \n earned so far."
        ]
      }
  }

  redirectLesson = () => {
      this.setState({redirectLesson: true})
  }

  splitBadgeDescriptionByLine = desc => {
    return desc.split('\n');
  }

  formatText = (chapterName, lessonName) => {
    const title = `${chapterName.split(":")[0]} | ${lessonName.split(":")[0]}`
    const lesson = lessonName.split(":")[1];
    return { title, lesson };
  }

  render() {
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
      isPercentageLoading
    } = this.props;

    if(!hasFinishedLoading || isStatsLoading || isPercentageLoading) {
      return ShowSpinner();
    }

    const { 
      title, 
      lesson 
    } = this.formatText(chapterName, lessonName);

    const stats = avgUserStats(
      badges, 
      badgeDescriptions, 
      [avgWPM, avgAccuracy, 0 ]
    );

    return (
      <div>
        <Header links={headerLinks}/>
        <div className="container">
          <div className="title row">
            <h1>Welcome Back, Phil!</h1>
          </div>
          <div className="quickstart row">
            <div className="qs-lesson-info column">
              <h3 className="qs-lesson-title">{title}</h3>
              <h3 className="qs-lesson-excersise">{lesson}</h3>
              <Link to="/tutorial">
                <button className="button button-outline start">Start</button>
              </Link>
              <Line percent={percentageComplete} 
                strokeWidth="2" 
                strokeColor="#77BFA3" 
              />
              <div>
                <h4 className="qs-progress-info">
                  Current Progress - {percentageComplete}%
                </h4>
              </div>
            </div>
            <div className="qs-image column">
              <img src={imagePath} alt="lesson"></img>
            </div>
          </div>
          <hr className="line row"/>
          {stats}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ app, statsForUser, chapterProgressPercentage }) => {
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
    isPercentageLoading: chapterProgressPercentage.isPercentageLoading
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
