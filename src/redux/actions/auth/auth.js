import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, USER_LOADED_SUCCESS, USER_LOADED_FAIL } from "./types";

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
    // Obtener los tokens (access y refresh)
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    const { access, refresh } = res.data;

    // Guardar los tokens en localStorage
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Cargar los datos del usuario después del login
    dispatch(loadUser());
  } catch (err) {
    console.error(err);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Acción para cargar los datos del usuario autenticado
export const loadUser = () => async (dispatch) => {
  try {
    // Configuración con el token de acceso
    const token = localStorage.getItem("access");
    const authConfig = {
      headers: {
        ...config.headers,
        Authorization: `JWT ${token}`,
      },
    };

    // Solicitar los datos del usuario
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/auth/users/me/`,
      authConfig
    );

    console.log("User data: ", res.data);

    dispatch({
      type: USER_LOADED_SUCCESS,
      payload: res.data, // Aquí estarán los datos del usuario (nombre, apellido, etc.)
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: USER_LOADED_FAIL,
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
