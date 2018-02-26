const state = {
    receives: [],
}
const mutations = {
    STORE_ALL_RECEIVES (state, data) {
        state.receives = data
    },
}
const getters = {
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Receives -> store ${data.receives.length} receives.`)
        commit(`STORE_ALL_RECEIVES`, data.receives)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
