import React from 'react';
import '../style/navbar.css'

const Header = props => {
  return (
    <div className="header">
        <HeaderLeft />
        <HeaderRight links={["Home", "Learn"]}/>
    </div>
  )
}

const HeaderLeft = _ => {
    return (
        <div>
            <h1 className="header-left">TypePhil</h1>
        </div>
    )
}

const HeaderRight = props => {
    return (
        <div className="header-right">
            <div className="header-links">
                {props.links.map((link, i) => {
                    return (
                        <h3 className="header-links link" key={i}>
                            <a href="#">{link}</a>
                        </h3>
                    )
                })}
            </div>
            <div className="header-pic">
                <h3>bye</h3>
            </div>
        </div>
    )
}

export default Header;