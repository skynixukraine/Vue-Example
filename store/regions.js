// services
import RegionsApi from '../services/api/Regions'

// options (init values)
const DEFAULT_REGIONS = []


export const state = () => ({
    regions: DEFAULT_REGIONS,
})


export const mutations = {
    SET_REGIONS (state, regions) {
        state.regions = regions
    },
}


export const actions = {
    async LOAD_REGIONS ({ commit }) {
        return new Promise ((resolve, reject) => {
            RegionsApi.loadRegions()
                .then(response => {
                    commit('SET_REGIONS', response.data)
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },
}


export const getters = {
    REGIONS (state) {
        return state.regions
    },
}