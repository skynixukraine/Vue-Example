import { HTTP } from '~/plugins/modules/axios'

export default {
    async loadUsers() {
        const users = await HTTP.get('/users')
        return users
    },
}