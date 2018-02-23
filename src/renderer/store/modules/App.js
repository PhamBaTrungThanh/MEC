const state = {
    isReady: false,
}
const mutations = {
    IS_READY (state) {
        state.isReady = true
    },

}
const actions = {
    appReady ({ commit }) {
        // do something async
        commit(`IS_READY`)
    },
}
export default {
    state,
    mutations,
    actions,
}
