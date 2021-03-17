import * as actionTypes from '../actionTypes';
import axios from '../../axios';

//Get Weight
export const getWeightStart = () => {
  return {
    type: actionTypes.GET_WEIGHT_START,
  };
};
export const getWeightSuccess = payload => {
  return {
    type: actionTypes.GET_WEIGHT_SUCCESS,
    list: payload.list,
    userId: payload.userId,
  };
};
export const getWeightFail = error => {
  return {
    type: actionTypes.GET_WEIGHT_FAIL,
    error: error,
  };
};

// Add Weight
export const addtWeightStart = () => {
  return {
    type: actionTypes.POST_WEIGHT_START,
  };
};
export const addtWeightSuccess = payload => {
  return {
    type: actionTypes.POST_WEIGHT_SUCCESS,
    payload,
  };
};
export const addtWeightFail = error => {
  return {
    type: actionTypes.POST_WEIGHT_FAIL,
    error: error,
  };
};

// Delete Weight
export const deleteWeightStart = () => {
  return {
    type: actionTypes.DELETE_WEIGHT_START,
  };
};
export const deleteWeightSuccess = payload => {
  return {
    type: actionTypes.DELETE_WEIGHT_SUCCESS,
    createdAt: payload,
  };
};
export const deleteWeightFail = error => {
  return {
    type: actionTypes.DELETE_WEIGHT_FAIL,
    error: error,
  };
};

// Sending Requests to API
export const getWeights = id => {
  return dispatch => {
    dispatch(getWeightStart());

    axios
      .get(`/api/weight?userID=${id}`)
      .then(response => {
        dispatch(getWeightSuccess({ list: response.data.data, userId: id }));
      })
      .catch(error => {
        console.log(error);
        dispatch(getWeightFail(error));
      });
  };
};
export const addtWeight = data => {
  return dispatch => {
    dispatch(addtWeightStart());
    axios
      .post('/api/weight', data)
      .then(response => {
        dispatch(addtWeightSuccess(data));
      })
      .catch(error => {
        console.log(error);
        dispatch(addtWeightFail(error));
      });
  };
};
export const deleteWeight = createdAt => {
  return dispatch => {
    console.log('DELETE STARTED');
    console.log(createdAt);
    dispatch(deleteWeightStart());
    axios
      .delete(`/api/weight?createdAt=${createdAt}`)
      .then(() => {
        dispatch(deleteWeightSuccess(createdAt));
      })
      .catch(error => {
        console.log(error);
        dispatch(deleteWeightFail(error));
      });
  };
};
