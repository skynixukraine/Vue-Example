export const state = () => ({
    isNavigationActive : false,
});

export const mutations = {
    SET_IS_NAVIGATION_ACTIVE(state, isActive){
        state.isNavigationActive = isActive
    }
};