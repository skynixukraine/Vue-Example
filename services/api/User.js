import { HTTP } from '~/plugins/modules/axios'

export default {
    async loadUsers() {
        const users = await HTTP.get('/posts')
        return users
    },
}