import UserApi from '../services/api/User'

export const state = () => ({
    users: [],
    user: {}
})

export const mutations = {
    SET_USERS (state, users) {
        state.users = users
    }
}

export const actions = {
    async LOAD_USERS ({ commit }) {
        const response = await UserApi.loadUsers()
        return response.data
    }
}

export const getters = {
    USERS (state) {
        return state.users
    },
}