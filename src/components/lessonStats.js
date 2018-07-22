import React from 'react';
import Redirect from 'react-router-dom';

const showLessonStats = (currentSelectedLesson, { Accuracy, WPM, lessonID}, doRestartLesson) => {
  return (
    <div>
      <div className="lesson-stats-icon row">
        <div className="lesson-badge-content-square col">
          <h2 className="lesson-badge-content-txt"><b>{WPM}</b></h2>
        </div>
        <h3 className="lesson-badge-desc col">Words Per Minute</h3>
      </div>
      <div className="lesson-stats-icon row">
        <div className="lesson-badge-content-circle">
          <h2 className="lesson-badge-content-txt-circle"><b>{Accuracy}%</b></h2>
        </div>
        <h3 className="lesson-badge-desc col">Accuracy</h3>
      </div>
      <div 
        className="lesson-stats-icon row" 
        onClick={() => doRestartLesson(lessonID)}>
        <img
          src="/images/buttons/ResumeButtonSquare.svg" 
          className="resume-button"
          alt="resume button">
        </img>
        <a className="lesson-badge-link col">Restart Lesson</a>
      </div>
    </div>
  )
};

export default showLessonStats;