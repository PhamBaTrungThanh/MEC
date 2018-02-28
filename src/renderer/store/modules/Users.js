import arraySort from 'array-sort'
const state = {
    user: {},
    users: [],
    groups: [
        {
            name: `directors`,
            label: `Ban giám đốc`,
            role_id: 1,
        },
        {
            name: `projects`,
            label: `Phòng dự án`,
            role_id: 2,
        },
        {
            name: `accounting`,
            label: `Phòng kế toán`,
            role_id: 3,
        },
        {
            name: `enginneering`,
            label: `Phòng kỹ thuật`,
            role_id: 4,
        },
        {
            name: `generals`,
            label: `Phòng hành chính`,
            role_id: 5,
        },
    ],
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
        let groups = []
        for (let i = state.groups.length - 1; i >= 0; i--) {
            groups.push({
                label: state.groups[i].label,
                list: arraySort(state.users.reduce((users, user) => {
                    if (user.role === state.groups[i].role_id) {
                        users.push(user)
                    }
                    return users
                }, []), [`order`, `name`]),
                order: state.groups[i].role_id,
            })
        }
        return arraySort(groups, `order`)
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
