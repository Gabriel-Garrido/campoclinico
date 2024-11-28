import axios from "axios";
import { 
  GET_PLACES_SUCCESS, 
  GET_PLACES_FAIL, 
  ASSIGN_STUDENT_SUCCESS, 
  ASSIGN_STUDENT_FAIL 
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
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/places/assign/`, {
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
