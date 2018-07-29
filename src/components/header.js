import React from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css'

const Header = props => {
    return (
        <nav className="navigation">
            <div className="">
                <HeaderLeft/>
                <HeaderRight links={props.links} isLoggedIn={props.isLoggedIn} username={props.username}/>
            </div>
        </nav>
    )
}

const HeaderLeft = _ => {
    return (
        <a href="/">
        <img className="navigation-title" src="images/universal/TypePhil_Header_Logo.svg"/>
        </a>
    )
}

const HeaderRight = props => {
    return (
        <ul className="navigation-list float-right nav-right-list">
            <li className="navigation-item">{props.username}</li>
            { props.links === undefined ? "" : props.links.map((link, i) => {
                const routePath = `/${link.toLowerCase()}`;
                return (
                    <li className="navigation-item" key={i}>
                        <Link to={routePath}>{ link }</Link>
                    </li>
                )
            })}

            { props.isLoggedIn && <li className="navigation-item profile-bubble"><ProfileOptions username={props.username} /></li> }
        </ul>
    )
}

const ProfileOptions = props => {
  return (
    <select>
      <option selected hidden disabled id="user-option">{ props.username } </option>
      <option>My Account</option>
      <option>Log Out</option>
    </select>
  )
}

export default Header;
