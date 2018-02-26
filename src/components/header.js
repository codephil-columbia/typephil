import React from 'react';
import '../style/navbar.css'

const Header = props => {
    return (
        <nav className="navigation">
            <div className="container">
                <HeaderLeft/>
                <HeaderRight links={props.links} username={props.username}/>
            </div>
        </nav>
    )
}

const HeaderLeft = _ => {
    return (
        <a className="navigation-title" href="/home">TypePhil</a>
    )
}

const HeaderRight = props => {
    return (
        <ul className="navigation-list float-right">
            <li className="navigation-item">{props.username}</li>
            {props.links.map((link, i) => {
                return (
                    <li className="navigation-item" key={i}>
                        <a className="" href="#">{ link }</a>
                    </li>
                )
            })}
        </ul>
    )
}

export default Header;
