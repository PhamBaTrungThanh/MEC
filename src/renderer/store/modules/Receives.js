const state = {
    data: [],
    detailed: [],
}
const mutations = {
    STORE_ALL_RECEIVES (state, data) {
        state.data = data
    },
    UPDATE_RECEIVES_FROM_INVOICE (state, {invoiceId, receives}) {
        state.detailed.push(invoiceId)
        for (let i = receives.length - 1; i >= 0; i--) {
            const index = state.data.findIndex(receive => receive.id === receives[i].id)
            if (index === -1) {
                state.data.push(receives[i])
            } else {
                state.data.splice(index, 1, receives[i])
            }
        }
    },
    DELETE_RECEIVES_FROM_INVOICE (state, invoiceId) {
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
}
const getters = {
    relatedReceivesInInvoice: state => invoiceId => {
        if (invoiceId) {
            if (state.detailed.indexOf(invoiceId) !== -1) {
                return state.data.reduce((receives, receive) => {
                    if (receive.invoice_id === invoiceId) {
                        receives.push(receive)
                    }
                    return receives
                }, [])
            } else {
                return [`loading`]
            }
        }
        return []
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Receives -> store ${data.receives.length} receives.`)
        commit(`STORE_ALL_RECEIVES`, data.receives)
    },
    async getReceiveForInvoice ({commit, rootState}, invoiceId = false) {
        if (!invoiceId) {
            invoiceId = (rootState.route.params.invoice_id) ? parseInt(rootState.route.params.invoice_id) : false
        }
        console.log(`Store::Receives('getReceiveForInvoice') -> get detailed receives for invoice id ${invoiceId}`)
        try {
            const response = await this._vm.axios.get(`invoice/${invoiceId}/receives`)
            if (response.data.data) {
                let receives = []
                for (let i = response.data.data.length - 1; i >= 0; i--) {
                    let receive = response.data.data[i]
                    receive.units = []
                    for (let j = response.data.pivot.length - 1; j >= 0; j--) {
                        if (response.data.pivot[j].receive_id === receive.id) {
                            receive.units.push(response.data.pivot[j])
                        }
                    }
                    receives.push(receive)
                }
                commit(`UPDATE_RECEIVES_FROM_INVOICE`, {invoiceId: invoiceId, receives: receives})
            }
        } catch (e) {
            console.log(`Store::Receives('getReceiveForInvoice') => `, e)
        }
    },
    deleteInvoice ({commit}, {invoiceId}) {
        commit(`DELETE_RECEIVES_FROM_INVOICE`, invoiceId)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
