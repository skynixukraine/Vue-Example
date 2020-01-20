// services
import UserApi from '../services/api/User'

// options (init values)
const DEFAULT_TOKEN = {}
const DEFAULT_USER = {}


export const state = () => ({
    token: DEFAULT_TOKEN,
    user: DEFAULT_USER,
})


export const getters = {
    TOKEN (state) {
        return state.token
    },

    USER (state) {
        return state.user
    },
}


export const mutations = {
    SET_TOKEN (state, token) {
        state.token = token
    },

    SET_USER (state, user) {
        state.user = user
    },
}


export const actions = {
    async REGISTER_USER ({ commit }, requestData) {
        return new Promise ((resolve, reject) => {
            UserApi.registerUser(requestData)
                .then(response => {
                    commit('SET_TOKEN', response.data)
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
                    commit('SET_TOKEN', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    async LOGOUT_USER ({ commit }) {
        return new Promise ((resolve, reject) => {
            UserApi.logoutUser()
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    async AUTOLOGIN_USER({ commit, getters }, { token, user }) {
        // if token exist and user object is emptry
        if (token.access_token && !Object.keys(user).length) {
            return new Promise ((resolve, reject) => {
                UserApi.loadUser({ id: token.doctor_id, token: token.access_token })
                    .then(response => {
                        commit('SET_USER', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
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