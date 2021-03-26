import axios from 'axios'
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
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

