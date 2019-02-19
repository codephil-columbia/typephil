import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'rc-progress';

import ShowSpinner from './components/spinner';
import Header from './components/header';
import avgUserStats from './components/avgUserStats';
import avgUserStat from './components/avgUserStat';

import {
  getCurrentLessonForUser,
  getAverageStats,
  getChapterProgress
} from './actions/progress';

import "./style/styles.css";
import "./style/Progress.css";

var LineChart = require("react-chartjs").Line;

class Progress extends Component {
  constructor(props) {
      super(props);

      const { uid } = this.props.currentUser;
      this.setup(uid);

      this.state = {
        headerLinks: ["Learn", "Home" ],
        badges: ["WPM", "Accuracy"],
        badgeDescriptions: [
          "",
          ""
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
    var chartOptions = {
      scaleShowHorizontalLines: true
    };

        var chartData= {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
              }
            ]
    };

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
    // separate stats into two separate components
    const wpmStat = avgUserStat(badges[0], avgWPM, 0, "This is your average\nWords Per Minute score.\n");
    const accStat = avgUserStat(badges[1], avgAccuracy, 1, "This is your average\n accuracy rate.\n");
    const { username } = this.props.currentUser

    return (
      <div>
        <Header links={headerLinks} isLoggedIn={true} username={username} />
        <div className="container">
          <div className="quickstart row">
            <div className="column" align="left">
              <h2 className="title" align="left">My Progress</h2>
            </div>
          </div>
          <div className="quickstart row">
            <div className="qs-lesson-info column" align="left">
              {wpmStat}
            </div>
            <div className="column">
              <LineChart data={chartData} options={chartOptions}/>
            </div>
          </div>
          <div className="quickstart row">
            <div className="qs-lesson-info column" align="left">
              {accStat}
            </div>
            <div className="column">
              <LineChart data={chartData} options={chartOptions}/>
            </div>
          </div>
          <hr className="line row"/>
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
