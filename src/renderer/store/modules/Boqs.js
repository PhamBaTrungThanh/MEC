const state = {
    data: [],
}
const mutations = {
    STORE_ALL_BOQS (state, data) {
        state.data = data
    },
    STORE_BOQS (state, data) {
        state.data.push(...data)
    },
}
const getters = {
    relatedBoqsInMaterial: state => id => state.data.reduce((boqs, boq) => {
        if (boq.material_id === id) {
            boqs.push(boq)
        }
        return boqs
    }, []),
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Boqs -> store ${data.boqs.length} boqs.`)
        commit(`STORE_ALL_BOQS`, data.boqs)
    },
    createOrUpdate ({commit}, {action, dataPool}) {
        if (action === `storeInvoice`) {
            if (dataPool.boqs) {
                commit(`STORE_BOQS`, dataPool.boqs)
            }
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
