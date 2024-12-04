import axios from 'axios'
import {
    GET_STUDENTS_FAIL,
    GET_STUDENTS_SUCCESS,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAIL
} from './types'

export const get_students = () => async (dispatch) => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    }
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/campoclinico/students/`, config)
        console.log( "payload en action res.data : ",  res.data);
        if(res.status === 200) {
            dispatch({
                type: GET_STUDENTS_SUCCESS,
                payload: res.data
            })
            console.log( "payload en action : ",  res.data);
            
        }else{
            dispatch({
                type: GET_STUDENTS_FAIL
            })
        }
    }catch(err) {
        dispatch({
            type:GET_STUDENTS_FAIL
        })
    }
}

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

export const createStudent = (studentData) => async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/campoclinico/students/`,
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: CREATE_STUDENT_SUCCESS,
        payload: res.data.place,
      });
  
      return res.data; // Retornar datos creados si es necesario
    } catch (err) {
      console.error("Error al crear el estudiante:", err);
      dispatch({
        type: CREATE_STUDENT_FAIL,
      });
      throw err;
    }
  };