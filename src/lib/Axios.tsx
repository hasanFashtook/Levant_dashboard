"use client";
import axios from 'axios';
const BASE_URL = 'https://backend.watanyia.com/'

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})