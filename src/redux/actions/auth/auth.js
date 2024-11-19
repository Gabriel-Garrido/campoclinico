import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types";

export const login = (email, password) => async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const body = JSON.stringify({ email, password });
  
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
  
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
  
  export const logout = () => (dispatch) => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  
    dispatch({
      type: LOGOUT,
    });
  };