const state = {
    user: {},
    users: [],
}
const mutations = {
    STORE_CURRENT_USER (state, user) {
        state.user = user
    },
    STORE_ALL_USERS (state, users) {
        state.users = users
    },
}
const getters = {
    user (state) {
        return state.user
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Users -> store ${data.users.length} works.`)
        commit(`STORE_ALL_USERS`, data.users)
    },
    async getLoggedInUser ({commit, dispatch}) {
        try {
            const currentUser = await this._vm.axios.get(`user`)
            if (currentUser.status === 200) {
                console.log(`Store::Users -> user ${currentUser.data.data.name} logged in`)
                commit(`STORE_CURRENT_USER`, currentUser.data.data)
            }
            dispatch(`appResourcesFetched`, `users`)
        } catch (e) {
            console.log(`Store::Users =>`, e)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
