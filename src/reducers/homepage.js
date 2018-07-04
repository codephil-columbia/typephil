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
        avgAccuracy,
        avgWPM
      } = action.data;

      return { 
        ...state, 
        avgAccuracy,
        avgWPM,
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
      const { compcount, totallessons } = action.data;
      const percentageComplete = Math.trunc(
        (compcount / totallessons) * 100
      );
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
