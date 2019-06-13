import React, { Component } from 'react';

import { UserService, LocalStorageCache } from './services';
import ShowSpinner from './components/spinner';
import Header from './components/header';

import './style/styles.css';
import './style/ProfilePage.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.userService = new UserService();
    this.cache = new LocalStorageCache();

    this.state = {
      headerLinks: ["Learn", "Home"],
      isLoading: true,
      edited: false,
      editing: false,
      viewing: false,
      touched: {
        password: false
      },
      newPassword: "",
      user: {},

      uid: this.cache.get("uid"),
      isLoggedIn: this.cache.get("isLoggedIn")
    }

    this.editPassword = this.editPassword.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const user = await this.userService.getUser(this.state.uid);
    this.setState({
      user,
      isLoading: false
    })
  }

  async editPassword() {
    if(!this.state.editing)
      this.setState({ editing: true });
    else {
      const { username } = this.state.user;
      const { newPassword } = this.state;
      
      await this.userService.changePassword(username, newPassword);
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
    this.setState({ newPassword:e.target.value });
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

    if (this.state.isLoading) {
      return <ShowSpinner />
    }

    return (
      <div>
      <Header 
        links={headerLinks} 
        isLoggedIn={this.state.isLoggedIn} 
        username={this.state.user.username}
        history={this.props.history}
        onLogout={this.props.onLogout}
      /> 

      <div className="container">
        <div className="vert-container">
          <div className="panel">
            <div className="row top">

              <div className="column column-100">
                <p className="profile_name">{this.state.user.firstName} {this.state.user.lastName}</p>
              </div>
            </div>

            <div className="row profile_main_div">
              <div className="column column-33">
                <h3>Username</h3>
              </div>
              <div className="column column-10"></div>
              <div className="column column-50">
                <p>{this.state.user.username}</p>
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
                <input 
                  className={ this.state.editing ? (markError() ? "error" : "") : "hide" } 
                  placeholder="" name="password" 
                  type="password" 
                  onBlur={this.handleBlur} 
                  onChange={this.handleInputChange}
                />
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
          </div>
        </div>
      </div>

      </div>
    )
  }
}

export default Profile;
