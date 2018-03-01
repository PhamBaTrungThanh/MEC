const state = {
    data: [],
}
const mutations = {
    STORE_ALL_RECEIVES (state, data) {
        state.data = data
    },
}
const getters = {
    relatedReceivesInInvoice: state => invoiceId => {
        if (invoiceId) {
            return state.data.reduce((receives, receive) => {
                if (receive.invoice_id === invoiceId) {
                    receives.push(receive)
                }
                return receives
            }, [])
        }
        return []
    },
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
