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
                <HeaderCenter isTutorial={props.isTutorial} tutorialInfo={props.tutorialInfo} />
                <HeaderRight links={props.links} isTutorial={props.isTutorial} isLoggedIn={props.isLoggedIn} username={props.username} dispatch={props.dispatchLogout} history={props.history}/>
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

const HeaderCenter = (props) => {
    if (props.isTutorial == null) {
        return (
            <div className="no_nav_chapter_info"></div>
        )
    }
    this.chapter_num = props.tutorialInfo["chapterName"].match(/\d+(?=:)/g)[0];
    this.lesson_num = props.tutorialInfo["lessonName"].match(/\d+(?=:)/g)[0];
    this.lesson_name = props.tutorialInfo["lessonName"].match(/: (.+)/g)[0].substring(1);
    return (
        <div className="nav_tutorial_chapter_info">{props.isTutorial &&
            <p className="nav_tutorial_chapter_info_text">
                <p className="nav_tutorial_chapter_info_text_bold">
                Ch. {this.chapter_num}.
                {this.lesson_num}&nbsp;</p>
                {
                    this.lesson_name
                }</p> 
        }
        </div>
    )
};


const HeaderRight = (props) => {
    return (
        <ul className="navigation-list float-right nav-right-list">
            { props.isLoggedIn && <li className="navigation-item profile-bubble"><ProfileOptions username={props.username} history={props.history} dispatch={props.dispatch}/></li>}
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

const logout = (dispatch, history) => {
  dispatch();
  history.push("/")
}

const ProfileOptions = (props) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">{ props.username ? props.username.charAt(0) : '' }</button>
			<div className="dropdown-content">
				<div>  
					<Link to="/profile" className="nav-bar-options" >My Account</Link>
				</div>
				<div className="nav-bar-options" onClick={() => logout(props.dispatch, props.history)}>
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
