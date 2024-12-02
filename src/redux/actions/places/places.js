import axios from "axios";
import { 
  GET_PLACES_SUCCESS, 
  GET_PLACES_FAIL, 
  ASSIGN_STUDENT_SUCCESS, 
  ASSIGN_STUDENT_FAIL,
  CREATE_PLACE_SUCCESS, 
  CREATE_PLACE_FAIL
} from "./types";

// Action to fetch all places
export const getPlaces = (university) => async (dispatch) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/campoclinico/places/university/${university}/`);
        console.log('places: ', res.data.places);
        
        dispatch({
            type: GET_PLACES_SUCCESS,
            payload: res.data.places, // Expected key in API response
        });
    } catch (err) {
        dispatch({
            type: GET_PLACES_FAIL,
        });
    }
};

// Action to assign a student to a place
export const assignStudentToPlace = (place_id, student_id) => async (dispatch) => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/campoclinico/places/assign/`, {
            place_id,
            student_id,
        });
        dispatch({
            type: ASSIGN_STUDENT_SUCCESS,
            payload: res.data.message, // Expected key in API response
        });
    } catch (err) {
        dispatch({
            type: ASSIGN_STUDENT_FAIL,
        });
    }
};

export const createPlace = (placeData) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/campoclinico/places/`,
        placeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: CREATE_PLACE_SUCCESS,
        payload: res.data.place,
      });
  
      return res.data; // Retornar datos creados si es necesario
    } catch (err) {
      console.error("Error al crear el place:", err);
      dispatch({
        type: CREATE_PLACE_FAIL,
      });
      throw err;
    }
  };