import arraySort from 'array-sort'
const state = {
    user: {},
    data: [],
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
        state.data = users
    },
    UPDATE_USER_RESOURCE_FIELD (state, {userId, field}) {
        try {
            const index = state.data.findIndex(user => user.id === userId)
            if (index === -1) {
                throw new Error(`User not found`)
            }
            const updatedUser = Object.assign({}, state.data[index], field)
            state.data.splice(index, 1, updatedUser)
            // Check to update current user
            if (state.user.id === userId) {
                state.user = Object.assign({}, state.user, field)
            }
        } catch (e) {
            console.log(`Store::User -> commit error`, e)
        }
    },
}
const getters = {
    currentUser (state) {
        return state.user
    },
    users (state) {
        return state.data
    },
    usersSortByName (state) {
        let users = JSON.parse(JSON.stringify(state.data))
        return arraySort(users, `first_name`)
    },
    usergroups (state) {
        let groups = []
        for (let i = state.groups.length - 1; i >= 0; i--) {
            groups.push({
                label: state.groups[i].label,
                list: arraySort(state.data.reduce((users, user) => {
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
    userById: state => id => {
        if (id) {
            return state.data.find(user => user.id === id)
        }
        return false
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Users -> store ${data.users.length} works.`)
        commit(`STORE_ALL_USERS`, data.users)
    },
    storeCurrentUser ({commit}, data) {
        commit(`STORE_CURRENT_USER`, data)
    },
    async getLoggedInUser ({dispatch}) {
        try {
            const currentUser = await this._vm.axios.get(`user`)
            if (currentUser.status === 200) {
                console.log(`Store::Users -> user ${currentUser.data.data.name} logged in`)
                dispatch(`storeCurrentUser`, currentUser.data.data)
                return true
            }
        } catch (e) {
            console.error(`Store::Users =>`, e)
            return false
        }
    },
    async updateUserInfo ({commit, getters}, {id, computerName, value}) {
        console.log(`Store::Users -> update user id ${id} in field ${computerName} with data ${value}`)
        try {
            const response = await this._vm.axios.put(`user/${id}`, {
                action: `update_info`,
                field_name: computerName,
                value: value,
            })
            if (response.status === 200) {
                commit(`UPDATE_USER_RESOURCE_FIELD`, {
                    userId: id,
                    field: response.data.update,
                })
                return true
            }
            if (response.status === 204) {
                throw new Error(`No new value`)
            }
            if (response.status === 400) {
                throw new Error(`Invalid Update field`)
            }
        } catch (e) {
            console.error(`Store::Users -> update user error`, e)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
