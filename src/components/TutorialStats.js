import React from 'react';

const TutorialStats = ({ time, length, incorrect, didUserPassLesson }) => {
  return (
  <div className="tutorial-stats">
    <div className="row">
        <div className="column">
          <h1><b>{Math.trunc((length / 5) / (time / 60))}</b></h1>
        </div>
        <div className="column">
          <h1><b>{Math.trunc((length - incorrect) / length * 100)}%</b></h1>
        </div>
        <div className="column">
          <h1><b>{Math.trunc(time)}</b></h1>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <h1>WPM</h1>
        </div>
        <div className="column">
          <h1 style={didUserPassLesson ? {"color": "black"} : {"color": "4A4A4A"}}>Accuracy</h1>
          {!didUserPassLesson && (
            <h5 style={didUserPassLesson ? {"color": "black"} : {"color": "red"}}>You scored too low on Accuracy, please go back and re-do the lesson.</h5>
          )}
        </div>
        <div className="column">
          <h1>Seconds</h1>
        </div>
      </div>
    </div>
  )
};

export default TutorialStats;