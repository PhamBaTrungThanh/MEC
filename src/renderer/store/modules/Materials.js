const state = {
    data: [],
}
const mutations = {
    STORE_ALL_MATERIALS (state, data) {
        state.data = data
    },
    STORE_MATERIALS (state, data) {
        state.data.push(...data)
    },
    UPDATE_MUTIPLE_MATERIALS (state, materials) {
        for (let i = materials.length - 1; i >= 0; i--) {
            const index = state.data.findIndex(t => t.id === materials[i].id)
            state.data.splice(index, 1, materials[i])
        }
    },
}
const getters = {
    materialById: state => id => {
        return state.data.find(m => m.id === id)
    },
    detailedMaterial: (state, getters) => id => {
        const trackers = getters.relatedTrackersInMaterial(id)
        const trackersWith = trackers.map(t => {
            return Object.assign({}, t, {invoice: getters.invoiceById(t.invoice_id)})
        })
        return {
            data: state.data.find(m => m.id === id),
            trackers: trackersWith,
        }
    },
    allMaterials: state => {
        // return state.data
    },
    materialsInWork: (state, getters, rootState) => {
        if (rootState.route.params.work_id) {
            const workId = parseInt(rootState.route.params.work_id)
            return state.data.reduce((ms, m) => {
                if (m.work_id === workId) {
                    ms.push(m)
                }
                return ms
            }, [])
        }
        return []
    },
    materialTree: (state, getters) => {
        let _materials = getters.materialsInWork
        if (_materials.length === 0) {
            return []
        } else {
            let _maxDepth = _materials.reduce((max, m) => max > m.depth ? max : m.depth)
            for (let i = _maxDepth; i >= 1; i--) {
                // get all the parents
                let _parents = _materials.reduce((materials, material) => {
                    if (material.depth === i - 1) {
                        materials.push(material)
                    }
                    return materials
                }, [])
                for (let j = _parents.length - 1; j >= 0; j--) {
                    if (_parents[j].has_children) {
                        _parents[j].children = _materials.reduce((materials, material) => {
                            if (material.parent_id === _parents[j].id) {
                                materials.push(material)
                            }
                            return materials
                        }, [])
                    }
                }
                // Get all left;
                if (i > 0) {
                    let _unused = _materials.reduce((materials, material) => {
                        if (material.depth === i - 2) {
                            materials.push(material)
                        }
                        return materials
                    }, [])
                    _materials = [..._parents, ..._unused]
                } else {
                    _materials = _parents
                }
            }
            return _materials
        }
    },
}
const actions = {
    storeResources ({commit}, data) {
        console.log(`Store::Materials -> store ${data.materials.length} materials.`)
        commit(`STORE_ALL_MATERIALS`, data.materials)
    },
    createOrUpdate ({commit}, {action, dataPool}) {
        if (action === `storeInvoice`) {
            if (dataPool.materials) {
                commit(`STORE_MATERIALS`, dataPool.materials)
            }
        }
    },
    updateAffected ({commit}, affected) {
        if (affected.hasOwnProperty(`materials`)) {
            commit(`UPDATE_MUTIPLE_MATERIALS`, affected.materials)
        }
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
