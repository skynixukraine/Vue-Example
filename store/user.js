import UserApi from '../services/api/User'

export const state = () => ({
    users: [{id:23}, {id:17}]
})

export const mutations = {
    SET_USERS (state, posts) {
        state.users = posts
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
        return state.posts
    },
}