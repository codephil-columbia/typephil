import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { dispatchLogin } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import Dropdown from 'react-dropdown';
import moment from 'moment';
import 'react-dropdown/style.css';
import './style/styles.css';
import './style/SignupPage.css';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Default month and year. User updates these values later.
      month: 'Month', //moment().month(),
      day: 'Day',
      year: 'Year', //moment().year(),
      option1: 'hide',
      option2: '',
      usernameValid: true,

      firstname: '',
      lastname: '',
      username: '',
      password: '',
      password_c: '',
      occupation: '',
      schoolyear: 'Select from options',

      headerLinks: ["Home"]
    }

    this.isEnabled = false;
    this.handleInputChange = this.handleInputChange.bind(this); // TODO clean up for dropdowns
    this.handleSchoolyear = this.handleSchoolyear.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.setYear = this.setYear.bind(this);
    this.setOccupation = this.setOccupation.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name] : e.target.value });
    this.isEnabled = this.state.firstname.length > 0 && this.state.lastname.length > 0 && this.state.username.length > 0 && this.state.usernameValid && this.state.password.length > 5 && (this.state.password_c === this.state.password);
    console.log(this.isEnabled);
  }

  handleUsername = (e) => {

    // TODO fix this https://medium.com/@rajaraodv/adding-a-robust-form-validation-to-react-redux-apps-616ca240c124
    //
    const un = e.target.value;
    this.setState({ username : un });
    fetch('http://localhost:5000/auth/validUsername', {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: un })
    }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson && this.state.username===un) {
        this.setState({ usernameValid : true });
        console.log("VALID ", this.state.usernameValid, un, this.state.username);
      } else
        this.setState({ usernameValid : false });
        console.log("INVALID ", this.state.usernameValid, un, this.state.username);
    });
  }

  handleSchoolyear = (e) => {
    const schoolyear = e.value;
    this.setState({ schoolyear });
  }

  setPassword = (e) => {
    const password = e.target.value;
    this.setState({ password });
  }

  // TODO simplify
  setMonth = (e) => {
    this.setState({ month: e.value });
    this.refs.dddays.forceUpdate();
  }

  setDay = (e) => {
    this.setState({ day: e.value });
  }

  setYear = (e) => {
    this.setState({ year: e.value });
    this.refs.dddays.forceUpdate();
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

  setOccupation = (e) => {
    var occupation = e.target.value;
    if (occupation === 'student')
      this.setState({ option1: '', option2: 'hide' });
    else if (occupation === 'employed')
      this.setState({ option1: 'hide', option2: '' });
    else
      this.setState({ option1: 'hide', option2: 'hide' });
  }

  signup = (e) => {
    const dob = "${this.state.month}${this.state.day}${this.state.year}"; // TODO valid y/n? TODO db model
    fetch('http://localhost:5000/auth/signup', {
      method: 'POST', headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        email: '',
        password: this.state.password,
        occupation: this.state.occupation
      })
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
    });
    console.log(e);
  }

  render() {
    const { isLoggedIn } = this.props;
    const { headerLinks } = this.state;

    var months = moment.monthsShort();
    var selectedMonth = months[0];
    var years = Array.apply(null, {length: 50}).map(
          function(_, index) {
            return index + (moment().year()-50);
          }).reverse();
    if (this.state.month === 'Month' || this.state.year === 'Year')
      var days = this.getDays(moment().month(), moment().year());
    else
      var days = this.getDays(this.state.month, this.state.year);
    const defaultMonth = months[0];
    const defaultDay = days[0];
    const defaultYear = years[0];

    var schoolyears = ['Kindergarten'].concat(Array.apply(null, {length: 12}).map(function(_, i) { return 'Grade ' + (i+1) })).concat(['College', 'Other']);

    if(isLoggedIn) {
        return <Redirect to="/home"/>
    }

    return (
      <div className="body">
      <Header links={headerLinks} username=""/>
      
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
                      <input placeholder="" name="firstname" type="text" onChange={this.handleInputChange}/>
                  </div>
                  <div className="column column-50">
                      <h2>LAST NAME</h2>
                      <input placeholder="" name="lastname" type="text" onChange={this.handleInputChange}/>
                  </div>
              </div>

              <div className="row username">
                  <div className="column column-50">
                      <h2>USERNAME</h2>
                      <input placeholder="" name="username" type="text" onChange={this.handleUsername}/>
                      <div className={"warning " + this.state.usernameValid}>Sorry, that username is taken.</div>
                  </div>
                  <div className="column column-50">
                      <h2>BIRTHDATE</h2>
                      <div className="row dropdowns">
                          <Dropdown options={months} onChange={this.setMonth} placeholder={this.state.month} ref="ddmonths"/>
                          <Dropdown options={days} onChange={this.setDay} placeholder={this.state.day} ref="dddays"/>
                          <Dropdown options={years} onChange={this.setYear} placeholder={this.state.year} ref="ddyears"/>
                      </div>
                  </div>
              </div>

              <div className="row password">
                  <div className="column column-50">
                      <h2>PASSWORD</h2>
                      <input placeholder="" name="password" type="password" onChange={this.handleInputChange}/>
                  </div>
                  <div className="column column-50">
                      <h2>RE-TYPE PASSWORD</h2>
                      <input placeholder="" name="password_c" type="password" onChange={this.handleInputChange}/>
                  </div>
              </div>

              <div className="row gender">
                <div className="column column-20">
                  <h2>GENDER</h2>
                </div>
              </div>
              <div className="row gender-radios">
                <div className="column column-20"><label><input type="radio" name="gender" value="male"></input>Male</label></div>
                <div className="column column-25"><label><input type="radio" name="gender" value="female"></input>Female</label></div>
                <div className="column column-20"><label><input type="radio" name="gender" value="other"></input>Other</label></div>
              </div>

              <div className="row occupation">
                <div className="column column-50">
                  <h2>I AM CURRENTLY...</h2>
                  <div className="occupation-radios">
                    <span>
                      <div className="row"><label><input type="radio" name="occupation" value="student" onChange={this.setOccupation}></input>A student</label></div>
                    </span>
                    <span>
                      <div className="row"><label><input type="radio" name="occupation" value="employed" onChange={this.setOccupation}></input>Employed</label></div>
                    </span>
                    <span>
                      <div className="row"><label><input type="radio" name="occupation" value="unemployed" onChange={this.setOccupation}></input>Unemployed</label></div>
                    </span>
                  </div>
                </div>

                <div className="column column-50">

                  <div className={"specify-schoolyear " + this.state.option1}>
                    <h2>SCHOOL YEAR</h2>
                    <div id="ddoccupation">
                      <Dropdown options={schoolyears} onChange={this.handleSchoolyear} placeholder={this.state.schoolyear}/>
                    </div>
                  </div>

                  <div className={"specify-occupation " + this.state.option2}>
                    <h2>OCCUPATION</h2>
                    <input placeholder="" name="occupation" type="text" onChange={this.handleInputChange}/>
                  </div>

                </div>
              </div>

              <div className="row next">
                <div className="column column-50 column-offset-25 signup">
                  <button id="btn-next" disabled={!this.isEnabled} onClick={this.signup}>SIGN UP</button>
                  <div className={"warning " + this.isEnabled} ref="signup_warning">Please complete all fields.</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
