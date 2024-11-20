import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
} from "redux/actions/auth/types";

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated: !!localStorage.getItem('access'),
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
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload, // Actualiza el estado del usuario con los datos obtenidos
      };
    case LOGIN_FAIL:
    case LOGOUT:
    case USER_LOADED_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null, // Resetea el usuario en caso de fallo o logout
      };
    default:
      return state;
  }
}
