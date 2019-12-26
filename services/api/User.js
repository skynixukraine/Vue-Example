import { HTTP } from '~/plugins/modules/axios'
import Vue from 'vue'

const apiRoutes = Vue.prototype.$apiRoutes

export default {

    async registerUser(registerData) {
        const response = await HTTP.post(apiRoutes.register.path)
        return response
    },

    async loginUser() {
        const response = await HTTP.post('/login')
        return response
    },

    async logoutUser() {
        const response = await HTTP.post('/logout')
        return response
    },

    async sendResetLink() {
        const response = await HTTP.post('/send-reset-link')
        return response
    },

    async updatePassword() {
        const response = await HTTP.patch('/users')
        return response
    },

    async loadUsers() {
        const response = await HTTP.get(apiRoutes.users.path)
        return response
    },

    async loadUser(userId) {
        const response = await HTTP.get(apiRoutes.users.path, { params: userId })
        return response
    }
}