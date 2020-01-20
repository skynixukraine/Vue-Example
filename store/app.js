// options (init values)
const DEFAULT_IS_NAVIGATION_ACTIVE = false
const DEFAULT_CURRENT_ACTIVE_MODAL = ''


export const state = () => ({
    isNavigationActive: DEFAULT_IS_NAVIGATION_ACTIVE,
    currentActiveModal: DEFAULT_CURRENT_ACTIVE_MODAL,
})


export const mutations = {
    SET_IS_NAVIGATION_ACTIVE (state, isActive) {
        state.isNavigationActive = isActive
    },

    SET_CURRENT_ACTIVE_MODAL (state, name) {
        state.currentActiveModal = name
    }
}


export const getters = {
    IS_NAVIGATION_ACTIVE (state) {
        return state.isNavigationActive
    },

    CURRENT_ACTIVE_MODAL (state) {
        return state.currentActiveModal
    }
}