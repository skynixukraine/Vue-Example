// services
import SpecializationsApi from '../services/api/Specializations'

// options (init values)
const DEFAULT_SPECIALIZATIONS = []


export const state = () => ({
    specializations: DEFAULT_SPECIALIZATIONS,
})


export const mutations = {
    SET_SPECIALIZATIONS (state, specializations) {
        state.specializations = specializations
    },
}


export const actions = {
    async LOAD_SPECIALIZATIONS ({ commit }) {
        return new Promise ((resolve, reject) => {
            SpecializationsApi.loadSpecializations()
                .then(response => {
                    commit('SET_SPECIALIZATIONS', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}


export const getters = {
    SPECIALIZATIONS (state) {
        return state.specializations
    },
}