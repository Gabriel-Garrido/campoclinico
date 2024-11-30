import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
} from "./types";

// Configuración común para solicitudes
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Acción para iniciar sesión
export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    const { access, refresh } = res.data;

    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: { access, refresh },
    });

    dispatch(loadUser());
  } catch (err) {
    console.error("Error en login: ", err.response?.data || err.message);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Acción para cargar los datos del usuario autenticado
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("access");

  if (!token) {
    dispatch({
      type: USER_LOADED_FAIL,
    });
    return;
  }

  try {
    const authConfig = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/users/me/`,
      authConfig
    );

    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.error("Error al cargar el usuario: ", err.response?.data || err.message);
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

// Acción para refrescar el token de acceso
export const refreshAccessToken = () => async (dispatch) => {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) {
    dispatch({
      type: REFRESH_FAIL,
    });
    return;
  }

  const body = JSON.stringify({ refresh });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`,
      body,
      config
    );

    const { access } = res.data;

    localStorage.setItem("access", access);

    dispatch({
      type: REFRESH_SUCCESS,
      payload: { access },
    });

    dispatch(loadUser());
  } catch (err) {
    console.error("Error al refrescar el token: ", err.response?.data || err.message);
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

// Acción para cerrar sesión
export const logout = () => (dispatch) => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  dispatch({
    type: LOGOUT,
  });
};
