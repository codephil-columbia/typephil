import React, { Component } from 'react';
import { Redirect, Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/header'

import "./style/HomePage.css";


class HomePage extends Component {
  constructor(props) {
      super(props);

      this.state = {
        headerLinks: ["Learn", "Progress", "Home"],
        badges: ["WPM", "Accuracy", "Badges"],
      }
  }

  redirectLesson = () => {
      this.setState({redirectLesson: true})
  }


  render() {
    const { badges, headerLinks } = this.state;
    const { isLoggedIn } = this.props;
    const dummyUser = "Neil"

    return (
      <div>
        <Header links={headerLinks}/>
        <div className="content">
          <div className="title">
            <h1>Welcome Back, Phil!</h1>
          </div>
          <div className="quickstart">
            <div className="qs-lesson-info">
              <h3 className="qs-lesson-title">CHAPTER 2 | LESSON 1</h3>
              <h3 className="qs-lesson-excersise"> Introduction to Shift Key</h3>
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
              <h1>henlo</h1>
            </div>
          </div>
          <hr className="line"/>
          <div className="scores">
              {badges.map((badge, i) => {
                return (
                    <div className="badge">
                      <div className="badge-content">
                        <h1>26</h1>
                      </div>
                      <div className="badge-description">
                        <h3><strong>WPM</strong></h3>
                        <p> Words per minute<br></br> The faster you type,<br></br> the higher the number</p>
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}


export default connect(mapStateToProps)(HomePage);
