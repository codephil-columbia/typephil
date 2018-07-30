import React from 'react';
import { Link } from 'react-router-dom';

const lock = ({ isMostRecentLesson }) => {
  return (
    <div>
      <div>
        <img src="images/universal/lockicon.svg" alt="lock"></img>
      </div>
      <div>
        {isMostRecentLesson ? (
          <React.Fragment>
            <h4>In order to continue on to other lessons, you must for complete this one!</h4>
            <Link to="/tutorial" className="button">Start current lesson</Link>
          </React.Fragment>
        ) : (
          <h4>To unlock this lesson, please complete the previous lesson</h4>
        )}
      </div>
    </div>  
  )
};

export default lock