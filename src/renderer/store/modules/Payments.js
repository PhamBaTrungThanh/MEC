const state = {
    payments: [],
}
const mutations = {
    STORE_ALL_PAYMENTS (state, data) {
        state.payments = data
    },
}
const getters = {
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Payments -> store ${data.payments.length} payments.`)
        commit(`STORE_ALL_PAYMENTS`, data.payments)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
