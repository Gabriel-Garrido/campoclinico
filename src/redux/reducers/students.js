import {
    GET_STUDENTS_FAIL,
    GET_STUDENTS_SUCCESS
} from '../actions/students/types'

const initialState = {
    students: null
}

export default function students(state=initialState, action) {
    const { type, payload } = action
    console.log("payload en reducer: ", payload);
    

    switch(type) {
        case GET_STUDENTS_SUCCESS:
            return {
                ...state, 
                students: payload
            }
        case GET_STUDENTS_FAIL:
            return {
                ...state,
                students: null
            }
        default:
            return state
    }
}