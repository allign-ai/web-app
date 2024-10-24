import axios from "axios";

const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000') as string;

export const client = axios.create({
  baseURL : BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})