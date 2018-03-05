const state = {
    data: [],
}
const mutations = {
    STORE_ALL_INVOICES (state, data) {
        state.data = data
    },
}
const getters = {
    relatedInvoicesInWork: state => workId => {
        if (workId) {
            return state.data.reduce((invoices, invoice) => {
                if (invoice.work_id === workId) {
                    invoices.push(invoice)
                }
                return invoices
            }, [])
        }
        return []
    },
    currentInvoice (state, getters, rootState) {
        if (rootState.route.params.invoice_id) {
            const invoiceId = parseInt(rootState.route.params.invoice_id)
            const _data = state.data.find(i => i.id === invoiceId)
            return {
                data: _data,
                payments: getters.relatedPaymentsInInvoice(invoiceId),
                receives: getters.relatedReceivesInInvoice(invoiceId),
                trackers: getters.relatedTrackersInInvoice(invoiceId),
            }
        }
        return false
    },
    invoice (state, getters, rootState) {
        if (rootState.route.params.invoice_id) {
            const invoiceId = parseInt(rootState.route.params.invoice_id)
            return state.data.find(invoice => invoice.id === invoiceId)
        }
        return false
    },
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
