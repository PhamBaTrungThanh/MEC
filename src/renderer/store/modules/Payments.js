const state = {
    data: [],
}
const mutations = {
    STORE_ALL_PAYMENTS (state, data) {
        state.data = data
    },
}
const getters = {
    relatedPaymentsInInvoice: state => invoiceId => {
        if (invoiceId) {
            return state.data.reduce((payments, payment) => {
                if (payment.invoice_id === invoiceId) {
                    payments.push(payment)
                }
                return payments
            }, [])
        }
        return []
    },
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
