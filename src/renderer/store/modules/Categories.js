import arraySort from 'array-sort'
const state = {
    data: [],
}
const mutations = {
    STORE_CATEGORIES_RESOURCES_FROM_WORKGROUPS (state, data) {
        state.data.push(...data)
    },
    UPDATE_CATEGORY (state, data) {
        const index = state.data.findIndex(cat => cat.id === data.id)
        if (index === -1) {
            state.data.push(data)
        } else {
            state.data.splice(index, 1, data)
        }
    },
    UPDATE_CATEGORIES_ORDER (state, data) {
        for (let i = data.length - 1; i >= 0; i--) {
            const index = state.data.findIndex(cat => cat.id === data[i].id)
            state.data[index].order = data[i].order
        }
    },
    STORE_CATEGORY_RESOURCE (state, data) {
        state.data.push(data)
    },
    DELETE_CATEGORY_RESOURCE (state, id) {
        try {
            const index = state.data.findIndex(cat => cat.id === id)
            if (index === -1) {
                throw new Error(`Index not found`)
            }
            if (state.data[index].type === `default_category`) {
                throw new Error(`The default category can not be delete`)
            }
            state.data.splice(index, 1)
            return true
        } catch (e) {
            console.error(`Store::Categories 'DELETE_CATEGORY_RESOURCE' mutation error: `, e)
        }
    },
}
const getters = {
    currentCategory (state, getters, rootState, rootGetters) {
        if (rootState.route.params.category_id) {
            const id = parseInt(rootState.route.params.category_id)
            return getters.categoryById(id)
        }
        return {}
    },
    workgroupCategories: state => {
        return state.data.reduce((categories, category) => {
            if (category.parent_type === `workgroup`) {
                categories.push(category)
            }
            return categories
        }, [])
    },
    projectCategories: state => {
        return state.data.reduce((categories, category) => {
            if (category.parent_type === `project`) {
                categories.push(category)
            }
            return categories
        }, [])
    },
    categoriesForWorkgroup: (state, getters, rootState, rootGetters) => workgroupId => {
        const _data = getters.workgroupCategories.reduce((groups, group) => {
            if (group.parent_id === workgroupId) {
                if (group.type === `category`) {
                    groups.push(group)
                }
            }
            return groups
        }, [])
        return arraySort(_data, `order`)
    },
    categoryById: state => id => (state.data.find(category => category.id === id)),
}
const actions = {
    // hook
    storeWorkgroup ({commit}, data) {
        const categories = data.categories
        console.log(`Store::Categories => store ${categories.length} category objects from new workgroup id ${data.id}.`)
        commit(`STORE_CATEGORIES_RESOURCES_FROM_WORKGROUPS`, categories)
        return true
    },
    async storeWorkgroupResources ({commit}, data) {
        // get groups resources from workgroups data
        const categories = data.reduce((groups, workgroup) => {
            if (workgroup.categories) {
                groups.push(...workgroup.categories)
            }
            return groups
        }, [])
        commit(`STORE_CATEGORIES_RESOURCES_FROM_WORKGROUPS`, categories)
        console.log(`Store::Categories => store ${categories.length} category objects fetch from workgroups.`)
        return categories
    },
    async updateCategory ({commit}, {categoryId, action, data}) {
        try {
            const response = await this._vm.axios.put(`category/${categoryId}`, {
                action: action,
                data: data,
            })
            if (response.status === 200) {
                commit(`UPDATE_CATEGORY`, response.data.data)
                return true
            } else {
                throw new Error(`Update Category Error => ${response.status}`)
            }
        } catch (e) {
            console.error(`Store::Categories('updateCategory') => `, e)
        }
    },
    async newCategory ({commit}, {parentId, parentType, name}) {
        try {
            const response = await this._vm.axios.post(`category`, {
                parent_id: parentId,
                parent_type: parentType,
                name: name,
            })
            if (response.status === 201) {
                commit(`STORE_CATEGORY_RESOURCE`, response.data.data)
                return true
            } else {
                throw new Error(`Create new Category Resource Error => return status ${response.status}`)
            }
        } catch (e) {
            console.error(`Store::Categories('newCategory') => `, e)
        }
    },
    async updateCategoriesOrder ({commit}, {workgroupId, categories}) {
        try {
            const response = await this._vm.axios.put(`workgroup/${workgroupId}`, {
                action: `update_categories_order`,
                order_list: categories,
            })
            if (response.status === 200) {
                commit(`UPDATE_CATEGORIES_ORDER`, categories)
                return true
            }
        } catch (e) {
            console.error(`Store::Categories('updateCategoriesOrder')`, e)
        }
    },
    async deleteCategory ({commit}, {categoryId}) {
        try {
            const response = await this._vm.axios.delete(`category/${categoryId}`)
            if (response.status === 200) {
                commit(`DELETE_CATEGORY_RESOURCE`, categoryId)
                return true
            }
        } catch (e) {
            console.error(`Store::Categories('deleteCategory') -> `, e)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
