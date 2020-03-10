export const state = () => ({
    currentActiveModal : "",
    modalTitle         : "",
    modalMessageHTML   : "",
    newEmail           : "",
});

export const mutations = {
    SET_CURRENT_ACTIVE_MODAL(state, name){
        state.currentActiveModal = name;
    },
    SET_MODAL_TITLE(state, title){
        state.modalTitle = title;
    },
    SET_MODAL_MESSAGE_HTML(state, message){
        state.modalMessageHTML = message;
    },
    SET_NEW_EMAIL(state, email){
        state.newEmail = email;
    },
};