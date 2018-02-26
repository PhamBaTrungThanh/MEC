const state = {
    materials: [],
}
const mutations = {
    STORE_ALL_MATERIALS (state, data) {
        state.materials = data
    },
}
const getters = {
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
