// services
import UserApi from '../services/api/User'

// options (init values)
const DEFAULT_USER = {}


export const state = () => ({
    user: DEFAULT_USER,
})


export const getters = {
    USER (state) {
        return state.user
    },

    IS_USER_LOGIN (state) {
        return !!Object.keys(state.user).length
    },
}


export const mutations = {
    SET_USER (state, user) {
        state.user = user
    },
}


export const actions = {
    async REGISTER_USER ({ commit }, requestData) {
        return new Promise ((resolve, reject) => {
            UserApi.registerUser(requestData)
                .then(token => {
                    // login user after success register
                    localStorage.setItem('token', JSON.stringify(token.data))
                    resolve(token)
                })
                .catch(error => {
                    reject(error)
                })  
        })
    },

    async AUTOLOGIN_USER({ state, commit, getters }) {
        const token = JSON.parse(localStorage.getItem('token')) ? JSON.parse(localStorage.getItem('token')) : {}

        // if localStorage has Token and state.user is empty - DO AUTOLOGIN
        if (token.hasOwnProperty('access_token') && !Object.keys(getters['USER']).length) {
            return new Promise ((resolve, reject) => {
                UserApi.loadUser({ id: token.doctor_id, token: token.access_token })
                    .then(user => {
                        commit('SET_USER', user.data)
                        resolve(user)
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
                .then(user => {
                    commit('SET_USER', user.data)
                    resolve(user)
                })
                .catch(error => {
                    reject(error)
                })  
        })
    },
}