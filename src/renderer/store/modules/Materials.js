const state = {
    data: [],
}
const mutations = {
    STORE_ALL_MATERIALS (state, data) {
        state.data = data
    },
}
const getters = {
    materialById: state => id => {
        return state.data.find(m => m.id === id)
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Materials -> store ${data.materials.length} materials.`)
        commit(`STORE_ALL_MATERIALS`, data.materials)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
