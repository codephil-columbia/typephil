import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'rc-progress';

import { LocalStorageCache, TutorialService } from "./services";
import ShowSpinner from './components/spinner';
import Header from './components/header';
import AvgUserStats from './components/avgUserStats';

import "./style/styles.css";
import "./style/HomePage.css";

class HomePage extends Component {
  constructor(props) {
      super(props);

      this.cache = new LocalStorageCache();
      this.tutorialService = new TutorialService();
      const uid = this.cache.get("uid");

      this.state = {
        uid,
        username: this.cache.get("username"),
        isLoading: true,
        headerLinks: ["Learn", "Home" ],
        badges: ["WPM", "Accuracy"],
        badgeDescriptions: [
          "Words Per Minute. \n The faster you type, \n the higher the number",
          "Accuracy is how \n accurately you type \n words that appear."
        ],

        tutorialInfo: {},
        tutorialAvgs: {},
        chapterProgress: ""
      }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.setup(this.state.uid)
      .then(([tutorialInfo, tutorialAvgs, chapterProgress]) => {
          this.setState({ tutorialInfo, tutorialAvgs, chapterProgress, isLoading: false });
      })
      .catch(err => console.log(err));
  }

  setup(uid) {
    return Promise.all([
      this.tutorialService.getTutorialInfo(uid),
      this.tutorialService.getTutorialAvgs(uid),
      this.tutorialService.getLessonProgressInChapter(uid),
    ]);
  }

  redirectLesson = () => {
      this.setState({ redirectLesson: true })
  }

  formatText = (chapterName, lessonName) => {
    const title = `${chapterName.split(":")[0]} | ${lessonName.split(":")[0]}`
    const lesson = lessonName.split(":")[1];
    return { title, lesson };
  }

  render() {
    if(this.state.isLoading) {
      return ShowSpinner();
    }

    const { 
      badges, 
      headerLinks, 
      badgeDescriptions,
      tutorialAvgs,
      tutorialInfo,
      chapterProgress,
      username
    } = this.state;

    console.log(this.state);

    const { lesson, chapter } = tutorialInfo;
    const { chapterImage } = chapter; 
    const { accuracy, wpm } = tutorialAvgs;

    const { title, lessonName } = this.formatText(chapter.chapterName, lesson.lessonName);
    return (
      <div>
        <Header 
          links={headerLinks} 
          isLoggedIn={true} 
          username={username} 
          history={this.props.history}
          onLogout={this.props.onLogout}
        />
        <div className="container">
          <div className="title-homepage row">
            <p className="homepage-welcome">Welcome Back, {username}!</p>
          </div>
          <div className="quickstart row">
            <div className="qs-lesson-info column" align="left">
              <h3 className="qs-lesson-title">{title}</h3>
              <h3 className="qs-lesson-excersise">{lessonName}</h3>
              <Link 
                to={{
                  pathname: "/tutorial",
                  state: { prevLocation: "HomePage" }
                }}
              >
                <img src="images/buttons/Start-button.svg" alt="Page Modal"/> 
              </Link>
              <div className="homepage-spacing"> </div>
              <Line 
                percent={chapterProgress} 
                strokeWidth="2" 
                strokeColor="#77BFA3" 
              />
              <div>
                <h4 className="qs-progress-info">
                  Current Progress - {chapterProgress}%
                </h4>
              </div>
            </div>
            <div className="qs-image column chapter-image-homepage">
              <img src={chapterImage} alt="lesson" className="homepage-chapter-image"></img>
            </div>
          </div>
          <hr className="line row"/>
          <AvgUserStats 
            badges={badges} 
            badgeDescriptions={badgeDescriptions} 
            stats={[wpm, accuracy]}>
          </AvgUserStats>
        </div>
      </div>
    )
  }
}

export default HomePage;
