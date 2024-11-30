import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from "redux/actions/auth/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: !!localStorage.getItem("access"),
  user: null,
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
    case REFRESH_SUCCESS:
      return {
        ...state,
        access: payload.access,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case REFRESH_FAIL:
    case USER_LOADED_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}
