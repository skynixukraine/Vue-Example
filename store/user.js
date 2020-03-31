import UserApi from "../services/api/User";

// options (init values)
const DEFAULT_USER = null;

export const state = () => ({
    user : DEFAULT_USER,
    userPaymentData: null,
    userEnquireId : null,
    isVerifyPhone : null,
    enquire : null,
});

export const mutations = {
    SET_USER(state, user){
        state.user = user;
    },
    SET_USER_PAYMENT_DATA(state, newData){
        state.userPaymentData = newData;
    },
    SET_USER_ENQUIRE_ID(state, newData){
        state.userEnquireId = newData;
    },
    SET_USER_IS_VERIFY_PHONE(state, newData){
        state.isVerifyPhone = newData;
    },
    SET_USER_ENQUIRE(state, newData){
        state.enquire = newData;
    },
};

export const actions = {
    async REGISTER_USER({commit}, requestData){
        return new Promise((resolve, reject) => {
            UserApi.registerUser(requestData)
                   .then(response => {
                       resolve(response);
                   })
                   .catch(error => {
                       reject(error);
                   });
        })
    },
    async LOGIN_USER({commit}, requestData){
        return new Promise((resolve, reject) => {
            UserApi.loginUser(requestData)
                   .then(response => {
                       resolve(response)
                   })
                   .catch(error => {
                       reject(error)
                   });
        })
    },
    async LOGOUT_USER({commit}, token){
        return new Promise((resolve, reject) => {
            UserApi.logoutUser(token)
                   .then(response => {
                       commit("SET_USER", null);
                       resolve(response);
                   })
                   .catch(error => {
                       reject(error);
                   });
        })
    },
    async LOAD_USER({commit}, {id, token}){
        return new Promise((resolve, reject) => {
            UserApi.loadUser({id, token})
                   .then(response => {
                       commit("SET_USER", response.data);
                       resolve(response);
                   })
                   .catch(error => {
                       reject(error);
                   });
        });
    },
    async UPDATE_USER({commit}, {id, token, params}){
        return new Promise((resolve, reject) => {
            UserApi.updateUser({id, token, params})
                   .then(response => {
                       commit("SET_USER", response.data);
                       resolve(response);
                   })
                   .catch(error => {
                       console.error(error);
                       reject(error);
                   });
        })
    },
    async VERIFY_USER_EMAIL({commit}, requestData){
        return new Promise((resolve, reject) => {
            UserApi.verifyUserEmail(requestData)
                   .then(response => {
                       resolve(response);
                   })
                   .catch(error => {
                       reject(error);
                   });
        })
    },
    async SEND_EMAIL_VERIFICATION_LINK({commit}, requestData){
        return new Promise((resolve, reject) => {
            UserApi.sendEmailVerifyLink(requestData)
                   .then(response => {
                       resolve(response);
                   })
                   .catch(error => {
                       reject(error);
                   });
        })
    },
    async LOAD_AND_SAVE_PAYMENT_DATA({commit}, requestData){
        return new Promise((resolve, reject) => {
            UserApi.loadPaymentData(requestData)
                   .then(response => {
                       commit("SET_USER_PAYMENT_DATA", response.data);
                       resolve(response);
                   })
                   .catch(error => {
                       reject(error);
                   });
        });
    }
};

export const getters = {
    USER(state){
        return state.user;
    },
};