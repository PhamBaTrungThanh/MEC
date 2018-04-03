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
    UPDATE_MUTIPLE_TRACKERS (state, trackers) {
        for (let i = trackers.length - 1; i >= 0; i--) {
            const index = state.data.findIndex(t => t.id === trackers[i].id)
            state.data.splice(index, 1, trackers[i])
        }
    },
}
const getters = {
    relatedTrackersInInvoice: (state, getters) => invoiceId => {
        if (invoiceId) {
            return getters.allTrackers.reduce((trackers, tracker) => {
                if (tracker.invoice_id === invoiceId) {
                    trackers.push(tracker)
                }
                return trackers
            }, [])
        }
        return []
    },
    relatedTrackersInMaterial: state => materialId => {
        if (materialId) {
            return state.data.reduce((trackers, tracker) => {
                if (tracker.material_id === materialId) {
                    trackers.push(tracker)
                }
                return trackers
            }, [])
        }
        return []
    },
    trackersForCurrentInvoice: (state, getters, rootState) => {
        if (rootState.route.params.invoice_id) {
            const invoiceId = parseInt(rootState.route.params.invoice_id)
            return getters.allTrackers.reduce((trackers, tracker) => {
                if (tracker.invoice_id === invoiceId) {
                    trackers.push(tracker)
                }
                return trackers
            }, [])
        }
        return []
    },
    allTrackers (state, getters) {
        return state.data.map(tracker => {
            return Object.assign({}, tracker, {material: getters.materialById(tracker.material_id)})
        })
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Trackers -> store ${data.trackers.length} trackers.`)
        commit(`STORE_ALL_TRACKERS`, data.trackers)
    },
    updateRelatedResources ({commit}, {action, dataPool}) {
        if (action === `storeInvoice`) {
            if (dataPool.trackers) {
                commit(`STORE_TRACKERS`, dataPool.trackers)
            }
        }
    },
    deleteInvoice ({commit}, {invoiceId}) {
        commit(`DELETE_TRACKERS_FROM_INVOICE`, invoiceId)
    },
    updateAffected ({commit}, affected) {
        if (affected.hasOwnProperty(`trackers`)) {
            commit(`UPDATE_MUTIPLE_TRACKERS`, affected.trackers)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
