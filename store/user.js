// services
import UserApi from '../services/api/User'

// options (init values)
const DEFAULT_USER = {}


export const state = () => ({
    user: DEFAULT_USER,
})


export const mutations = {
    SET_USER (state, user) {
        state.user = user
    },
}


export const actions = {
    async REGISTER_USER ({ commit }, requestData) {
        const response = await UserApi.registerUser(requestData)
        return response
    },
    
    async LOAD_USER ({ commit }, userId) {
        const response = await UserApi.loadUser(userId)
        return response.data
    },
}


export const getters = {
    USER (state) {
        return state.user
    },
}