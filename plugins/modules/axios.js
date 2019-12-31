import axios from 'axios'

const OPTIONS = {
    baseURL: process.env.BASE_API_URL,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export const HTTP = axios.create(OPTIONS)