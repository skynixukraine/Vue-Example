export const state = () => ({
    isNavigationActive : false,
    currentActiveModal : "",
    modalTitle         : "",
    modalMessageHTML   : "",
});

export const mutations = {
    SET_IS_NAVIGATION_ACTIVE(state, isActive){
        state.isNavigationActive = isActive
    },
    SET_CURRENT_ACTIVE_MODAL(state, name){
        state.currentActiveModal = name;
    },
    SET_MODAL_TITLE(state, title){
        state.modalTitle = title;
    },
    SET_MODAL_MESSAGE_HTML(state, message){
        state.modalMessageHTML = message;
    },
};

export const getters = {
    IS_NAVIGATION_ACTIVE(state){
        return state.isNavigationActive;
    },
    CURRENT_ACTIVE_MODAL(state){
        return state.currentActiveModal;
    },
};