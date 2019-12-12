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
    async LOAD_AND_COMMIT_USERS ({ commit }) {
        const response = await UserApi.loadUsers()
        commit('SET_USERS', response.data)
    }
}

export const getters = {
    USERS (state) {
        return state.users
    },
}