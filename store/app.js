// options (init values)
const DEFAULT_IS_NAVIGATION_ACTIVE = false


export const state = () => ({
    isNavigationActive: DEFAULT_IS_NAVIGATION_ACTIVE,
})


export const mutations = {
    SET_IS_NAVIGATION_ACTIVE (state, isActive) {
        state.isNavigationActive = isActive
    },
}


export const getters = {
    IS_NAVIGATION_ACTIVE (state) {
        return state.isNavigationActive
    },
}