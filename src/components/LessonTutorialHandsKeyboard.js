import React from 'react';

import Keyboard from './Keyboard';
import RightHand from './RightHand';
import LeftHand from './LeftHand';

const LessonTutorialHandsKeyboard = (props) => {
  return (
    <div className="keyboard-hands container row">
      <LeftHand />
      <Keyboard />
      <RightHand />
    </div>
  )
}

export default LessonTutorialHandsKeyboard;