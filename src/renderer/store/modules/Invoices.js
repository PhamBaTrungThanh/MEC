const state = {
    data: [],
}
const mutations = {
    STORE_ALL_INVOICES (state, data) {
        state.data = data
    },
    STORE_SINGLE_INVOICE (state, data) {
        state.data.push(data)
    },
    DELETE_INVOICE (state, invoiceId) {
        const index = state.data.findIndex(invoice => invoice.id === invoiceId)
        state.data.splice(index, 1)
    },
    UPDATE_INVOICE (state, data) {
        const index = state.data.findIndex(invoice => invoice.id === data.id)
        state.data.splice(index, 1, data)
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
    currentInvoice (state, getters, rootState, rootGetters) {
        if (rootState.route.params.invoice_id) {
            const invoiceId = parseInt(rootState.route.params.invoice_id)
            const _data = state.data.find(i => i.id === invoiceId)
            if (_data) {
                return {
                    data: _data,
                    payments: getters.relatedPaymentsInInvoice(invoiceId),
                    receives: getters.relatedReceivesInInvoice(invoiceId),
                    trackers: getters.relatedTrackersInInvoice(invoiceId),
                    provider: getters.providerById(_data.provider_id),
                }
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
    invoiceById: state => id => {
        return state.data.find(invoice => invoice.id === id)
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Invoices -> store ${data.invoices.length} invoices.`)
        commit(`STORE_ALL_INVOICES`, data.invoices)
    },
    async storeInvoice ({commit, dispatch}, data) {
        console.log(`Store::Invoices('storeInvoice') -> Create new Invoice Resource with `, data)
        try {
            const response = await this._vm.axios.post(`invoice`, {
                'work_id': data.work_id,
                'provider_id': data.provider_id,
                'new_provider': data.new_provider,
                'new_invoice': data.new_invoice,
                'list': data.list,
            })
            if (response.status === 201) {
                commit(`STORE_SINGLE_INVOICE`, response.data.data)
                dispatch(`createOrUpdate`, {
                    action: `storeInvoice`,
                    dataPool: response.data,
                })
                return true
            }
        } catch (e) {
            console.log(`Store::Invoices('storeInvoice') =>`, e)
        }
    },
    async updateInvoice ({commit}, {invoiceId, resource = false, data = false}) {
        if (resource) {
            commit(`UPDATE_INVOICE`, resource)
        }
    },
    async deleteInvoice ({commit}, {invoiceId}) {
        try {
            const response = await this._vm.axios.delete(`invoice/${invoiceId}`)
            if (response.status === 200) {
                commit(`DELETE_INVOICE`, invoiceId)
            }
        } catch (e) {
            console.log(e)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
