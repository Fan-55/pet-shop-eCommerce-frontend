import axios from 'axios'

const baseURL = 'https://pet-shop-api.herokuapp.com' || 'http://localhost:5000'

export const apiHelper = axios.create({
  baseURL
})