
export function setHandsForKeyPressed(keyPressed) {
  return _setHandsForKeyPressed(keyPressed, imageForCharacter);
};

export function _setHandsForKeyPressed(keyPressed, imgs) {
  // This should never happen since all possible keys should be 
  // registered in imgForCharacter
  if (!imgs.has(keyPressed)) {
    return {leftHandImage:'', rightHandImage: ''};
  }
  const {leftHandImage, rightHandImage} = imgs.get(keyPressed);
  return {leftHandImage, rightHandImage};
};

// The value is an array whose 0 index is the 
// left hand's image path, and whose first index 
// is right hand's image path.
// TODO: remove test paths
const imageForCharacter = new Map([
  ["A": ['images/hands/Left_ring.png', 'images/hands/']],
  ["a": ['images/hands/Left_pinky.svg', 'images/hands/']],
  ["B": ['images/hands/', 'images/hands/0']],
  ["b": ['images/hands/', 'images/hands/0']],
  ["C": ['images/hands/', 'images/hands/0']],
  ["c": ['images/hands/', 'images/hands/0']],
  ["D": ['images/hands/', 'images/hands/0']],
  ["d": ['images/hands/', 'images/hands/0']],
  ["E": ['images/hands/', 'images/hands/0']],
  ["e": ['images/hands/', 'images/hands/0']],
  ["F": ['images/hands/', 'images/hands/0']],
  ["f": ['images/hands/', 'images/hands/0']],
  ["G": ['images/hands/', 'images/hands/0']],
  ["g": ['images/hands/', 'images/hands/0']],
  ["H": ['images/hands/', 'images/hands/0']],
  ["h": ['images/hands/', 'images/hands/0']],
  ["I": ['images/hands/', 'images/hands/0']],
  ["i": ['images/hands/', 'images/hands/0']],
  ["J": ['images/hands/', 'images/hands/0']],
  ["j": ['images/hands/', 'images/hands/0']],
  ["K": ['images/hands/', 'images/hands/0']],
  ["k": ['images/hands/', 'images/hands/0']],
  ["L": ['images/hands/', 'images/hands/0']],
  ["l": ['images/hands/', 'images/hands/0']],
  ["M": ['images/hands/', 'images/hands/0']],
  ["m": ['images/hands/', 'images/hands/0']],
  ["N": ['images/hands/', 'images/hands/0']],
  ["n": ['images/hands/', 'images/hands/0']],
  ["O": ['images/hands/', 'images/hands/0']],
  ["o": ['images/hands/', 'images/hands/0']],
  ["P": ['images/hands/', 'images/hands/0']],
  ["p": ['images/hands/', 'images/hands/0']],
  ["Q": ['images/hands/', 'images/hands/0']],
  ["q": ['images/hands/', 'images/hands/0']],
  ["R": ['images/hands/', 'images/hands/0']],
  ["r": ['images/hands/', 'images/hands/0']],
  ["S": ['images/hands/', 'images/hands/0']],
  ["s": ['images/hands/', 'images/hands/0']],
  ["T": ['images/hands/', 'images/hands/0']],
  ["t": ['images/hands/', 'images/hands/0']],
  ["U": ['images/hands/', 'images/hands/0']],
  ["u": ['images/hands/', 'images/hands/0']],
  ["V": ['images/hands/', 'images/hands/0']],
  ["v": ['images/hands/', 'images/hands/0']],
  ["W": ['images/hands/', 'images/hands/0']],
  ["w": ['images/hands/', 'images/hands/0']],
  ["X": ['images/hands/', 'images/hands/0']],
  ["x": ['images/hands/', 'images/hands/0']],
  ["Y": ['images/hands/', 'images/hands/0']],
  ["y": ['images/hands/', 'images/hands/0']],
  ["Z": ['images/hands/', 'images/hands/0']],
  ["z": ['images/hands/', 'images/hands/0']],
  ["&nbsp;": ['images/hands/', 'images/hands/0']],
  ["comma": ['images/hands/', 'images/hands/0']],
  ["period": ['images/hands/', 'images/hands/0']],
  ["apostrophe": ['images/hands/', 'images/hands/0']],
  ["semicolon": ['images/hands/', 'images/hands/0']],
  ["f-slash": ['images/hands/', 'images/hands/0']],
  ["questionmark": ['images/hands/', 'images/hands/0']],
  ["exclamationmark": ["finger-3, images/hands/0"]]
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