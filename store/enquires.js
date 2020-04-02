import EnquiresApi from "../services/api/Enquires";

export const state = () => ({
    enquiresFiltered             : [],

    enquireAccess             : null,

    MAX_ENQUIRE_ANSWERS_PER_PAGE : 50,

});

export const mutations = {
    SET_DOCTOR_ENQUIRE(state, newValue){
        state.doctorEnquire = newValue;
    },
    SET_ENQUIRE_ACCESS(state, newValue){
        state.enquireAccess = newValue;
    }
};

export const actions = {
    LOAD_AND_SAVE_ENQUIRE({state, commit}, requestConfig){

        return new Promise((resolve, reject) => {
                EnquiresApi.loadEnquire(requestConfig)
                    .then(response => {
                    commit("SET_DOCTOR_ENQUIRE", response.data.data);
                    resolve(response);
                })
                .catch(error => {
                        console.error(error);
                    reject(error);
                })
        })
    },
};