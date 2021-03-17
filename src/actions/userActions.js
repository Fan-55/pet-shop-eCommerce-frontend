import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from '../constants/userConstants'


export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_LOGIN_REQUEST })
    try {
      const { data } = await axios.post('/api/login', { email, password })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      localStorage.setItem('currentUser', JSON.stringify(data))
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: USER_LOGIN_FAIL, payload: message })
    }
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    dispatch({ type: USER_LOGOUT })
    localStorage.removeItem('currentUser')
  }
}

export const register = (formData) => {
  return async (dispatch, getState) => {
    dispatch({ type: USER_REGISTER_REQUEST })
    try {
      const { data } = await axios.post('/api/register', formData)
      dispatch({ type: USER_REGISTER_SUCCESS })
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
      localStorage.setItem('currentUser', JSON.stringify(data))
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: USER_REGISTER_FAIL, payload: message })
    }
  }
}