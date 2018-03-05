const state = {
    data: [],
}
const mutations = {
    STORE_ALL_PROVIDERS (state, data) {
        state.data = data
    },
}
const getters = {
    providerById: state => providerId => {
        return state.data.find(p => p.id === providerId)
    },
    allProviders (state) {
        return state.data
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Providers -> store ${data.providers.length} providers.`)
        commit(`STORE_ALL_PROVIDERS`, data.providers)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
