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
        <a className="navigation-title" href="/">TypePhil</a>
    )
}

const HeaderRight = props => {
    console.log(props);
    return (
        <ul className="navigation-list float-right">
            <li className="navigation-item">{props.username}</li>
            { props.links === undefined ? "" : props.links.map((link, i) => {
                const routePath = `/${link.toLowerCase()}`;
                return (
                    <li className="navigation-item" key={i}>
                        <Link to={routePath}>{ link }</Link>
                    </li>
                )
            })}
            <li className="navigation-item profile-bubble">{ props.isLoggedIn ? <ProfileOptions username={props.username} /> : "" }</li>
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
