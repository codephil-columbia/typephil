import {_setHandsForKeyPressed} from '../keyboardHighlight';

describe('Keyboard hand highlighting', () => {
  test('Sets retrieves img for key', () => {
    const keyPressed = 'a';
    const imgs = new Map([
      ['a', {leftHandImage:'pathForLeft', rightHandImage:'pathForRight'}],
    ]);
    const { leftHandImage, rightHandImage } = _setHandsForKeyPressed(keyPressed, imgs);
    expect(leftHandImage).toEqual('pathForLeft');
    expect(rightHandImage).toEqual('pathForRight');
  });
  test('It returns empty string when key is not present', () => {
    const keyNotPresent = 'a';
    const { leftHandImage, rightHandImage } = _setHandsForKeyPressed(keyNotPresent, new Map([
      ['b', {leftHandImage:'left', rightHandImage:'right'}]
    ]));
    expect(leftHandImage).toEqual('');
    expect(rightHandImage).toEqual('');
  })
});
