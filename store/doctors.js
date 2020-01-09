// options (init values)
const DEFAULT_DOCTORS = []


export const state = () => ({
    doctors: DEFAULT_DOCTORS,
})


export const getters = {
    DOCTORS (state) {
        return state.doctors
    },
}