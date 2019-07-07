import React from 'react';

import Keyboard from './Keyboard';
import RightHand from './RightHand';
import LeftHand from './LeftHand';

import {setHandsForKeyPressed} from '../services/keyboardHighlight';

const LessonTutorialHandsKeyboard = ({ currentKey }) => {
  const { leftHandImage, rightHandImage } = setHandsForKeyPressed(currentKey);
  return (
    <div className="keyboard-hands row">
      <LeftHand img={leftHandImage} />
      <Keyboard currentKey={currentKey} />
      <RightHand img={rightHandImage} />
    </div>
  )
}

export default LessonTutorialHandsKeyboard;