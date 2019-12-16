import { HTTP } from '../../plugins/modules/axios'

async function getUsers({ error }) {  
    const response = await HTTP.get('/users')
    return response
}

export { getUsers }