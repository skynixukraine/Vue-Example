import DoctorsApi from "../services/api/Doctors"

export const state = () => ({
    doctorsForHomePage : [],
    doctor : null
})

export const getters = {}

export const mutations = {
    SET_DOCTORS_DOCTORS_FOR_HOME_PAGE(state, newValue){
        state.doctorsForHomePage = newValue
    },
    SET_DOCTOR(state, newValue){
        state.doctor = newValue
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
    LOAD_AND_SAVE_DOCTOR({state, commit}, requestConfig){
        return new Promise((resolve, reject) => {
            DoctorsApi.loadDoctors(requestConfig)
                      .then(response => {
                          commit("SET_DOCTOR", response.data[0]);
                          resolve(response)
                      })
                      .catch(error => {
                          console.error(error)
                          reject(error)
                      })
        })
    },
}