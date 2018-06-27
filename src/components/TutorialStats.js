import React from 'react';

const TutorialStats = ({ wpm, accuracy, time }) => {
  return (
    <div class="row">
      <div class="column">
        <div>
          <h1>{wpm}</h1>
        </div>
        <div>
          <h1>{accuracy}</h1>
        </div>
      </div>
      <div class="column">
        <h1>{time}</h1>
      </div>
      <div class="column">

      </div>
    </div>
  )
};

export default TutorialStats;