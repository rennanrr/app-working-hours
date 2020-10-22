import Api from "../Services/Api";
import {
  CLOCKPOINT_LIST_REQUEST,
  CLOCKPOINT_LIST_SUCCESS,
  CLOCKPOINT_LIST_FAIL,
  CLOCKPOINT_SAVE_REQUEST,
  CLOCKPOINT_SAVE_SUCCESS,
  CLOCKPOINT_SAVE_FAIL,
  CLOCKPOINT_DELETE_SUCCESS,
  CLOCKPOINT_DELETE_FAIL,
  CLOCKPOINT_DELETE_REQUEST,
} from '../Constants/clockPointConstants';
import moment from 'moment';

const listClockPoints = (id_user) => async (dispatch) => {
  try {
    dispatch({ type: CLOCKPOINT_LIST_REQUEST });
    const { data } = await Api.get(
      '/clockPoint?id_user=' +
        id_user
    );
    dispatch({ type: CLOCKPOINT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CLOCKPOINT_LIST_FAIL, payload: error.message });
  }
};

const saveClockPoint = (clockPoint) => async (dispatch) => {
  try {
    dispatch({ type: CLOCKPOINT_SAVE_REQUEST, payload: clockPoint });
    if(moment.duration(moment().diff(moment(clockPoint.exit)))._milliseconds > 0 &&
       clockPoint.arrive < clockPoint.exit && 
       clockPoint.lunch_arrive < clockPoint.exit && 
       clockPoint.lunch_exit > clockPoint.arrive && 
       clockPoint.lunch_exit <= clockPoint.lunch_arrive){
      if (!clockPoint.id) {
        const { data } = await Api.post('/clockPoint', clockPoint);
        dispatch({ type: CLOCKPOINT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await Api.put('/clockPoint',clockPoint);
        dispatch({ type: CLOCKPOINT_SAVE_SUCCESS, payload: data });
      }
    }
    else {
      dispatch({ type: CLOCKPOINT_SAVE_FAIL, payload: 'These dates and times are invalid.' });
    }
  } catch (error) {
    dispatch({ type: CLOCKPOINT_SAVE_FAIL, payload: error.message });
  }
};

const deleteClockPoint = (clockPointId) => async (dispatch) => {
  try {
    dispatch({ type: CLOCKPOINT_DELETE_REQUEST, payload: clockPointId });
    const { data } = await Api.delete('/clockPoint?id=' + clockPointId);
    dispatch({ type: CLOCKPOINT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: CLOCKPOINT_DELETE_FAIL, payload: error.message });
  }
};

export { listClockPoints, saveClockPoint, deleteClockPoint };