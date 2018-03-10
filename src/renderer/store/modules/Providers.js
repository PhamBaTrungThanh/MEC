const state = {
    data: [],
}
const mutations = {
    STORE_ALL_PROVIDERS (state, data) {
        state.data = data
    },
    STORE_PROVIDERS (state, data) {
        state.data.push(...data)
    },
    STORE_PROVIDER (state, data) {
        state.data.push(data)
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
    createOrUpdate ({commit}, {action, dataPool}) {
        if (action === `storeInvoice`) {
            if (dataPool.provider) {
                commit(`STORE_PROVIDER`, dataPool.provider)
            }
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
