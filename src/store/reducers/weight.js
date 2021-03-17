import * as actionTypes from '../actionTypes';

const initialState = {
  list: [],
  userId: null,
  error: null,
  loading: false,
};

// getWeight
const getWeightStart = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};

const getWeightSuccess = (state, action) => {
  return {
    ...state,
    list: action.list,
    userId: action.userId,
    error: null,
    loading: false,
  };
};

const getWeightFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

// addWeight
const addtWeightStart = state => {
  return {
    ...state,
    loading: true,
  };
};

const addtWeightSuccess = (state, action) => {
  const newList = [
    ...state.list,
    {
      userID: action.payload.userID,
      value: action.payload.value,
      createdAt: new Date().toJSON(),
    },
  ];
  console.log(action);
  return {
    ...state,
    list: newList,
    error: null,
    loading: false,
  };
};

const addtWeightFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

// deleteWeight
const deleteWeightStart = state => {
  return {
    ...state,
    loading: true,
  };
};

const deleteWeightSuccess = (state, action) => {
  const newList = [...state.list].filter(
    item => item.createdAt !== action.createdAt
  );
  return {
    ...state,
    list: newList,
    error: null,
    loading: false,
  };
};

const deleteWeightFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WEIGHT_START:
      return getWeightStart(state, action);
    case actionTypes.GET_WEIGHT_SUCCESS:
      return getWeightSuccess(state, action);
    case actionTypes.GET_WEIGHT_FAIL:
      return getWeightFail(state, action);

    case actionTypes.POST_WEIGHT_START:
      return addtWeightStart(state, action);
    case actionTypes.POST_WEIGHT_SUCCESS:
      return addtWeightSuccess(state, action);
    case actionTypes.POST_WEIGHT_FAIL:
      return addtWeightFail(state, action);

    case actionTypes.DELETE_WEIGHT_START:
      return deleteWeightStart(state, action);
    case actionTypes.DELETE_WEIGHT_SUCCESS:
      return deleteWeightSuccess(state, action);
    case actionTypes.DELETE_WEIGHT_FAIL:
      return deleteWeightFail(state, action);

    default:
      return state;
  }
};

export default reducer;
