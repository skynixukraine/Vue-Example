import DoctorsApi from "../services/api/Doctors"

export const state = () => ({
    doctors            : [],
    doctorsForHomePage : [],
})

export const getters = {}

export const mutations = {
    SET_DOCTORS_DOCTORS_FOR_HOME_PAGE(state, newValue){
        state.doctorsForHomePage = newValue
    },
    SET_DOCTORS(state, newValue){
        state.doctors = newValue
    },
}

export const actions = {
    LOAD_AND_SAVE_DOCTORS_FOR_HOME_PAGE({state, commit}, requestConfig){
        return new Promise((resolve, reject) => {
            DoctorsApi.loadDoctors(requestConfig)
                      .then(response => {
                          commit("SET_DOCTORS_DOCTORS_FOR_HOME_PAGE", response.data);
                          resolve(response)
                      })
                      .catch(error => {
                          reject(error)
                      })
        })
    },
    LOAD_AND_SAVE_ALL_DOCTORS({state, commit}, requestConfig){
        return new Promise((resolve, reject) => {
            DoctorsApi.loadDoctors(requestConfig)
                      .then(response => {
                          commit("SET_DOCTORS", response.data);
                          resolve(response)
                      })
                      .catch(error => {
                          reject(error)
                      })
        })
    },
}