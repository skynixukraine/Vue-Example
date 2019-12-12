import { HTTP } from '~/plugins/modules/axios'

export default {
    async loadUsers() {
        const response = await HTTP.get('/users')
        return response
    },
}