import Conclusion from "../services/api/Conclusion";

export const actions = {
    LOAD_AND_SAVE_ENQUIRE_VALIDATE_HASH({state, commit}, requestConfig){
        return new Promise((resolve, reject) => {
                Conclusion.validateHash(requestConfig)
                      .then(response => {
                          resolve(response);
                      })
                      .catch(error => {
                          console.error(error);
                          reject(error);
                      });
        });
    },
    LOAD_CONCLUSION_PDF({state, commit}, requestConfig){
        return new Promise((resolve, reject) => {
                Conclusion.downloadConclusion(requestConfig)
                      .then(response => {
                          resolve(response.data);
                      })
                      .catch(error => {
                          console.error(error);
                          reject(error);
                      });
        });
    },
};