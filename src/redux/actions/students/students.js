import axios from "axios";
import {
    GET_STUDENTS_FAIL,
    GET_STUDENTS_SUCCESS,
    GET_CAREERS_SUCCESS,
    GET_CAREERS_FAIL,
    GET_SEMESTERS_SUCCESS,
    GET_SEMESTERS_FAIL,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAIL,
} from "./types";

// Obtener estudiantes por carrera y semestre
export const get_students = (careerId, semesterId) => async (dispatch) => {
    console.log("Obteniendo estudiantes para carrera:", careerId, "y semestre:", semesterId);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/campoclinico/students_by_career_semester/${careerId}/${semesterId}/`
        );

        console.log("Respuesta de estudiantes:", res.data);

        if (res.status === 200) {
            dispatch({
                type: GET_STUDENTS_SUCCESS,
                payload: res.data.students,
            });
        } else {
            console.error("Error en la respuesta al obtener estudiantes:", res.status);
            dispatch({ type: GET_STUDENTS_FAIL });
        }
    } catch (err) {
        console.error("Error al obtener estudiantes:", err);
        dispatch({ type: GET_STUDENTS_FAIL });
    }
};

export const getStudentsBySubject = async (subjectId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/campoclinico/students_by_subject/${subjectId}/`
      );
      return response.data.students;
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      throw error;
    }
  };

// Obtener carreras por universidad del usuario logueado
export const get_careers = (universityId) => async (dispatch) => {
    console.log("Obteniendo carreras para la universidad:", universityId);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/campoclinico/careers_by_university/${universityId}/`
        );

        console.log("Respuesta de carreras:", res.data);

        if (res.status === 200) {
            dispatch({
                type: GET_CAREERS_SUCCESS,
                payload: res.data.careers,
            });
        } else {
            console.error("Error en la respuesta al obtener carreras:", res.status);
            dispatch({ type: GET_CAREERS_FAIL });
        }
    } catch (err) {
        console.error("Error al obtener carreras:", err);
        dispatch({ type: GET_CAREERS_FAIL });
    }
};

// Obtener semestres por carrera
export const get_semesters = (careerId) => async (dispatch) => {
    console.log("Obteniendo semestres para la carrera:", careerId);
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/campoclinico/semesters_by_career/${careerId}/`
        );

        console.log("Respuesta de semestres:", res.data);

        if (res.status === 200) {
            dispatch({
                type: GET_SEMESTERS_SUCCESS,
                payload: res.data.semesters,
            });
        } else {
            console.error("Error en la respuesta al obtener semestres:", res.status);
            dispatch({ type: GET_SEMESTERS_FAIL });
        }
    } catch (err) {
        console.error("Error al obtener semestres:", err);
        dispatch({ type: GET_SEMESTERS_FAIL });
    }
};

// Crear estudiante
export const create_student = (studentData) => async (dispatch) => {
    console.log("Creando estudiante con datos:", studentData);
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/campoclinico/students/`,
            studentData,
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("Respuesta al crear estudiante:", res.data);

        if (res.status === 201) {
            dispatch({
                type: CREATE_STUDENT_SUCCESS,
                payload: res.data.student,
            });
        } else {
            console.error("Error en la respuesta al crear estudiante:", res.status);
            dispatch({ type: CREATE_STUDENT_FAIL });
        }
    } catch (err) {
        console.error("Error al crear estudiante:", err);
        dispatch({ type: CREATE_STUDENT_FAIL });
    }
};
