const state = {
    works: [],
}
const mutations = {
    STORE_ALL_WORKS (state, data) {
        state.works = data
    },
}
const getters = {
    work (state) {
        if (state.route) {
            const workId = (typeof state.route.params.work_id !== `undefined`) ? parseInt(state.route.params.work_id) : false
            if (workId) {
                return state.works.find(w => w.id === state.route.params.work_id)
            } else {
                return false
            }
        }
    },
}
const actions = {
    async fetchResources ({commit, dispatch}) {
        try {
            const worker = await this._vm.axios.get(`work`)
            if (worker.status === 200) {
                console.log(`Store::Works -> store ${worker.data.data.length} works.`)
                commit(`STORE_ALL_WORKS`, worker.data.data)
            }
            dispatch(`appResourcesFetched`, `works`)
        } catch (e) {
            console.log(`Store::Works =>`, e)
        }
    },
    storeResources ({commit}, data) {
        console.log(`Store::Works -> store ${data.works.length} works.`)
        commit(`STORE_ALL_WORKS`, data.works)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
