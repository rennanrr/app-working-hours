import {
  CLOCKPOINT_LIST_REQUEST,
  CLOCKPOINT_LIST_SUCCESS,
  CLOCKPOINT_LIST_FAIL,
  CLOCKPOINT_SAVE_REQUEST,
  CLOCKPOINT_SAVE_SUCCESS,
  CLOCKPOINT_SAVE_FAIL,
  CLOCKPOINT_DELETE_REQUEST,
  CLOCKPOINT_DELETE_SUCCESS,
  CLOCKPOINT_DELETE_FAIL,
} from '../Constants/clockPointConstants';

function clockPointListReducer(state = { clockPoints: [] }, action) {
  switch (action.type) {
    case CLOCKPOINT_LIST_REQUEST:
      return { loading: true, clockPoints: [] };
    case CLOCKPOINT_LIST_SUCCESS:
      return { loading: false, clockPoints: action.payload };
    case CLOCKPOINT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function clockPointDeleteReducer(state = {clockPoints:{}}, action) {
  switch (action.type) {
    case CLOCKPOINT_DELETE_REQUEST:
      return { loading: true };
    case CLOCKPOINT_DELETE_SUCCESS:
      return { loading: false, clockPoint: action.payload, success: true };
    case CLOCKPOINT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function clockPointSaveReducer(state = {}, action) {
  switch (action.type) {
    case CLOCKPOINT_SAVE_REQUEST:
      return { loading: true };
    case CLOCKPOINT_SAVE_SUCCESS:
      return { loading: false, success: true, clockPoint: action.payload };
    case CLOCKPOINT_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  clockPointListReducer,
  clockPointSaveReducer,
  clockPointDeleteReducer,
};