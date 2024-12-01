import axios from 'axios'
import {
    GET_STUDENTS_FAIL,
    GET_STUDENTS_SUCCESS
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
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/students/by_subject/${subjectId}/`
    );
    return res.data;
  };