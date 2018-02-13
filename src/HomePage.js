import React, { Component } from 'react';
import Header from './components/header'

import "./style/HomePage.css";

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    setHeaders() {
        return ['Home', 'Learn', 'Games']
    }


    render() {
        return (
            <div>
                <Header/>
                <div className="content">
                    <div className="quickstart">
                        <div className="qs-lesson-info">
                            <h2>Welcome back, Cesar!</h2>
                            <h4>Continue your learning journey</h4>
                            <h3>Chapter 2, Lesson 1: Introduction to Space Key</h3>
                            <input className="button-primary solid" type="submit" value="Start Lesson"/>
                        </div>
                        <div className="qs-image">
                            <h2>Some stuff</h2>
                        </div>
                    </div>
                    <div className="scores">
                        <h3>I am a score</h3>
                    </div>
                </div>
            </div>
        )
    }
}



export default HomePage;
