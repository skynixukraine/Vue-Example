import axios from 'axios'

const OPTIONS = {
    baseURL: 'https://jsonplaceholder.typicode.com/'
}

export const HTTP = axios.create(OPTIONS)