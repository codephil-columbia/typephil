
export const MOVE_INDEX_PTR = "MOVE_INDEX_PTR";
export const TUTORIAL_COMPLETED = "TUTORIAL_COMPLETED"
export const UNFREEZE = "UNFREEZE";
export const FREEZE = "FREEZE";

export const moveIndexPtr = indexPtr => ({
  type: MOVE_INDEX_PTR,
  indexPtr
})

export const completedTutorial = () => ({
  type: TUTORIAL_COMPLETED
})

export const unFreeze = () => ({
  type: UNFREEZE 
})

export const freeze = () => ({
  type: FREEZE
})
