import { combineReducers } from "redux";
import students from './students'
import auth from './auth'
import places from "./places";

export default combineReducers({
    students,
    auth,
    places,
})