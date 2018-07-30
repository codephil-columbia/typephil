import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { dispatchSignup } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import 'react-dropdown/style.css';
//import './style/milligram.min.css'; // TODO for no connectivity only
import './style/styles.css';
import './style/SignupPage.css';
import HomePage from './HomePage';

const schoolyears = ['Kindergarten'].concat(Array.apply(null, {length: 12}).map(function(_, i) { return 'Grade ' + (i+1) })).concat(['College', 'Other']);
const months = moment.monthsShort();
const years = Array.apply(null, {length: 50}).map(
      function(_, index) {
        return index + (moment().year()-50);
      }).reverse();

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Default month and year. User updates these values later.
      month: 'Month',
      day: 'Day',
      year: 'Year',

      firstname: '',
      lastname: '',
      username: '',
      password: '',
      password_c: '',
      gender: '',
      whichOccupation: '',
      schoolyear: 'Select from options',
      occupation: '',

      touched: {
        firstname: false,
        lastname: false,
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

    // TODO turn this over to middleware
    if(field === 'username') {
      const username = e.target.value;
      //this.props.dispatchUsername(username);
      fetch('http://localhost:5000/auth/usernameValid', { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      }).then(res => res.json()
      ).then((res) => {
        if(res && this.state.username === username)
          this.setState({ usernameValid : true });
        else
          this.setState({ usernameValid : res });
      });
    }
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
    const { firstname, lastname, username, password, occupation, gender, whichOccupation, schoolyear } = this.state // TODO add firstname, lastname to db model (?)
    const dob = `${moment.monthsShort().indexOf(this.state.month)}-${this.state.day}-${this.state.year}`; // MM-DD-YYYY string
    this.props.dispatchSignup({ 
      firstname,
      lastname,
      username,
      password,
      occupation,
      whichOccupation,
      gender,
      dob,
      schoolyear
    });
    this.setState({ signedIn : true });
  }

  // Conditions hold `true` iff there is an error.
  validate = (firstname, lastname, username, password, password_c, schoolyear, occupation) => {
    return {
      firstname: firstname.length === 0,
      lastname: lastname.length === 0,
      username: username.length === 0,
      password: password !== password_c,
      password_c: password !== password_c,
      schoolyear: this.state.whichOccupation === "student" ? !schoolyears.includes(schoolyear) : false,
      occupation: this.state.whichOccupation === "employed" ? occupation.length === 0 : false 
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    
    if(isLoggedIn) {
      this.props.onSuccessfulAuth();
    }

    if(this.state.signedIn) return <Redirect to='/home'/>
    const days = (this.state.month === 'Month' || this.state.year === 'Year') ? this.getDays(moment().month(), moment().year()) : this.getDays(moment.monthsShort().indexOf(this.state.month)+1, this.state.year);
    const { firstname, lastname, username, password, password_c, schoolyear, occupation } = this.state;
    const errors = this.validate(firstname, lastname, username, password, password_c, schoolyear, occupation);
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
                  <h1 className="title">Sign up - It's free!</h1>
                  <p>Join TypePhil to get personalized help with your typing education, whether you're already studying or starting anew. We'll save all of your progress.</p>
                  <br/>
                  <p>By signing up for TypePhil, you agree to our <a href="https://app.termly.io/document/terms-of-use-for-website/b57ed416-1978-4739-b295-a2578c7bff00">Terms of Use and Privacy Notice.</a></p>

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
                      <input className={markError('firstname') ? "error" : ""} onBlur={this.handleBlur('firstname')} placeholder="" name="firstname" type="text" value={this.state.firstname} onChange={this.handleInputChange}/>
                  </div>
                  <div className="column column-50">
                      <h2>LAST NAME</h2>
                      <input className={markError('lastname') ? "error" : ""} onBlur={this.handleBlur('lastname')} placeholder="" name="lastname" type="text" value={this.state.lastname} onChange={this.handleInputChange}/>
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
                      <h2>PASSWORD</h2>
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

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isSignedUp: state.isSignedUp,
    usernameValid: state.usernameValid
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchSignup }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
