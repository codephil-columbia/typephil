
/*
 * Maps user key input values to whatever class
 * is going to be used to highlight the keys 
 * they should be typing with. 
 * From #typephil 1.0
*/

//caps-lock, shift-r, shift-l, cmd, tab, bracket-r, alt, tilde, plus, delete, minus, comma, period
//apostrephe
const fingerHighlightMap = {
    "A": "finger-1 finger-10",
    "a": "finger-1",
    "B": "finger-10 finger-4",
    "b": "finger-4",
    "C": "finger-4 finger-10",
    "c": "finger-4",
    "D": "finger-3 finger-10",
    "d": "finger-3",
    "E": "finger-3 finger-10",
    "e": "finger-3",
    "F": "finger-4 finger-10",
    "f": "finger-4",
    "G": "finger-4 finger-10",
    "g": "finger-4",
    "H": "finger-1 finger-7",
    "h": "finger-7",
    "I": "finger-8 finger-1",
    "i": "finger-8",
    "J": "finger-7 finger-1",
    "j": "finger-7",
    "K": "finger-8 finger-1",
    "k": "finger-8",
    "L": "finger-1 finger-9",
    "l": "finger-9",
    "M": "finger-1 finger-7",
    "m": "finger-7",
    "N": "finger-1 finger-7",
    "n": "finger-7",
    "O": "finger-1 finger-9",
    "o": "finger-9",
    "P": "finger-1 finger-10",
    "p": "finger-10",
    "Q": "finger-1 finger-10",
    "q": "finger-1",
    "R": "finger-10 finger-4",
    "r": "finger-4",
    "S": "finger-2 finger-10",
    "s": "finger-2",
    "T": "finger-10 finger-4",
    "t": "finger-4",
    "U": "finger-1 finger-7",
    "u": "finger-7",
    "V": "finger-10 finger-4",
    "v": "finger-4",
    "W": "finger-10 finger-2",
    "w": "finger-2",
    "X": "finger-10 finger-3",
    "x": "finger-3",
    "Y": "finger-1 finger-7",
    "y": "finger-7",
    "Z": "finger-1 finger-10",
    "z": "finger-1",
    "&nbsp;": "finger-6",
    "comma": "finger-8",
    "period": "finger-10",
    "apostrophe": "finger-10",
    "semicolon": "finger-10",
    "f-slash": "finger-10",
    "questionmark": "finger-1 finger-10",
    "exclamationmark": "finger-3, finger-10"
  };

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