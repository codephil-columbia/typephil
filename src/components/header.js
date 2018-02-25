import React from 'react';
import '../style/navbar.css'

const Header = props => {
  return (
    <nav className="navigation">
        <div className="container">
            <HeaderLeft/>
            <HeaderRight links={["Home", "Learn"]}/>
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
            <li className="navigation-item">
                Cesar 
            </li>
            {props.links.map((link, i) => {
                return (
                    <li className="navigation-item" key={i}>
                        <a className="navigation-link" href="#">{ link }</a>
                    </li>
                )
            })}
        </ul>
    )
}

export default Header;
