import React, { Component } from 'react';

import './style/Unit.css';
import { Link } from 'react-router-dom';
import Header from './components/header'
import header from './components/header';

class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: [
        "The Basics", 
        "Home Row", 
        "Shift & Punctiation",
        "Top Row",
        "Bottom Row",
        "Establishing a Rhythm",
        "Numbers",
        "Special Characters"
      ],
      headerLinks: ["Learn", "Home"]
    }
  }

  render() {
    const { chapters, headerLinks } = this.state;
    return (
      <div>
        <Header links={headerLinks}/>
        <div className="content">
          <div className="title">
            <h2 className="title-content">Fundamentals of Typing Tutorial</h2>
          </div>
          <div className="block">
            <div className="carousel">
              <div className="arrow-left">
                <h3>a</h3>
              </div>
              <div className="carousel-content">
                <div className="carousel-title">
                  <h2 className="title">Overview</h2>
                </div>
                <div className="carousel-desc">
                  <h3 className="desc">Add subtitle</h3>
                </div>
              </div> n
              <div className="arrow-right">
                <h3></h3>
              </div>
            </div>
            <div className="block-info">
              <div className="unit-info">
              {chapters.map((c, i) => {
                return (
                  <div className="unit">
                    <div className="unit-num">
                      <h4 className="num">{i}</h4>
                    </div>
                    <div className="unit-name">
                      <h4>{c}</h4>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Unit;