import axios from 'axios';

// Fetch info for user with uid <x>
// while fetching, show spinner/intermediate state 
// when handle data and then show it

const FETCH_BULK_REQUEST = "FETCH_BULK_REQUEST";
const FETCH_BULK_SUCCESS = "FETCH_BULK_SUCCESS";
const FETCH_BULK_FAILURE = "FETCH_BULK_FAILURE";

export const fetchBulkRequest = uid => { 
  return {
    type: FETCH_BULK_REQUEST,
    uid
  }
}

export const fetchBulkSuccess = bulk => {
  return {
    type: FETCH_BULK_SUCCESS,
    bulk
  }
}

export const fetchBulkFailure = _ => {
  return {
    type: FETCH_BULK_FAILURE
  }
}


export const fetchBulk = uid => {
  return function(dispatch) {
    dispatch(fetchBulkRequest(uid) => {
      
    })
  }
}