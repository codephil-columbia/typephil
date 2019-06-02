import React from 'react';
import Redirect from 'react-router-dom';

const showLessonStats = (currentSelectedLesson, { accuracy, wpm, lessonID }, doRestartLesson) => {
  console.log(currentSelectedLesson);
  return (
    <div>
      <div className="lesson-stats-icon row">
        <div className="lesson-badge-content-square col">
          <h2 className="lesson-badge-content-txt">{Math.round(wpm*10)/10}</h2>
        </div>
        <h3 className="lesson-badge-desc col">WPM</h3>
      </div>
      <div className="lesson-stats-icon row">
        <div className="lesson-badge-content-circle">
          <h2 className="lesson-badge-content-txt-circle">{Math.round(accuracy)}</h2>
          <h2 className="percent-sign">%</h2>
        </div>
        <h3 className="lesson-badge-desc col">ACCURACY</h3>
      </div>
      <div 
        className="lesson-stats-icon row" 
        onClick={() => doRestartLesson(lessonID)}>
        <img
          src="/images/buttons/ResumeButtonSquare.svg" 
          className="resume-button"
          alt="resume button">
        </img>
        <h3 className="lesson-badge-link col">RESTART LESSON</h3>
      </div>
    </div>
  )
};

export default showLessonStats;