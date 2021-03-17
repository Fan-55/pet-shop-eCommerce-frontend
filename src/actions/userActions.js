import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
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
