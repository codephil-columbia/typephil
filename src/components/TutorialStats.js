import React, { Fragment } from 'react';

const TutorialStats = ({ wpm, accuracy, time, correct, incorrect, totalLength, startTime, endTime }) => {
  const totalTime = (Date.now() - startTime) / 1000;
  return (
    <Fragment>
      <div className="row">
        <div className="column">
          <h1>{Math.trunc((totalLength / 5) / (totalTime / 60))}</h1>
        </div>
        <div className="column">
          <h1>{totalTime}</h1>
        </div>
        <div className="column">
          <h1>{correct}%</h1>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <h1>Words per Minute</h1>
        </div>
        <div className="column">
          <h1>Total Seconds</h1>
        </div>
        <div className="column">
          <h1>Accuracy</h1>
        </div>
      </div>
    </Fragment>
  )
};

export default TutorialStats;