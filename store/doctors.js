import DoctorsApi from "../services/api/Doctors"

export const state = () => ({
    doctors              : [],
    doctorsForHomePage   : [],
    doctorForProfilePage : null,
})

export const getters = {}

export const mutations = {
    SET_DOCTORS_DOCTORS_FOR_HOME_PAGE(state, newValue){
        state.doctorsForHomePage = newValue
    },
    SET_DOCTOR_FOR_PROFILE_PAGE(state, newValue){
        state.doctorForProfilePage = newValue
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
    LOAD_AND_SAVE_DOCTOR_FOR_PROFILE_PAGE({state, commit}, requestConfig){
        return new Promise((resolve, reject) => {
            DoctorsApi.loadDoctors(requestConfig)
                      .then(response => {
                          commit("SET_DOCTOR_FOR_PROFILE_PAGE", response.data[0]);
                          resolve(response)
                      })
                      .catch(error => {
                          console.error(error)
                          reject(error)
                      })
        })
    },
}