import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/header'

import "./style/HomePage.css";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerLinks: ["Home", "Learn", "Games"],
            badges: ["WPM", "Accuracy", "Badges"]
        }
    }

    redirectLesson = () => {
        console.log('hello')
        return <Link to="/instructions" push/>
    }


    render() {
        const { headerLinks, badges } = this.state;
        const { isLoggedIn } = this.props;
        const dummyUser = "Neil"

        // if(!isLoggedIn) {
        //     return <Redirect to="/login"/>
        // }

        return (
            <div>
                <Header links={headerLinks} username={dummyUser}/>
                <div className="content">
                    <div className="title">
                        <h1>Welcome Back, Phil!</h1>
                    </div>
                    <div className="row quickstart">
                        <div className="column qs-lesson-info">
                            <h3 className="qs-lesson-title">CHAPTER 2 | LESSON 1</h3>
                            <h3 className="qs-lesson-excersise"> Introduction to Shift Key</h3>
                            <button className="button button-outline start" onClick={this.redirectLesson}>Start</button>
                            <div className="qs-progress">
                                <div className="progress">
                                    <div className="progress-bar w-25" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div>
                                    <h4 className="qs-progress-info">Current Progress - 25%</h4>
                                </div>
                            </div>
                        </div>
                        <div className="column qs-image">
                        </div>
                    </div>
                    <hr className="line"/>
                    <div className="scores">
                        <div className="row">
                            {badges.map((badge, i) => {
                                return (
                                    <div className="column badge">
                                    <i className="fas fa-car fa-6x"></i>
                                        <h3 key={i}>{badge}</h3>
                                    </div>
                                )
                            })}
                        </div>
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
