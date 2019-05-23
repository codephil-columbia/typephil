import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { dispatchPassword } from './actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/header';
import localforage from 'localforage';
import './style/styles.css';
import './style/ProfilePage.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerLinks: ["Learn", "Home"],
      edited: false,
      editing: false,
      viewing: false,
      touched: {
        password: false
      }
    }
  }

  editPassword = () => {
    if(!this.state.editing)
      this.setState({ editing: true });
    else {
      const { username, password } = this.props.currentUser;
      var res = this.props.dispatchPassword(
        username,
        password
      );
      console.log(res);
      this.setState({ editing: false, edited: true });
    }
  }

  toggleViewing = () => {
    this.setState({ viewing: !this.state.viewing });
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
      password: password.length > 0
    }
  }

  render() {
    const { headerLinks } = this.state;
    const errors = true; //this.validate(this.state.currentUser.password);
    const markError = () => {
      return errors['password'] ? this.state.touched['password'] : false;
    }

    return (
      <div>
      <Header links={headerLinks} isLoggedIn={this.props.isLoggedIn} username={this.props.currentUser.username}/> 

      <div className="container">
        <div className="vert-container">
          <div className="panel">
            <div className="row top">

              <div className="column column-100">
                <p className="profile_name">{this.props.currentUser.firstName} {this.props.currentUser.lastName}</p>
              </div>
            </div>

            <div className="row profile_main_div">
              <div className="column column-33">
                <h3>Username</h3>
              </div>
              <div className="column column-10"></div>
              <div className="column column-50">
                <p>{this.props.currentUser.username}</p>
              </div>
            </div>

            <div className="row">
              <div className="column column-33">
                <h3>Password</h3>
              </div>
              <div className="column column-20 column-offset-10 password-info">
                <p className={ this.state.editing ? "hide" : "" }>
                  {/*{ this.state.viewing ? auth.currentUser.password : '*'.repeat(auth.currentUser.password.length) } // TODO put this back

                   TODO this is pretty egregiously insecure} */}
                  ******
                </p>
                <input className={ this.state.editing ? (markError() ? "error" : "") : "hide" } placeholder="" name="password" type="password" onBlur={this.handleBlur} onChange={this.handleInputChange}/>
              </div>

              <div className="column column-30 options">
                <div className="options">
                  <button onClick={this.editPassword}>
                    <span className={ this.state.editing ? "hide" : "" }>EDIT</span>
                    <span className={ this.state.editing ? "" : "hide" }>SUBMIT</span>
                  </button>
                  <button className={ this.state.edited ? "" : "hide" } onClick={ this.toggleViewing }>
                    { this.state.viewing ? "HIDE" : "VIEW" } 
                  </button>
                </div>
              </div>
            </div>

            {
            // <div className="row">
            //   <div className="column column-33">
            //     <h3>Email</h3>
            //   </div>
            //   <div className="column column-10"></div>
            //   <div className="column column-50">
            //     <p className="add_email"><a>Add e-mail address</a></p>
            //   </div>
            // </div>
            }
          </div>
        </div>
      </div>

      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { 
    currentUser: auth.currentUser,
    isLoggedIn: auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ dispatchPassword }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
