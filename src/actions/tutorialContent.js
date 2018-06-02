
export const USER_PRESSED_KEY = "USER_PRESSED_KEY";
export const userPressedKey = key => ({
  type: USER_PRESSED_KEY,
  key
})

export const VALIDATE_PRESSED_KEY = "VALIDATE_PRESSED_KEY"
export const validatePressedKey = got => ({
  type: VALIDATE_PRESSED_KEY,
  got
})

export const START_LESSON = "START_LESSON";
export const startLesson = () => ({
  type: START_LESSON,
  time: Date.now()
})

export const STOP_LESSON = "STOP_LESSON"
export const stopLesson = () => ({
  type: STOP_LESSON,
  time: Date.now()
})