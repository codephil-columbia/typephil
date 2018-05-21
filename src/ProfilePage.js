import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import './style/styles.css';
import './style/ProfilePage.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerLinks: ["Learn", "Progress", "Home"]
    }
  }

  render() {
    const { headerLinks } = this.state;

    return (
      <div>
      <Header links={headerLinks} username=""/>

      <div className="container">
        <div className="vert-container">
          <div className="panel">
            <div className="row top">
              {/* 
              <div className="column column-50">

                <div id="profile-pic">
                  <img src="images/universal/Profile_pic.svg"></img>
                </div>

              </div>
              <div className="column column-50">
              */}
              <div className="column column-100">
                <h2>Name</h2>
                <h1>Phil Torres</h1>
              </div>
            </div>

            <hr></hr>

            <div className="row">
              <div className="column column-33">
                <h3>Username</h3>
              </div>
              <div className="column column-10"></div>
              <div className="column column-50">
                <p>p_torres</p>
              </div>
            </div>

            <div className="row">
              <div className="column column-33">
                <h3>Email</h3>
              </div>
              <div className="column column-10"></div>
              <div className="column column-50">
                <p>phil.torres@typephil.com</p>
              </div>
            </div>
            
            <div className="row">
              <div className="column column-33">
                <h3>Password</h3>
              </div>
              <div className="column column-10"></div>
              <div className="column column-20">
                <p>******</p>
              </div>
              <div className="column column-10">
                <div className="highlight" id="view">
                  <div className="eye"></div>
                </div>
                <div className="highlight" id="edit">
                  <img src="images/universal/Pencil.png"></img>
                </div>
              </div>
            </div>
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
