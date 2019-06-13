import React, { Component } from 'react';
<<<<<<< HEAD
import { Redirect, Link } from 'react-router-dom';
import { dispatchSignup, dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
=======
>>>>>>> offline-actions
import Header from './components/header';
import Dropdown from 'react-dropdown';
import moment from 'moment';

import { UserService, LocalStorageCache } from "./services";

import 'react-dropdown/style.css';
import './style/styles.css';
import './style/SignupPage.css';

const schoolyears = ['Kindergarten'].concat(Array.apply(null, {length: 12}).map(function(_, i) { return 'Grade ' + (i+1) })).concat(['College', 'Other']);
const months = moment.monthsShort();
const years = Array.apply(null, {length: 50}).map(
      function(_, index) {
        return index + (moment().year()-50);
      }).reverse();

class SignupPage extends Component {
  constructor(props) {
    super(props);

    this.userService = new UserService()
    this.cache = new LocalStorageCache();

    this.state = {
      // Default month and year. User updates these values later.
      month: 'Month',
      day: 'Day',
      year: 'Year',

      firstName: '',
      lastName: '',
      username: '',
      password: '',
      password_c: '',
      gender: '',
      whichOccupation: '',
      schoolyear: 'Select from options',
      occupation: '',

      touched: {
        firstName: false,
        lastName: false,
        username: false,
        password: false,
        password_c: false,
        occupation: false
      },

      signedIn: false,
      usernameValid: true,
    };
  }

  handleBlur = (field) => (e) => {
    this.setState({
      touched: {...this.state.touched, [field]: true}
    });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
  }

  handleOption = target => (e) => {
    this.setState({ [target] : e.value === undefined ? e.target.value : e.value });
  }

  getDays = (m, y) => {
    var days = [];
    var daysInMonth = moment(y + "-" + m, "YYYY-MM").daysInMonth();
    while(daysInMonth) {
      days.push(daysInMonth);
      daysInMonth--;
    }
    return days;
  }

  signup = (e) => {
    e.preventDefault();
    const { firstName, lastName, username, password, occupation, gender, whichOccupation, schoolyear } = this.state // TODO add firstName, lastName to db model (?)
    const dob = `${moment.monthsShort().indexOf(this.state.month)}-${this.state.day}-${this.state.year}`; // MM-DD-YYYY string
<<<<<<< HEAD
    this.props.dispatchSignup({ 
      firstName: firstname,
      lastName: lastname,
=======
    
    this.userService.signup({
      firstName, 
      lastName,
>>>>>>> offline-actions
      username,
      password,
      occupation,
      whichOccupation,
<<<<<<< HEAD
      gender,
      dob,
      schoolyear
    });
    this.props.dispatchLogin(username, password)
    this.setState({ signedIn : true });
=======
    }).then(user => this.props.onSuccessfulAuth(user.username, user.uid))
    .catch(err => console.log(err));
>>>>>>> offline-actions
  }

  // Conditions hold `true` iff there is an error.
  validate = (firstName, lastName, username, password, password_c, schoolyear, occupation) => {
    return {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      username: username.length === 0,
      password: password !== password_c,
      password_c: password !== password_c,
      schoolyear: this.state.whichOccupation === "student" ? !schoolyears.includes(schoolyear) : false,
      occupation: this.state.whichOccupation === "employed" ? occupation.length === 0 : false 
    }
  }

  render() {

    const days = (this.state.month === 'Month' || this.state.year === 'Year') ? this.getDays(moment().month(), moment().year()) : this.getDays(moment.monthsShort().indexOf(this.state.month)+1, this.state.year);
    const { firstName, lastName, username, password, password_c, schoolyear, occupation } = this.state;
    const errors = this.validate(firstName, lastName, username, password, password_c, schoolyear, occupation);
    const markError = (field) => {
      return errors[field] ? this.state.touched[field] : false;
    }
    const isEnabled = !Object.keys(errors).some(e => errors[e]);

    return (
      <div className="body">
      <Header isLoggedIn={false}/>
      
      <div className="container">
        <div className="row subcontainer">
          <div className="column column-33">
              <div className="left-panel">
                  <h1 className="title-signup">Sign up - It's free!</h1>
                  <p>Join TypePhil to get personalized help with your typing education, whether you're already studying or starting anew. We'll save all of your progress.</p>
                  <br/>
                  <p>By signing up for TypePhil, you agree to our <a href="https://app.termly.io/document/terms-of-use-for-website/b57ed416-1978-4739-b295-a2578c7bff00" target="_blank">Terms of Use and Privacy Notice.</a></p>

                  <div className="void">
                  </div>
              </div>
          </div>

          <div className="column column-10">
          </div>

          <div className="vertical-line">
          </div>

          <div className="column column-10">
          </div>

          <div className="column column-40 right-panel-container">
            <div className="right-panel">
              <div className="row">
                  <div className="column column-50">
                      <h2>FIRST NAME</h2>
                      <input className={markError('firstName') ? "error" : ""} onBlur={this.handleBlur('firstName')} placeholder="" name="firstName" type="text" value={this.state.firstName} onChange={this.handleInputChange}/>
                  </div>
                  <div className="column column-50">
                      <h2>LAST NAME</h2>
                      <input className={markError('lastName') ? "error" : ""} onBlur={this.handleBlur('lastName')} placeholder="" name="lastName" type="text" value={this.state.lastName} onChange={this.handleInputChange}/>
                  </div>
              </div>

              <div className="row username">
                  <div className="column column-50">
                      <h2>USERNAME</h2>
                      <input className={(markError('username') || !this.state.usernameValid) ? "error" : ""} onBlur={this.handleBlur('username')} placeholder="" name="username" type="text" value={this.state.username} onChange={this.handleInputChange}/> 
                      <div className={this.state.usernameValid ? "warning-hide" : "warning"}>Sorry, that username is taken.</div>
                  </div>
                  <div className="column column-50">
                      <h2>BIRTHDATE</h2>
                      <div className="row dropdowns">
                          <Dropdown options={months} onChange={this.handleOption('month')} placeholder={this.state.month}/>
                          <Dropdown options={days} onChange={this.handleOption('day')} placeholder={this.state.day}/>
                          <Dropdown options={years} onChange={this.handleOption('year')} placeholder={this.state.year}/>
                      </div>
                  </div>
              </div>

              <div className="row password">
                  <div className="column column-50">
                      <h2 className="password_left">PASSWORD</h2>
                      <input className={markError('password') ? "error" : ""} onBlur={this.handleBlur('password')} placeholder="" name="password" type="password" onChange={this.handleInputChange}/>
                  </div>
                  <div className="column column-50">
                      <h2>RE-TYPE PASSWORD</h2>
                      <input className={markError('password_c') ? "error" : ""} onBlur={this.handleBlur('password_c')} placeholder="" name="password_c" type="password" onChange={this.handleInputChange}/>
                      <div className={(this.state.password === this.state.password_c) ? "warning-hide" : "warning"}>Oops, your passwords don't match.</div>
                  </div>
              </div>

              <div className="row gender">
                <div className="column column-20">
                  <h2>GENDER</h2>
                </div>
              </div>
              <div className="row gender-radios">
                <div className="column column-20"><label><input type="radio" name="gender" value="male" onChange={this.handleOption('gender')}></input>Male</label></div>
                <div className="column column-25"><label><input type="radio" name="gender" value="female" onChange={this.handleOption('gender')}></input>Female</label></div>
                <div className="column column-20"><label><input type="radio" name="gender" value="other" onChange={this.handleOption('gender')}></input>Other</label></div>
              </div>

              <div className="row occupation">
                <div className="column column-50">
                  <h2>I AM CURRENTLY...</h2>
                  <div className="occupation-radios">
                    <span>
                      <div className="row"><label><input type="radio" name="occupation" value="student" onChange={this.handleOption('whichOccupation')}></input>Student</label></div>
                    </span>
                    <span>
                      <div className="row"><label><input type="radio" name="occupation" value="employed" onChange={this.handleOption('whichOccupation')}></input>Employed</label></div>
                    </span>
                    <span>
                      <div className="row"><label><input type="radio" name="occupation" value="unemployed" onChange={this.handleOption('whichOccupation')}></input>Unemployed</label></div>
                    </span>
                  </div>
                </div>

                <div className="column column-50">

                  <div className={"specify-schoolyear " + (this.state.whichOccupation !== "student" ? "hide" : "")}>
                    <h2>SCHOOL YEAR</h2>
                    <div id="ddoccupation">
                      <Dropdown options={schoolyears} onChange={this.handleOption("schoolyear")} placeholder={this.state.schoolyear}/>
                    </div>
                  </div>

                  <div className={"specify-occupation " + (this.state.whichOccupation !== "employed" ? "hide" : "")}>
                    <h2>OCCUPATION</h2>
                    <input className={markError('occupation') ? "error" : ""} placeholder="" name="occupation" type="text" onBlur={this.handleBlur('occupation')} onChange={this.handleInputChange}/>
                  </div>
                </div>
              </div>

              <div className="row next">
                <div className="column column-50 column-offset-25 signup">
                  <button id="btn-next" disabled={!isEnabled} onClick={this.signup}>SIGN UP</button>
                  <div className={isEnabled ? "hide" : "warning"}>Please complete all fields.</div>
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

<<<<<<< HEAD
const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.isSignedUp,
    usernameValid: state.usernameValid
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchSignup, dispatchLogin }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
=======
export default SignupPage;
>>>>>>> offline-actions
