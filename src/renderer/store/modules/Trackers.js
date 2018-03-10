const state = {
    data: [],
}
const mutations = {
    STORE_ALL_TRACKERS (state, data) {
        state.data = data
    },
    STORE_TRACKERS (state, data) {
        state.data.push(...data)
    },
    DELETE_TRACKERS_FROM_INVOICE (state, invoiceId) {
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
    relatedTrackersInInvoice: state => invoiceId => {
        if (invoiceId) {
            return state.data.reduce((trackers, tracker) => {
                if (tracker.invoice_id === invoiceId) {
                    trackers.push(tracker)
                }
                return trackers
            }, [])
        }
        return []
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Trackers -> store ${data.trackers.length} trackers.`)
        commit(`STORE_ALL_TRACKERS`, data.trackers)
    },
    createOrUpdate ({commit}, {action, dataPool}) {
        if (action === `storeInvoice`) {
            if (dataPool.trackers) {
                commit(`STORE_TRACKERS`, dataPool.trackers)
            }
        }
    },
    deleteInvoice ({commit}, {invoiceId}) {
        commit(`DELETE_TRACKERS_FROM_INVOICE`, invoiceId)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
