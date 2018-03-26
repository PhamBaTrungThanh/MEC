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
        const index = state.data.findIndex(workgroup => workgroup.id === data.id)
        if (index !== -1) {
            const oldData = state.data[index]
            const newWorkgroup = Object.assign({}, oldData, data)
            state.data.splice(index, 1, newWorkgroup)
        } else {
            throw new Error(`Workgroup index not found`)
        }
    },
}
const getters = {
    workgroupById: (state, getters, rootState, rootGetters) => id => {
        const workgroup = state.data.find(workgroup => workgroup.id === id)
        if (workgroup) {
            const users = arraySort(workgroup.users.map(user => {
                const mapUser = rootGetters.userById(user.userId)
                if (mapUser) {
                    return {
                        name: mapUser.name,
                        role: user.role,
                        id: user.userId,
                    }
                } else {
                    return user
                }
            }), [`name`])
            return Object.assign({}, workgroup, {users: users})
        }
    },
    workgroups: (state, getters, rootState, rootGetters) => {
        return state.data.map(workgroup => {
            if (workgroup.users) {
                const users = arraySort(workgroup.users.map(user => {
                    const mapUser = rootGetters.userById(user.userId)
                    if (mapUser) {
                        return {
                            name: mapUser.name,
                            role: user.role,
                            id: user.userId,
                        }
                    } else {
                        return user
                    }
                }), [`name`])
                return Object.assign({}, workgroup, {users: users})
            } else {
                return workgroup
            }
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
    async storeWorkgroup ({commit}, {name, isPrivate = true, parentId = 0}) {
        console.log(`Store::Workgroup -> create new workgroup resource`)
        try {
            const response = await this._vm.axios.post(`workgroup`, {
                name: name,
                is_private: isPrivate,
                parent_id: parentId,
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
    async updateWorkgroup ({commit}, {name, isPrivate, id}) {
        console.log(`Store::Workgroup -> update workgroup id:::${id}`)
        try {
            const response = await this._vm.axios.put(`workgroup/${id}`, {
                action: `update_workgroup`,
                name: name,
                is_private: isPrivate,
            })
            if (response.status === 200) {
                commit(`UPDATE_WORKGROUP_RESOURCE`, response.data.data)
                return true
            }
        } catch (e) {
            console.log(`Store::Workgroup => update error`, e)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
