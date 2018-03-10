const state = {
    data: [],
}
const mutations = {
    STORE_ALL_PAYMENTS (state, data) {
        state.data = data
    },
    STORE_PAYMENT (state, payment) {
        const index = state.data.findIndex(p => p.id === payment.id)
        if (index === -1) {
            state.data.push(payment)
        } else {
            state.data.splice(index, 1, payment)
        }
    },
    DELETE_PAYMENTS_FROM_INVOICE (state, invoiceId) {
        let indexes = []
        for (let i = state.data.length - 1; i >= 0; i--) {
            if (state.data[i].invoice_id === invoiceId) {
                indexes.push(i)
            }
        }
        for (let i = indexes.length - 1; i >= 0; i--) {
            state.data.splice(i, 1)
        }
    },
    DELETE_PAYMENT (state, id) {
        const index = state.data.findIndex(p => p.id === id)
        state.data.splice(index, 1)
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
    payment (state, getters, rootState) {
        if (rootState.route.params.payment_id) {
            const paymentId = parseInt(rootState.route.params.payment_id)
            return state.data.find(payment => payment.id === paymentId)
        }
        return false
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Payments -> store ${data.payments.length} payments.`)
        commit(`STORE_ALL_PAYMENTS`, data.payments)
    },
    async getPayment ({commit}, id) {
        console.log(`Store::Payments('getPayment') -> get payment with id "${id}" from data.`)
        try {
            const response = await this._vm.axios.get(`payment/${id}`)
            const payment = Object.assign({}, response.data.data, response.data.extra, {isFull: true})
            commit(`STORE_PAYMENT`, payment)
        } catch (e) {
            console.log(`Store::Payments('getPayment') => `, e)
        }
    },
    async storePayment ({commit, dispatch}, data) {
        try {
            const response = await this._vm.axios.post(`payment`, data)
            if (response.status === 200) {
                commit(`STORE_PAYMENT`, response.data.created)
                dispatch(`updateInvoice`, {
                    invoiceId: response.data.affected.invoice.id,
                    resource: response.data.affected.invoice,
                })
            }
        } catch (e) {
            console.log(e)
        }
    },
    async deletePayment ({commit, dispatch}, {paymentId}) {
        try {
            const response = await this._vm.axios.delete(`payment/${paymentId}`)
            if (response.status === 200) {
                commit(`DELETE_PAYMENT`, paymentId)
                dispatch(`updateInvoice`, {
                    invoiceId: response.data.affected.invoice.id,
                    resource: response.data.affected.invoice,
                })
                return true
            }
        } catch (e) {
            console.log(e)
        }
    },
    deleteInvoice ({commit}, {invoiceId}) {
        commit(`DELETE_PAYMENTS_FROM_INVOICE`, invoiceId)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
