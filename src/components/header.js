import React from 'react';
import { Link } from 'react-router-dom';
import '../style/navbar.css'

const Header = props => {
    return (
        <nav className="navigation">
            <div className="">
                <HeaderLeft/>
                <HeaderRight links={props.links} username={props.username}/>
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

            { props.isLoggedIn ? <div>some dropdown</div> : "" }
        </ul>
    )
}

export default Header;
