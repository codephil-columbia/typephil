
export function setHandsForKeyPressed(keyPressed) {
  return _setHandsForKeyPressed(keyPressed, imageForCharacter);
};

export function _setHandsForKeyPressed(keyPressed, images) {
  // This should never happen since all possible keys should be 
  // registered in imgForCharacter
  if (!(keyPressed in imageForCharacter)) {
    return { leftHandImage:'', rightHandImage: ''};
  }

  const [leftHandImage, rightHandImage] = images[keyPressed];
  return { leftHandImage, rightHandImage };
};

// The value is an array whose 0 index is the 
// left hand's image path, and whose first index 
// is right hand's image path.
// TODO: remove test paths
const imageForCharacter = {
  "A": ['finger-1', 'finger-10'],
  "a": ['finger-1', 'finger-10'],
  "B": ['finger-1', 'finger-10'],
  "b": ['finger-1', 'finger-10'],
  "C": ['finger-1', 'finger-10'],
  "c": ['finger-1', 'finger-10'],
  "D": ['finger-1', 'finger-10'],
  "d": ['finger-1', 'finger-10'],
  "E": ['finger-1', 'finger-10'],
  "e": ['finger-1', 'finger-10'],
  "F": ['finger-1', 'finger-10'],
  "f": ['finger-1', 'finger-10'],
  "G": ['finger-1', 'finger-10'],
  "g": ['finger-1', 'finger-10'],
  "H": ['finger-1', 'finger-10'],
  "h": ['finger-1', 'finger-10'],
  "I": ['finger-1', 'finger-10'],
  "i": ['finger-1', 'finger-10'],
  "J": ['finger-1', 'finger-10'],
  "j": ['finger-1', 'finger-10'],
  "K": ['finger-1', 'finger-10'],
  "k": ['finger-1', 'finger-10'],
  "L": ['finger-1', 'finger-10'],
  "l": ['finger-1', 'finger-10'],
  "M": ['finger-1', 'finger-10'],
  "m": ['finger-1', 'finger-10'],
  "N": ['finger-1', 'finger-10'],
  "n": ['finger-1', 'finger-10'],
  "O": ['finger-1', 'finger-10'],
  "o": ['finger-1', 'finger-10'],
  "P": ['finger-1', 'finger-10'],
  "p": ['finger-1', 'finger-10'],
  "Q": ['finger-1', 'finger-10'],
  "q": ['finger-1', 'finger-10'],
  "R": ['finger-1', 'finger-10'],
  "r": ['finger-1', 'finger-10'],
  "S": ['finger-1', 'finger-10'],
  "s": ['finger-1', 'finger-10'],
  "T": ['finger-1', 'finger-10'],
  "t": ['finger-1', 'finger-10'],
  "U": ['finger-1', 'finger-10'],
  "u": ['finger-1', 'finger-10'],
  "V": ['finger-1', 'finger-10'],
  "v": ['finger-1', 'finger-10'],
  "W": ['finger-1', 'finger-10'],
  "w": ['finger-1', 'finger-10'],
  "X": ['finger-1', 'finger-10'],
  "x": ['finger-1', 'finger-10'],
  "Y": ['finger-1', 'finger-10'],
  "y": ['finger-1', 'finger-10'],
  "Z": ['finger-1', 'finger-10'],
  "z": ['finger-1', 'finger-10'],
  "&nbsp;": ['finger-1', 'finger-10'],
  "comma": ['finger-1', 'finger-10'],
  "period": ['finger-1', 'finger-10'],
  "apostrophe": ['finger-1', 'finger-10'],
  "semicolon": ['finger-1', 'finger-10'],
  "f-slash": ['finger-1', 'finger-10'],
  "questionmark": ['finger-1', 'finger-10'],
  "exclamationmark": "finger-3, finger-10"
}

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