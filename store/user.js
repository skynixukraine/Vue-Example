import UserApi from '../services/api/User'

export const state = () => ({
    users: [],
    user: {}
})

export const mutations = {
    SET_USERS (state, users) {
        state.users = users
    },

    SET_USER (state, user) {
        state.user = user
    },
}

export const actions = {
    async LOAD_USERS ({ commit }) {
        const response = await UserApi.loadUsers()
        return response.data.data
    },

    async LOAD_USER ({ commit }, userId) {
        const response = await UserApi.loadUser(userId)
        return response.data
    },

    async REGISTER_USER ({ commit }, requestData) {
        const response = await UserApi.registerUser(requestData)
        return response
    },
}

export const getters = {
    USERS (state) {
        return state.users
    },
}