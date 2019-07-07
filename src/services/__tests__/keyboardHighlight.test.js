import {_setHandsForKeyPressed} from '../keyboardHighlight';

describe('Keyboard hand highlighting', () => {
  test('Sets retrieves img for key', () => {
    const keyPressed = 'a';
    const images = {'a': ['pathForLeft', 'pathForRight']};
    const { leftHandImage, rightHandImage } = _setHandsForKeyPressed(keyPressed, images);
    expect(leftHandImage).toEqual('pathForLeft');
    expect(rightHandImage).toEqual('pathForRight');
  });
});
