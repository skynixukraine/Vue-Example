import axios from 'axios'

const OPTIONS = {
    baseURL: 'https://staging.onl-haut.skynix.co/api/v1',
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export const HTTP = axios.create(OPTIONS)