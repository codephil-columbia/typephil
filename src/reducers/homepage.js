import {
  GET_AVG_STATS_REQ,
  GET_AVG_STATS_SUCCESS,
} from '../actions/homepage';

const statsForUser = (state = {}, action) => {
  switch(action.type) {
    case GET_AVG_STATS_REQ: {
      return { ...state, isStatsLoading: true };
    }

    case GET_AVG_STATS_SUCCESS: {
      const {
        avgaccuracy: avgAccuracy,
        avgwpm: avgWPM
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

export default statsForUser;