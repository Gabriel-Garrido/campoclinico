import {
    GET_STUDENTS_FAIL,
    GET_STUDENTS_SUCCESS,
    GET_CAREERS_SUCCESS,
    GET_CAREERS_FAIL,
    GET_SEMESTERS_SUCCESS,
    GET_SEMESTERS_FAIL,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAIL,
  } from "redux/actions/students/types";

const initialState = {
  students: [],
  careers: [],
  semesters: [],
  error: null,
};

export default function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload || [], // Asegúrate de que sea un array.
      };
    case GET_CAREERS_SUCCESS:
      return {
        ...state,
        careers: action.payload || [],
      };
    case GET_SEMESTERS_SUCCESS:
      return {
        ...state,
        semesters: action.payload || [],
      };
    case GET_STUDENTS_FAIL:
    case GET_CAREERS_FAIL:
    case GET_SEMESTERS_FAIL:
      return {
        ...state,
        error: "Error al cargar los datos",
      };
    default:
      return state;
  }
}
