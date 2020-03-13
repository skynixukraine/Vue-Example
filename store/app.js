export const state = () => ({
    isNavigationActive : false,
    isPersonalOfficePage: false,
});

export const mutations = {
    SET_IS_NAVIGATION_ACTIVE(state, isActive){
        state.isNavigationActive = isActive;
    },
    SET_IS_PERSONAL_OFFICE_PAGE(state, bool){
        state.isPersonalOfficePage = bool;
    }
};