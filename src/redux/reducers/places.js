import {
    GET_PLACES_SUCCESS,
    GET_PLACES_FAIL,
    ASSIGN_STUDENT_SUCCESS,
    ASSIGN_STUDENT_FAIL,
  } from "redux/actions/places/types";
  
  const initialState = {
    places: [],
    message: null,
    error: null,
  };
  
  export default function places(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PLACES_SUCCESS:
        return {
          ...state,
          places: payload,
          error: null,
        };
      case GET_PLACES_FAIL:
        return {
          ...state,
          places: [],
          error: "Failed to fetch places",
        };
      case ASSIGN_STUDENT_SUCCESS:
        return {
          ...state,
          message: payload,
          error: null,
        };
      case ASSIGN_STUDENT_FAIL:
        return {
          ...state,
          message: null,
          error: "Failed to assign student to place",
        };
      default:
        return state;
    }
  }
  