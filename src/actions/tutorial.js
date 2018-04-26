
export const GET_NEXT_TEXT = "GET_NEXT_TEXT";
export const CAN_GET_NEXT_TEXT = "CAN_GET_NEXT_TEXT";
export const START_TIMER_FOR_TEXT = "START_TIME_FOR_TEXT";
export const TIMER_FINISED_FOR_TEXT = "TIMER_FINISED_FOR_TEXT";


export const getNextText = () => ({
  type: GET_NEXT_TEXT
})

export const canGetNextText = () => ({
  type: CAN_GET_NEXT_TEXT
})

export const startTimer = () => ({
  type: START_TIMER_FOR_TEXT
})

