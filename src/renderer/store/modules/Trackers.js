const state = {
    trackers: [],
}
const mutations = {
    STORE_ALL_TRACKERS (state, data) {
        state.trackers = data
    },
}
const getters = {
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Trackers -> store ${data.trackers.length} trackers.`)
        commit(`STORE_ALL_TRACKERS`, data.trackers)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
