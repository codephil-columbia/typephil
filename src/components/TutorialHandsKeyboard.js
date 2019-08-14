import React from 'react';

import Keyboard from './Keyboard';
import RightHand from './RightHand';
import LeftHand from './LeftHand';

import {setHandsForKeyPressed} from '../services/keyboardHighlight';

const LessonTutorialHandsKeyboard = ({ currentKey, leftHandImg, rightHandImg }) => {
  return (
    <div className="keyboard-hands row">
      <LeftHand img={leftHandImg} />
      <Keyboard currentKey={currentKey} />
      <RightHand img={rightHandImg} />
    </div>
  )
}

export default LessonTutorialHandsKeyboard;
