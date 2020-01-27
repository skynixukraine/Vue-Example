// services
import DoctorTitlesApi from '../services/api/DoctorTitles'

// options (init values)
const DEFAULT_DOCTOR_TITLES = []


export const state = () => ({
    doctorTitles: DEFAULT_DOCTOR_TITLES,
})


export const mutations = {
    SET_DOCTOR_TITLES (state, doctorTitles) {
        state.doctorTitles = doctorTitles
    },
}


export const actions = {
    async LOAD_DOCTOR_TITLES ({ commit }) {
        return new Promise ((resolve, reject) => {
            DoctorTitlesApi.loadDoctorTitles()
                .then(response => {
                    commit('SET_DOCTOR_TITLES', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}


export const getters = {
    DOCTOR_TITLES (state) {
        return state.doctorTitles
    },
}