
export const MOVE_INDEX_PTR = "MOVE_INDEX_PTR";
export const START_TUTORIAL = "START_TUTORIAL";
export const CAN_GET_NEXT_TEXT = "CAN_GET_NEXT_TEXT";
export const START_TIMER_FOR_TEXT = "START_TIME_FOR_TEXT";
export const TIMER_FINISED_FOR_TEXT = "TIMER_FINISED_FOR_TEXT";
export const FREEZE_INFO_TEXT = "FREEZE_INFO_TEXT";
export const LESSON_COMPLETED = "LESSON_COMPLETED"
export const UNFREEZE = "UNFREEZE";
export const FREEZE = "FREEZE";

export const moveIndexPtr = indexPtr => ({
  type: MOVE_INDEX_PTR,
  indexPtr
})

export const startTutorial = () => ({
  type: START_TUTORIAL
})

export const unFreeze = () => ({
  type: UNFREEZE 
})

export const lessonCompleted = () => ({
  type: LESSON_COMPLETED
})

export const freeze = () => ({
  type: FREEZE
})
