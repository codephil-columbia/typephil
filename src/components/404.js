import React from 'react';
import '../style/fourOhFour.css';


const Component404 = () => {
    return (
        <React.Fragment>
        <div className="container fourOhFourWrap">
	        <div className="fourOhFourBody">
	    		<img src="images/universal/404_error.svg" alt="404 page"></img>
	            <h1 className="oops">Oops!</h1>
	            <h2 className="pageNotFound">Page not found</h2>
	            <h3 className="pageNotFoundText">The requested URL was not found on this server.</h3>
	        </div>
        </div>
        </React.Fragment>
    )
}

export default Component404;