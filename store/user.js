// services
import UserApi from '../services/api/User'

// options (init values)
const DEFAULT_USER = null


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
        return new Promise ((resolve, reject) => {
            UserApi.registerUser(requestData)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    async LOGIN_USER ({ commit }, requestData) {
        return new Promise ((resolve, reject) => {
            UserApi.loginUser(requestData)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    async LOGOUT_USER ({ commit }, token) {
        return new Promise ((resolve, reject) => {
            UserApi.logoutUser(token)
                .then(response => {
                    commit('SET_USER', null)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
    
    async LOAD_USER ({ commit }, { id, token }) {
        return new Promise ((resolve, reject) => {
            UserApi.loadUser({ id, token })
                .then(response => {
                    commit('SET_USER', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })  
        })
    },

    async VERIFY_USER_EMAIL ({ commit }, requestData) {
        return new Promise ((resolve, reject) => {
            UserApi.verifyUserEmail(requestData)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })  
        })
    },

    async SEND_EMAIL_VERIFICATION_LINK ({ commit }, requestData) {
        return new Promise ((resolve, reject) => {
            UserApi.sendEmailVerifyLink(requestData)
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })  
        })
    },
}


export const getters = {
    USER (state) {
        return state.user
    },
}