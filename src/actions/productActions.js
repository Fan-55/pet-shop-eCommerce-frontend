import { apiHelper } from '../apis/helpers'
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS
} from '../constants/productConstants'

//for productsReducer
export const fetchProducts = () => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_FETCH_REQUEST })
    try {
      const { data } = await apiHelper.get('/api/products')
      dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data })
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: PRODUCT_FETCH_FAIL, payload: message })
    }
  }
}

//for productDetailsReducer
export const fetchProductDetails = (productId) => {
  return async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    try {
      const { data } = await apiHelper.get(`/api/products/${productId}`)
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (err) {
      const message = err.response && err.response.data.message ? err.response.data.message : err.message
      dispatch({ type: PRODUCT_DETAILS_FAIL, payload: message })
    }
  }
}