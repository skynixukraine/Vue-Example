import DiagnosticChatApi from "../services/api/DiagnosticChat";

export const state = () => ({
    targetDoctorForDiagnosticChat: null,
    doctorIdForStartDiagnosticChat: null
});

export const mutations = {
    SET_DOCTOR_FOR_DIAGNOSTIC_CHAT(state, newValue){
        state.targetDoctorForDiagnosticChat = newValue;
    },
    SET_DOCTOR_ID_FOR_START_DIAGNOSTIC_CHAT(state, newValue){
        state.doctorIdForStartDiagnosticChat = newValue;
    }
};

export const actions = {
    LOAD_AND_SAVE_DOCTOR_FOR_DIAGNOSTIC_CHAT({state, commit}, requestConfig){

        return new Promise((resolve, reject) => {
            DiagnosticChatApi.loadTargetDoctorForDiagnosticChat(requestConfig)
                      .then(response => {
                          commit("SET_DOCTOR_FOR_DIAGNOSTIC_CHAT", response.data.data[0]);
                          resolve(response);
                      })
                      .catch(error => {
                          console.error(error);
                          reject(error);
                      });
        });
    },
};