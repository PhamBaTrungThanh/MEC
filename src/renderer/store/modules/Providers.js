const state = {
    providers: [],
}
const mutations = {
    STORE_ALL_PROVIDERS (state, data) {
        state.providers = data
    },
}
const getters = {
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
