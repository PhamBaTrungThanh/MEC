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
    CREATE_OR_UPDATE_BOQS (state, boqs) {
        for (let i = boqs.length - 1; i >= 0; i--) {
            const index = state.data.findIndex(t => t.id === boqs[i].id)
            if (index === -1) {
                state.data.push(boqs[i])
            } else {
                state.data.splice(index, 1, boqs[i])
            }
        }
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
    updateRelatedResources ({commit}, {action, dataPool}) {
        if (action === `storeInvoice`) {
            if (dataPool.boqs) {
                commit(`CREATE_OR_UPDATE_BOQS`, dataPool.boqs)
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
