const state = {
    data: [],
}
const mutations = {
    STORE_ALL_PAYMENTS (state, data) {
        state.data = data.map(payment => {
            return Object.assign({}, payment, {isFull: false})
        })
    },
    STORE_PAYMENT (state, payment) {
        const index = state.data.findIndex(p => p.id === payment.id)
        if (index === -1) {
            state.data.push(payment)
        } else {
            state.data.splice(index, 1, payment)
        }
    },
    UPDATE_PAYMENT (state, payment) {
        try {
            const index = state.data.findIndex(p => p.id === payment.id)
            if (index === -1) {
                throw new Error(`Payment ${payment.id} not found on database`)
            } else {
                state.data.splice(index, 1, payment)
            }
        } catch (e) {
            console.error(`Store::Payments('UPDATE_PAYMENT') commit error`, e)
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
    routePayment (state, getters, rootState) {
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
            console.error(`Store::Payments('getPayment') => `, e)
        }
    },
    async storePayment ({commit, dispatch}, data) {
        try {
            const response = await this._vm.axios.post(`payment`, data)
            if (response.status === 201) {
                commit(`STORE_PAYMENT`, response.data.data)
                dispatch(`updateInvoice`, {
                    invoiceId: response.data.affected.invoice.id,
                    resource: response.data.affected.invoice,
                })
            }
        } catch (e) {
            console.error(e)
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
            console.error(e)
        }
    },
    async editPayment ({commit, dispatch}, payment) {
        try {
            const response = await this._vm.axios.put(`payment/${payment.id}`, {
                name: payment.name,
                method: payment.method,
                paid_on: payment.paid_on,
                content: payment.content,
                amount: payment.amount,
                edit_reason: payment.reason,
            })
            if (response.status === 200) {
                commit(`UPDATE_PAYMENT`, response.data.data)
                if (response.affected) {
                    dispatch(`updateInvoice`, {
                        invoiceId: response.affected.invoice.id,
                        resource: response.affected.invoice,
                    })
                }
            }
        } catch (e) {
            console.error(`Store::Payments('editPayment') -> error`, e)
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
