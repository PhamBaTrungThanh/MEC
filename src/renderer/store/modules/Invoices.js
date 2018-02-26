const state = {
    invoices: [],
}
const mutations = {
    STORE_ALL_INVOICES (state, data) {
        state.invoices = data
    },
}
const getters = {
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Invoices -> store ${data.invoices.length} invoices.`)
        commit(`STORE_ALL_INVOICES`, data.invoices)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
