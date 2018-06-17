import React from 'react';

import Keyboard from './Keyboard';
import RightHand from './RightHand';
import LeftHand from './LeftHand';

const LessonTutorialHandsKeyboard = ({ currentKey }) => {
  return (
    <div className="keyboard-hands row">
      <LeftHand />
      <Keyboard currentKey={currentKey}/>
      <RightHand />
    </div>
  )
}

export default LessonTutorialHandsKeyboard;