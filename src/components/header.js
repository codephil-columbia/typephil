import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { dispatchLogout } from '../actions/auth';
import { store } from '../store.js';
import { Link } from 'react-router-dom';
import '../style/navbar.css'

const Header = (props) => {
    return (
        <nav className="navigation">
            <div className="">
                <HeaderLeft/>
                
                <HeaderRight links={props.links} isTutorial={props.isTutorial} isLoggedIn={props.isLoggedIn} username={props.username} dispatch={props.dispatchLogout}/>
            </div>
        </nav>
    )
};

const HeaderLeft = (_) => {
    return (
        <a href="/">
        <img className="navigation-title" src="images/universal/TypePhil_Header_Logo.svg"/>
        </a>
    )
};

const HeaderCenter = (_) => {
    return (
        <div>Hi</div> // trying to add tutorial text 
    )
};

const HeaderRight = (props) => {
    return (
        <ul className="navigation-list float-right nav-right-list">
            { props.isLoggedIn && <li className="navigation-item profile-bubble"><ProfileOptions username={props.username} dispatch={props.dispatch}/></li>}
            { props.isTutorial && <Link to="/home"><img class="exit_button" src="images/buttons/exit_button.svg"/></Link> }
            { props.links === undefined ? "" : props.links.map((link, i) => {
                const routePath = `/${link.toLowerCase()}`;
                return (
                    <li className="navigation-item" key={i}>
                        <Link to={routePath}>{ link }</Link>
                    </li>
                )
            })}

        </ul>
    )
};

const logout = (dispatch) => {
  dispatch();
  window.location.href = '/';
}

const ProfileOptions = (props) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">{ props.username ? props.username.charAt(0) : '' }</button>
			<div className="dropdown-content">
				<div>  
					<Link to="/profile" className="nav-bar-options" >My Account</Link>
				</div>
				<div className="nav-bar-options" onClick={() => logout(props.dispatch)}>
					Log Out
				</div>
			</div>
    </div>
  )
};

const mapDispatchToProps = {
	dispatchLogout,
};

export default connect(null, mapDispatchToProps)(Header);
