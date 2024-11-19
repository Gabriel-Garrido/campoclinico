import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "redux/actions/auth/types";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: !!localStorage.getItem('access'),
  };
  
  export default function auth(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          access: payload.access,
          refresh: payload.refresh,
          isAuthenticated: true,
        };
      case LOGIN_FAIL:
      case LOGOUT:
        return {
          ...state,
          access: null,
          refresh: null,
          isAuthenticated: false,
        };
      default:
        return state;
    }
  }