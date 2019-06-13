import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../style/LessonTutorialButtons.css';

const lock = ({ isMostRecentLesson, doRestartLesson, currentSelectedLesson }) => {
  return (
    <div>
      <div>
        <img src="images/universal/lockicon.svg" alt="lock" className="learn-lock-icon"></img>
      </div>
      <div>
        {isMostRecentLesson ? (
          <Fragment>
            <h4>In order to continue onto other lessons, you must for complete this one!</h4>
            <Link 
              to={{
                pathname: "/tutorial",
                state: { prevLocation: "LearnPage" }
              }} className="button learn-start-button"
              onClick={() => doRestartLesson(currentSelectedLesson.lessonID, currentSelectedLesson.chapterID)}
            >
              Start lesson
            </Link>
          </Fragment>
        ) : (
          <h4 className="lock-description">To unlock this lesson, please complete the previous lessons</h4>
        )}
      </div>
    </div>  
  )
};

export default lock