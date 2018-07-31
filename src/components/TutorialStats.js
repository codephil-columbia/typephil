import React, { Fragment } from 'react';

const TutorialStats = ({ totalTime, totalLength, totalIncorrect, didUserPassLesson }) => {
  console.log(totalIncorrect, totalLength, totalTime);
  return (
  <div className="tutorial-stats">
    <div className="row">
        <div className="column">
          <h1><b>{Math.trunc((totalLength / 5) / (totalTime / 60))}</b></h1>
        </div>
        <div className="column">
          <h1><b>{Math.trunc((totalLength - totalIncorrect) / totalLength * 100)}%</b></h1>
        </div>
        <div className="column">
          <h1><b>{Math.trunc(totalTime)}</b></h1>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <h1>WPM</h1>
        </div>
        <div className="column">
          <h1 style={didUserPassLesson ? {"color": "black"} : {"color": "4A4A4A"}}>Accuracy</h1>
          {!didUserPassLesson && <h5 style={didUserPassLesson ? {"color": "black"} : {"color": "red"}}>You scored too low on Accuracy, please go back and re-do the lesson.</h5>}
        </div>
        <div className="column">
          <h1>Seconds</h1>
        </div>
      </div>
    </div>
  )
};

export default TutorialStats;