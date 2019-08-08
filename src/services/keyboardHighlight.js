
export function setHandsForKeyPressed(keyPressed) {
  return _setHandsForKeyPressed(keyPressed, imageForCharacter);
};

export function _setHandsForKeyPressed(keyPressed, imgs) {
  // This should never happen since all possible keys should be 
  // registered in imgForCharacter
  if (!imgs.has(keyPressed)) {
    return {leftHandImage:'', rightHandImage: ''};
  }
  const [leftHandImage, rightHandImage] = imgs.get(keyPressed);
  return {leftHandImage, rightHandImage};
};

// The value is an array whose 0 index is the 
// left hand's image path, and whose first index 
// is right hand's image path.
// Thumb, index, middle, ring, pinky.
const imageForCharacter = new Map([
  ["A", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']],
  ["a", ['images/hands/Left_pinky.svg', 'images/hands/Right.svg']],
  ["B", ['images/hands/Left_index_shift.svg', 'images/hands/Right.svg']],
  ["b", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["C", ['images/hands/Left_middle.svg', 'images/hands/Right_pinky.svg']],
  ["c", ['images/hands/Left_middle.svg', 'images/hands/Right.svg']],
  ["D", ['images/hands/Left_middle.svg', 'images/hands/Right_pinky.svg']],
  ["d", ['images/hands/Left_middle.svg', 'images/hands/Right.svg']],
  ["E", ['images/hands/Left_middle.svg', 'images/hands/Right_pinky.svg']],
  ["e", ['images/hands/Left_middle.svg', 'images/hands/Right.svg']],
  ["F", ['images/hands/Left_index_shift.svg', 'images/hands/Right.svg']],
  ["f", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["G", ['images/hands/Left_index.svg', 'images/hands/Right_pinky.svg']],
  ["g", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["H", ['images/hands/Left_pinky.svg', 'images/hands/Right_index.svg']],
  ["h", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["I", ['images/hands/Left_pinky.svg', 'images/hands/Right_middle.svg']],
  ["i", ['images/hands/Left.svg', 'images/hands/Right_middle.svg']],
  ["J", ['images/hands/Left_pinky.svg', 'images/hands/Right_index.svg']],
  ["j", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["K", ['images/hands/Left_pinky.svg', 'images/hands/Right_middle.svg']],
  ["k", ['images/hands/Left.svg', 'images/hands/Right_middle.svg']],
  ["L", ['images/hands/Left_pinky.svg', 'images/hands/Right_ring.svg']],
  ["l", ['images/hands/Left.svg', 'images/hands/Right_ring.svg']],
  ["M", ['images/hands/Left_pinky.svg', 'images/hands/Right_index.svg']],
  ["m", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["N", ['images/hands/Left_pinky.svg', 'images/hands/Right_index.svg']],
  ["n", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["O", ['images/hands/Left_pinky.svg', 'images/hands/Right_ring.svg']],
  ["o", ['images/hands/Left.svg', 'images/hands/Right_ring.svg']],
  ["P", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']],
  ["p", ['images/hands/Left.svg', 'images/hands/Right_pinky.svg']],
  ["Q", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']],
  ["q", ['images/hands/Left_pinky.svg', 'images/hands/Right.svg']],
  ["R", ['images/hands/Left_index_shift.svg', 'images/hands/Right.svg']],
  ["r", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["S", ['images/hands/Left_ring_shift.svg', 'images/hands/Right.svg']],
  ["s", ['images/hands/Left_ring.svg', 'images/hands/Right.svg']],
  ["T", ['images/hands/Left_index_shift.svg', 'images/hands/Right.svg']],
  ["t", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["U", ['images/hands/Left_pinky.svg', 'images/hands/Right_index.svg']],
  ["u", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["V", ['images/hands/Left_index_shift.svg', 'images/hands/Right.svg']],
  ["v", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["W", ['images/hands/Left_middle.svg', 'images/hands/Right_pinky.svg']],
  ["w", ['images/hands/Left_ring.svg', 'images/hands/Right.svg']],
  ["X", ['images/hands/Left_ring_shift.svg', 'images/hands/Right.svg']],
  ["x", ['images/hands/Left_ring.svg', 'images/hands/Right.svg']],
  ["Y", ['images/hands/Left_pinky.svg', 'images/hands/Right_index.svg']],
  ["y", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["Z", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']],
  ["z", ['images/hands/Left_pinky.svg', 'images/hands/Right.svg']],
  ["1", ['images/hands/Left_pinky.svg', 'images/hands/Right.svg']],
  ["2", ['images/hands/Left_ring.svg', 'images/hands/Right.svg']],
  ["3", ['images/hands/Left_middle.svg', 'images/hands/Right.svg']],
  ["4", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["5", ['images/hands/Left_index.svg', 'images/hands/Right.svg']],
  ["6", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["7", ['images/hands/Left.svg', 'images/hands/Right_index.svg']],
  ["8", ['images/hands/Left.svg', 'images/hands/Right_middle.svg']],
  ["9", ['images/hands/Left.svg', 'images/hands/Right_ring.svg']],
  ["0", ['images/hands/Left.svg', 'images/hands/Right_pinky.svg']],
  ["subtract", ['images/hands/Left.svg', 'images/hands/Right_pinky.svg']],
  ["underscore", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']],
  ["plus", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']],
  ["equal", ['images/hands/Left.svg', 'images/hands/Right_pinky.svg']],
  ["&nbsp;", ['images/hands/Left_thumb.svg', 'images/hands/Right.svg']],
  ["comma", ['images/hands/Left.svg', 'images/hands/Right_middle.svg']],
  ["period", ['images/hands/Left.svg', 'images/hands/Right_ring.svg']],
  ["apostrophe", ['images/hands/Left.svg', 'images/hands/Right_pinky.svg']],
  ["semicolon", ['images/hands/Left.svg', 'images/hands/Right_pinky.svg']],
  ["f-slash", ['images/hands/Left.svg', 'images/hands/Right_pinky.svg']],
  ["questionmark", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']],
  ["exclamationmark", ['images/hands/Left_pinky.svg', 'images/hands/Right_pinky.svg']]
]);

export const mapToSpecialKeys = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  "$": "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  "_": "-",
  "+": "=",
    "|": "\\",
  "{": "[",
  "}": "]",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/"
};

export const specialKeyNames = {
  ";": "semicolon",
  "[": "bracket-r",
  "]": "bracket-l",
  "`": "tick",
  "=": "equal",
  "-": "minus",
  "/": "f-slash",
  ".": "period",
  ",": "comma"
}

  export const shiftedKeys = ["~", "!", "@", "#", "$", "%", "^", "&amp;", "*", "(", ")", "_", "+", "|", "{", "}", ":", '"', "&lt;", "?"]