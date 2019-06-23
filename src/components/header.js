import React from 'react';
import { Link } from 'react-router-dom';

import { LocalStorageCache } from "../services";

import '../style/navbar.css'

const Header = props => {
    const cache = new LocalStorageCache();
    return (
        <nav className="navigation">
            <div className="">
                <HeaderLeft
                    isLoggedIn={props.isLoggedIn}
                />
                <HeaderCenter 
                    isTutorial={props.isTutorial} 
                    tutorialInfo={props.tutorialInfo} 
                />
                <HeaderRight 
                    links={props.links} 
                    isTutorial={props.isTutorial} 
                    isLoggedIn={props.isLoggedIn} 
                    username={props.username} 
                    dispatch={cache.clear} 
                    history={props.history}
                    onLogout={props.onLogout}
                />
            </div>
        </nav>
    )
};

const HeaderLeft = props => {
    return (
        <Link to={props.isLoggedIn ? "/home" : "/"}>
            <img className="navigation-title" src="images/universal/TypePhil_Header_Logo.svg" alt="TypePhil Logo"/>
        </Link>

    )
};

const HeaderCenter = props => {
    if (props.isTutorial == null) {
        return (
            <div className="no_nav_chapter_info"></div>
        )
    }
    this.chapter_num = props.tutorialInfo["chapterName"].match(/\d+(?=:)/g)[0];
    this.temp_lesson_num = props.tutorialInfo["lessonName"].match(/\d+(?=:)/g);
    if (this.temp_lesson_num == null) {
        this.lesson_num = ""
    } else {
        this.lesson_num = this.temp_lesson_num[0]
    }
    this.temp_lesson_name = props.tutorialInfo["lessonName"].match(/: (.+)/g)
    if (this.temp_lesson_name == null) {
        this.lesson_name = ""
    } else {
        this.lesson_name = this.temp_lesson_name[0].substring(1)
    }
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

const HeaderRight = props => {
    return (
        <ul className="navigation-list float-right nav-right-list">
            { props.isLoggedIn 
                && <li className="navigation-item profile-bubble">
                    <ProfileOptions 
                        username={props.username} 
                        history={props.history} 
                        dispatch={props.dispatch}
                        onLogout={props.onLogout}
                    />
                </li>
            }
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

const logout = (dispatch, history, onLogout) => {
  if (process.env.REACT_APP_ENV === "offline") {
    localStorage.setItem("uid", "");
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("username", "");
  } else {
    dispatch();
  }
  onLogout();
  history.push("/")
}

const ProfileOptions = props => {
  return (
    <div className="dropdown">
      <button className="dropbtn">{ props.username ? props.username.charAt(0) : '' }</button>
			<div className="dropdown-content">
				<div>  
					<Link to="/profile" className="nav-bar-options">My Account</Link>
				</div>
                <div>
                    <Link to="/exam" className="nav-bar-options">Exam</Link>
                </div>
				<div className="nav-bar-options" onClick={() => logout(props.dispatch, props.history, props.onLogout)}>
					Log Out
				</div>
			</div>
    </div>
  )
};

export default Header;
