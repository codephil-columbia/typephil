import React, { Component } from 'react';
import { Redirect, Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spinkit';

import Header from './components/header';

import { getCurrentLessonForUser } from './actions/homepage';

import "./style/styles.scss";
import "./style/HomePage.css";

class HomePage extends Component {
  constructor(props) {
      super(props);

      this.props.getCurrentLessonForUser("bbu9uqje8cdm8j5109ug");

      this.state = {
        headerLinks: ["Learn", "Progress", "Home"],
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
    const { badges, headerLinks, badgeDescriptions } = this.state;
    const { chapterName, lessonName, hasFinishedLoading, imagePath  } = this.props;
    console.log(imagePath);
    if(!hasFinishedLoading) {
      return <Spinner name='double-bounce' />
    }

    const { title, lesson } = this.formatText(chapterName, lessonName);
    return (
      <div>
        <Header links={headerLinks}/>
        <div className="content">
          <div className="title">
            <h1>Welcome Back, Phil!</h1>
          </div>
          <div className="quickstart">
            <div className="qs-lesson-info">
              <h3 className="qs-lesson-title">{title}</h3>
              <h3 className="qs-lesson-excersise">{lesson}</h3>
              <Link to="/learn"><button className="button button-outline start">Start</button></Link>
              <div className="qs-progress">
                <div className="progress">
                  <div className="progress-bar w-25" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div>
                  <h4 className="qs-progress-info">Current Progress - 25%</h4>
                </div>
              </div>
            </div>
            <div className="qs-image">
              <img src={imagePath}></img>
            </div>
          </div>
          <hr className="line"/>
          <div className="scores">
              {badges.map((badge, i) => {
                const badgeDescSplit = this.splitBadgeDescriptionByLine(badgeDescriptions[i]);
                return (
                  <div className="badge">
                    <div className="badge-content">
                      <h1>26</h1>
                    </div>
                    <div className="badge-description">
                      <h3><strong>{badge}</strong></h3>
                      <p>
                        {badgeDescSplit.map(desc => {
                          return <span>{desc}<br></br></span>
                        })}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
    )
  }
}

const mapStateToProps = ({ app }) => {
  return {
    lessonName: app.currentLesson.lessonName,
    chapterName: app.currentLesson.chapterName,
    hasFinishedLoading: app.currentLesson.hasFinishedLoading,
    showSpinner: app.currentLesson.showSpinner,
    imagePath: app.currentLesson.chapterImage
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getCurrentLessonForUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
