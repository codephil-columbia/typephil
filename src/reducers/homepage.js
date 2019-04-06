import {
  GET_AVG_STATS_REQ,
  GET_AVG_STATS_SUCCESS,
  GET_CHAPTER_PROGRESS,
  GET_CHAPTER_PROGRESS_SUCCESS
} from '../actions/homepage';

export const statsForUser = (state = {}, action) => {
  switch(action.type) {
    case GET_AVG_STATS_REQ: {
      return { 
        ...state, 
        isStatsLoading: true 
      };
    }

    case GET_AVG_STATS_SUCCESS: {
      const {
        wpm,
        accuracy
      } = action.data;

      return { 
        ...state, 
        accuracy,
        wpm,
        isStatsLoading: false,
      }
    }

    default: {
      return state;
    }
  }
}

export const chapterProgressPercentage = (
  state = {isPercentageLoading: true}, 
  action
) => {
  switch(action.type) {
    case GET_CHAPTER_PROGRESS: {
      return {
        ...state, 
        isPercentageLoading: true
      };
    }

    case GET_CHAPTER_PROGRESS_SUCCESS: {
      const percentage = action.data;
      const percentageComplete = Math.trunc(percentage*100);
      return { 
        ...state, 
        percentageComplete,
        isPercentageLoading: false
      };
    }

    default: {
      return state;
    }
  }
}
