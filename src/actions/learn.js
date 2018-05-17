import axios from 'axios';

export const FETCH_ALL_CHAPTERS_REQUEST = "FETCH_ALL_CHAPTERS_REQUEST"
export const FETCH_ALL_CHAPTERS_SUCCESS = "FETCH_ALL_CHAPTERS_SUCCESS";
export const FETCH_ALL_CHAPTERS_FAILED = "FETCH_ALL_CHAPTERS_FAILED";

export const FETCH_ALL_PAIRS_REQUEST = "FETCH_ALL_PAIRS_REQUEST"
export const FETCH_ALL_PAIRS_SUCCESS = "FETCH_ALL_PAIRS_SUCCESS";
export const FETCH_ALL_PAIRS_FAILED = "FETCH_ALL_PAIRS_FAILED";

const fetchAllChapterNamesRequest = _ => {
  return {
    type: FETCH_ALL_CHAPTERS_REQUEST
  }
}

const fetchAllChapterNamesSuccess = data => {
  return {
    type: FETCH_ALL_CHAPTERS_SUCCESS,
    data
  }
}

const fetchAllChapterNamesFailed = err => {
  return {
    type: FETCH_ALL_CHAPTERS_FAILED,
    err
  }
}

export const fetchAllChapterNames = _ => {
  return function(dispatch) {
    dispatch(fetchAllChapterNamesRequest());
    return axios.get("http://localhost:5000/chapter/getAllNames")
      .then(res => {
        const {
          data
        } = res;
        dispatch(fetchAllChapterNamesSuccess(data));
      })
      .catch(err => {
        dispatch(fetchAllChapterNamesFailed(err));
      })
  }
}

const fetchAllPairsRequest = _ => {
  return {
    type: FETCH_ALL_PAIRS_REQUEST
  }
}

const fetchAllPairsSuccess = data => {
  return {
    type: FETCH_ALL_PAIRS_SUCCESS,
    data
  }
}

const fetchAllPairsFailed = err => {
  return {
    type: FETCH_ALL_PAIRS_FAILED,
    err
  }
}

export const fetchAllPairs = _ => {
  return function(dispatch) {
    dispatch(fetchAllPairsRequest());
    return axios.get("http://localhost:5000/chapter/getAllInfo")
      .then(res => {
        const {
          data
        } = res;
        console.log(data);
        dispatch(fetchAllPairsSuccess(data));
      })
      .catch(err => {
        dispatch(fetchAllPairsFailed(err));
      })
  }
}