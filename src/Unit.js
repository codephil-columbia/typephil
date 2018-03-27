import React, { Component } from 'react';

import './style/Unit.css';
import { Link } from 'react-router-dom';
import Header from './components/header'
import header from './components/header';

class Unit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapters: ["The Basics", "Home Row", "Shift & Punctiation"],
      headerLinks: ["Learn", "Progress", "Home"]
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
              <div className="row">
                <div className="column">
                  <h1>b/</h1>
                </div>
                <div className="column">
                  <h3>Overview</h3>
                  <h3>Add Subtitle</h3>
                </div>
                <div className="column">
                  <h1>\b</h1>
                </div>
              </div>
            </div>
            <div className="block-info">
              <div className="row">
                <div className="column">
                </div>
                <div className="column">
                  <ol>
                    {chapters.map((chapter, index) => {
                      return (
                        <li>
                          <Link to="" className="link">{chapter}</Link>
                        </li>
                      )
                    })}
                  </ol>
                </div>
                <div className="column">
                </div>
              </div>  
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Unit;