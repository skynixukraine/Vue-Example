// services
import LanguagesApi from '../services/api/Languages'

// options (init values)
const DEFAULT_LANGUAGES = []


export const state = () => ({
    languages: DEFAULT_LANGUAGES,
})


export const mutations = {
    SET_LANGUAGES (state, languages) {
        state.languages = languages
    },
}


export const actions = {
    async LOAD_LANGUAGES ({ commit }) {
        return new Promise ((resolve, reject) => {
            LanguagesApi.loadLanguages()
                .then(response => {
                    commit('SET_LANGUAGES', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}


export const getters = {
    LANGUAGES (state) {
        return state.languages
    },
}