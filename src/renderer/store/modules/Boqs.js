const state = {
    boqs: [],
}
const mutations = {
    STORE_ALL_BOQS (state, data) {
        state.boqs = data
    },
}
const getters = {
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Boqs -> store ${data.boqs.length} boqs.`)
        commit(`STORE_ALL_BOQS`, data.boqs)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
