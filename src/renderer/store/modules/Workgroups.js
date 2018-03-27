import arraySort from 'array-sort'
const state = {
    data: [],
}
const mutations = {
    STORE_WORKGROUP (state, data) {
        state.data.push(data)
    },
    STORE_WORKGROUP_RESOURCES (state, data) {
        if (state.data.length !== 0) {
            console.warn(`Store::Workgroup: method 'STORE_RESOURCES' should only called once.`)
        }
        state.data = data
    },
    UPDATE_WORKGROUP_RESOURCE (state, data) {
        try {
            const index = state.data.findIndex(workgroup => workgroup.id === data.id)
            if (index !== -1) {
                const oldData = state.data[index]
                const newWorkgroup = Object.assign({}, oldData, data)
                state.data.splice(index, 1, newWorkgroup)
            } else {
                throw new Error(`Workgroup index not found`)
            }
        } catch (e) {
            console.log(e)
        }
    },
    DELETE_WORKGROUP (state, id) {
        try {
            const index = state.data.findIndex(workgroup => workgroup.id === id)
            if (index !== -1) {
                state.data.splice(index, 1)
            } else {
                throw new Error(`Workgroup index not found`)
            }
        } catch (e) {
            console.log(e)
        }
    },
}
const getters = {
    usersForWorkgroup: (state, getters, rootState, rootGetters) => id => {
        const workgroup = state.data.find(workgroup => workgroup.id === id)
        const users = (workgroup.users) ? arraySort(workgroup.users.map(user => {
            const mapUser = rootGetters.userById(user.userId)
            if (mapUser) {
                return {
                    name: mapUser.name,
                    role: user.role,
                    id: user.userId,
                    firstName: mapUser.first_name,
                    roleWeight: (user.role === `leader`) ? 0 : 1,
                    avatar: mapUser.avatar,
                }
            } else {
                return []
            }
        }), [`roleWeight`, `firstName`]) : []
        return users
    },
    workgroupById: (state, getters, rootState, rootGetters) => id => {
        const workgroup = state.data.find(workgroup => workgroup.id === id)
        if (workgroup) {
            const users = getters.usersForWorkgroup(workgroup.id)
            return Object.assign({}, workgroup, {users: users})
        }
    },
    workgroups: (state, getters, rootState, rootGetters) => {
        return state.data.map(workgroup => {
            const users = getters.usersForWorkgroup(workgroup.id)
            return Object.assign({}, workgroup, {users: users})
        })
    },
}
const actions = {
    async fetchAllResources ({commit}) {
        console.log(`Store::Workgroup -> fetch all Resource`)
        try {
            const response = await this._vm.axios.get(`workgroup`)
            if (response.status === 200) {
                commit(`STORE_WORKGROUP_RESOURCES`, response.data.data)
            }
        } catch (e) {
            console.log(`Store::Workgroup('fetchAllResources') => `, e)
        }
    },
    async storeWorkgroup ({commit}, {name, isPrivate = true, parentId = 0, leaderId = 0}) {
        console.log(`Store::Workgroup -> create new workgroup resource`)
        try {
            const response = await this._vm.axios.post(`workgroup`, {
                name: name,
                is_private: isPrivate,
                parent_id: parentId,
                leader_id: leaderId,
            })
            if (response.status === 201) {
                commit(`STORE_WORKGROUP`, response.data.data)
                return true
            } else {
                throw new Error(`Can not create resource`)
            }
        } catch (e) {
            console.log(`Store::Workgroup('store') => `, e)
        }
    },
    async updateWorkgroup ({commit}, {name, isPrivate, id, leaderId}) {
        console.log(`Store::Workgroup -> update workgroup id:::${id}`)
        try {
            const response = await this._vm.axios.put(`workgroup/${id}`, {
                action: `update_workgroup`,
                name: name,
                is_private: isPrivate,
                leader_id: leaderId,
            })
            if (response.status === 200) {
                commit(`UPDATE_WORKGROUP_RESOURCE`, response.data.data)
                return true
            }
        } catch (e) {
            console.log(`Store::Workgroup => update error`, e)
        }
    },
    async deleteWorkgroup ({commit}, {workgroupId}) {
        console.log(`Store::Workgroup -> delete Workgroup by id ${workgroupId}`)
        try {
            const response = await this._vm.axios.delete(`workgroup/${workgroupId}`)
            if (response.status === 200) {
                commit(`DELETE_WORKGROUP`, workgroupId)
                return true
            }
        } catch (e) {
            console.log(`Store::Workgroup -> delete workgroup error`, e)
        }
    },
    async addUsersToWorkgroup ({commit}, {selectedUsers, workgroupId}) {
        console.log(`Store::Workgroup -> add user to workgroup with id ${workgroupId}`)
        try {
            const response = await this._vm.axios.put(`workgroup/${workgroupId}`, {
                user_list: selectedUsers,
                action: `add_new_users`,
            })
            if (response.status === 200) {
                commit(`UPDATE_WORKGROUP_RESOURCE`, response.data.data)
                return true
            } else {
                throw new Error(`Can not update resource, return status ${response.status}`)
            }
        } catch (e) {
            console.log(`Store::Workgroup -> update workgroup error`, e)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
