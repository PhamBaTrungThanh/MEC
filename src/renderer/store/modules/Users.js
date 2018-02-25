const state = {
    user: {},
    users: {},
}
const mutations = {
    STORE_CURRENT_USER (state, user) {
        state.user = user
    },
}
const getters = {
    user (state) {
        return state.user
    },
}
const actions = {
    async fetchData ({commit}) {
        try {
            const worker = await this._vm.axios.get(`user`)
            if (worker.status === 200) {
                commit(`STORE_CURRENT_USER`, worker.data.data)
            }
        } catch (e) {
            console.log(`Store::Users`, e)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
