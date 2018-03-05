const state = {
    data: [],
}
const mutations = {
    STORE_ALL_TRACKERS (state, data) {
        state.data = data
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
}
export default {
    state,
    mutations,
    actions,
    getters,
}
