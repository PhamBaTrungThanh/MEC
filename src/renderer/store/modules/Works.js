const state = {
    data: [],
}
const mutations = {
    STORE_ALL_WORKS (state, data) {
        state.data = data
    },
}
const getters = {
    currentWork (state, getters, rootState) {
        if (rootState.route.params.work_id) {
            const workId = parseInt(rootState.route.params.work_id)
            const _work = state.data.find(w => w.id === workId)
            return {
                data: _work,
                invoices: getters.relatedInvoicesInWork(workId),
            }
        }
        return false
    },
    getAllWorks (state) {
        return state.data
    },
    work (state, getters, rootState) {
        if (rootState.route.params.work_id) {
            const workId = parseInt(rootState.route.params.work_id)
            return state.data.find(work => work.id === workId)
        }
        return false
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
