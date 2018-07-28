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
                <HeaderRight links={props.links} isLoggedIn={props.isLoggedIn} username={props.username} dispatch={props.dispatchLogout}/>
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

const HeaderRight = (props) => {
    console.log(props);
    return (
        <ul className="navigation-list float-right nav-right-list">
            <li className="navigation-item profile-bubble"><ProfileOptions username={props.username} dispatch={props.dispatch}/></li>
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

const ProfileOptions = (props) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">{ props.username ? props.username.charAt(0) : '' }</button>
			<div className="dropdown-content">
				<div> 
					<Link to="/profile">My Account</Link>
				</div>
				<div onClick={props.dispatch}>
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
