import arraySort from 'array-sort'
const state = {
    user: {},
    users: [],
    directorsGroup: {
        label: "Ban giám đốc",
    },
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
    currentUser (state) {
        return state.user
    },
    users (state) {
        return state.users
    },
    usergroups (state) {
        let directorsGroup = [],
            projectsGroup = [],
            accountingGroups = [],
            enginneeringGroups = [],
            generalsGroups = []
        for (let i = state.users.length - 1; i <= 0; i--) {
            if ()
        }
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
                return true
            }
        } catch (e) {
            console.log(`Store::Users =>`, e)
            return false
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
