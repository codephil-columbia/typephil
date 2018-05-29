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
      headerLinks: ["Learn", "Progress", "Home"],
      editing: false,
      password: " ",
      touched: {
        password: false
      }
    }
  }

  editPassword = () => {
    this.setState({ editing: true });
    // TODO call dispatch
    console.log('edit');
  }

  viewPassword = () => {
    console.log('view');
  }

  handleBlur = (e) => {
    this.setState({
      touched: { password : true }
    });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  validate = (password) => {
    return {
      password: password.length === 0
    }
  }

  render() {
    const { headerLinks } = this.state;
    const errors = this.validate(this.state.password);
    const markError = () => {
      return errors['password'] ? this.state.touched['password'] : false;
    }

    return (
      <div>
      <Header links={headerLinks} username=""/>

      <div className="container">
        <div className="vert-container">
          <div className="panel">
            <div className="row top">

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
                <h3>Password</h3>
              </div>
              <div className="column column-20 column-offset-10 password-info">
                <p className={ this.state.editing ? "hide" : ""}>
                  ******
                </p>
                <input className={ this.state.editing ? (markError() ? "error" : "") : "hide" } placeholder="" name="password" type="password" onBlur={this.handleBlur} onChange={this.handleInputChange}/>
              </div>

              <div className="column column-30 options">
                <div className="options">
                  <button onClick={this.editPassword}>
                    <span className={this.state.editing ? "hide" : ""}>EDIT</span>
                    <span className={this.state.editing ? "" : "hide"}>SUBMIT</span>
                  </button>
                  <button onClick={this.viewPassword}>VIEW</button>
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
