import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_FETCH_REQUEST,
  ORDER_FETCH_SUCCESS,
  ORDER_FETCH_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from '../constants/orderConstants'

export const createOrder = (formData) => {
  return async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST })
    const { userLogin: { currentUser } } = getState()
    try {
      const { data } = await axios.post('/api/orders', formData, {
        headers: {
          authorization: `Bearer ${currentUser.token}`
        }
      })
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: ORDER_CREATE_FAIL, payload: message })
    }
  }
}

export const fetchOrderDetails = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({ type: ORDER_DETAILS_REQUEST })
    const { userLogin: { currentUser } } = getState()
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${currentUser.token}`
        }
      })
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
    }
  }
}

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    dispatch({ type: ORDER_FETCH_REQUEST })
    const { userLogin: { currentUser } } = getState()
    try {
      const { data } = await axios.get('/api/orders', {
        headers: {
          authorization: `Bearer ${currentUser.token}`
        }
      })
      dispatch({ type: ORDER_FETCH_SUCCESS, payload: data })
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: ORDER_FETCH_FAIL, payload: message })
    }
  }
}

export const deleteOrder = (orderId) => {
  return async (dispatch, getState) => {
    dispatch({ type: ORDER_DELETE_REQUEST })
    const { userLogin: { currentUser } } = getState()
    try {
      await axios.delete(`/api/orders/${orderId}`, {
        headers: {
          authorization: `Bearer ${currentUser.token}`
        }
      })
      dispatch({ type: ORDER_DELETE_SUCCESS })
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: ORDER_DELETE_FAIL, payload: message })
    }
  }
}