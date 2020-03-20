import DoctorsApi from "../services/api/Doctors";

export const state = () => ({
    doctorsFiltered           : [],
    doctorsFilteredTotalCount : 0,

    doctorsForHomePage   : [],
    doctorForProfilePage : null,

    MAX_DOCTORS_PER_PAGE : 16,


});

export const mutations = {
    SET_DOCTORS_DOCTORS_FOR_HOME_PAGE(state, newValue){
        state.doctorsForHomePage = newValue;
    },
    SET_DOCTOR_FOR_PROFILE_PAGE(state, newValue){
        state.doctorForProfilePage = newValue;
    },
    SET_FILTERED_DOCTORS(state, newValue){
        state.doctorsFiltered = newValue;
    },
    SET_FILTERED_DOCTORS_TOTAL_COUNT(state, newValue){
        state.doctorsFilteredTotalCount = newValue;
    },
    SET_DOCTOR_ENQUIRES(state, newValue){
        state.doctorEnquires = newValue;
    }
};

export const actions = {
    LOAD_AND_SAVE_DOCTORS_FOR_HOME_PAGE({state, commit}, requestConfig){

        return new Promise((resolve, reject) => {
            DoctorsApi.loadDoctors(requestConfig)
                      .then(response => {
                          commit("SET_DOCTORS_DOCTORS_FOR_HOME_PAGE", response.data.data);
                          resolve(response);
                      })
                      .catch(error => {
                          console.error(error);
                          reject(error);
                      })
        })
    },
    LOAD_AND_SAVE_FILTERED_DOCTORS({state, commit}, requestConfig){
        requestConfig.per_page = requestConfig.per_page || state.MAX_DOCTORS_PER_PAGE;

        return new Promise((resolve, reject) => {
            DoctorsApi.loadDoctors(requestConfig)
                      .then(response => {
                          commit("SET_FILTERED_DOCTORS", response.data.data);
                          commit("SET_FILTERED_DOCTORS_TOTAL_COUNT", response.data.meta.total);
                          resolve(response);
                      })
                      .catch(error => {
                          console.error(error);
                          reject(error);
                      })
        })
    },
    LOAD_AND_SAVE_DOCTOR_FOR_PROFILE_PAGE({state, commit}, requestConfig){

        return new Promise((resolve, reject) => {
            DoctorsApi.loadDoctors(requestConfig)
                      .then(response => {
                          commit("SET_DOCTOR_FOR_PROFILE_PAGE", response.data.data[0]);
                          resolve(response);
                      })
                      .catch(error => {
                          console.error(error);
                          reject(error);
                      })
        })
    },
    LOAD_AND_SAVE_DOCTOR_ENQUIRES({state, commit}, requestConfig){

        return new Promise((resolve, reject) => {
                DoctorsApi.loadDoctorEnquires(requestConfig)
                    .then(response => {

                    commit("SET_DOCTOR_ENQUIRES", response.data);
                    resolve(response);
                })
                .catch(error => {
                        console.error(error);
                    reject(error);
                })
        })
    },
};