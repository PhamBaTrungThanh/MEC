import storage from 'electron-json-storage'
const App = require(`../../bootstrap`).App

const state = {
    isReady: false,
    isLoggedIn: false,
    initialized: false,
    requestLogin: false,
    secondaryDisplay: false,
    secondaryComponent: false,
    secondaryProps: [],
    _token: ``,
    resources: [],
    cleaveOptions: {
        date: {
            date: true,
            datePattern: [`d`, `m`, `Y`],
        },
        price: {
            numeral: true,
            numeralThousandsGroupStyle: `thousand`,
        },
        vat: {
            numeral: true,
        },
    },
    isFullscreen: false,
}
const mutations = {
    IS_READY (state) {
        state.isReady = true
    },
    IS_NOT_READY (state) {
        state.isReady = false
    },
    INITIALIZED (state) {
        state.initialized = true
    },
    REQUEST_LOGINFORM (state) {
        state.requestLogin = true
    },
    LOGGED_IN (state) {
        state.requestLogin = false
    },
    TOKEN (state, token) {
        state._token = token
    },
    UPDATE_RESOURCES (state, data) {
        state.resources.push(data)
    },
    SET_SECONDARY_DISPLAY_PROPS (state, data) {
        state.secondaryProps = data
    },
    TOGGLE_SECONDARY_DISPLAY_ON (state) {
        state.secondaryDisplay = true
    },
    TOGGLE_SECONDARY_DISPLAY_OFF (state) {
        state.secondaryDisplay = false
    },
    SHOW_SECONDARY_DISPLAY (state, componentName) {
        state.secondaryComponent = componentName
    },
}
const getters = {
    cleaveOptions (state) {
        return state.cleaveOptions
    },
    secondaryDisplayStatus (state) {
        return state.secondaryDisplay
    },
    secondaryComponent (state) {
        return state.secondaryComponent
    },
    secondaryProps (state) {
        return state.secondaryProps
    },
}
const actions = {
    async appInit ({ commit, dispatch }) {
        commit(`INITIALIZED`)
        const readToken = () => {
            return new Promise((resolve, reject) => {
                storage.get(`authorize`, (error, data) => {
                    if (error) {
                        reject(error)
                    }
                    resolve(data.access_token)
                })
            })
        }
        const _token = await readToken()
        if (_token) {
            try {
                // set custom headers
                this._vm.axios.defaults.headers.common.Authorization = `Bearer ${_token}`
                const loginStatus = await this._vm.axios.get(`user`)
                if (loginStatus.status === 200) {
                    console.log(`Store::App('AppInit') -> User Authorized`)
                    commit(`TOKEN`, _token)
                    commit(`LOGGED_IN`)
                    dispatch(`fetchAllResources`)
                }
            } catch (e) {
                if (e.response.status === 401) {
                    console.log(`Store::App('AppInit') => User unauthorized`)
                    // remove custom header
                    this._vm.axios.defaults.headers.common.Authorization = ``
                    commit(`REQUEST_LOGINFORM`)
                }
                console.log(`Store::App('AppInit') => `, e)
            }
        } else {
            console.log(`Store::App('AppInit') => User not logged in`)
            commit(`REQUEST_LOGINFORM`)
        }
    },
    async appLogin ({ commit }, {username, password}) {
        try {
            const loginWorker = await this._vm.axios.post(`${App.baseURL}/oauth/token`, {
                grant_type: `password`,
                client_id: 2,
                client_secret: `D8d2UvaXaBe6ommOdVgnVpwPrtmiJPDQN5k6cBNJ`,
                username: username,
                password: password,
                scope: `*`,
            })
            if (loginWorker.status === 200) {
                storage.set(`authorize`, {access_token: loginWorker.data.access_token})
                commit(`TOKEN`, loginWorker.data.access_token)
                this._vm.axios.defaults.headers.common.Authorization = `Bearer ${loginWorker.data.access_token}`
                commit(`LOGGED_IN`)
            }
            return loginWorker
        } catch (e) {
            console.log(`Store::App('AppLogin') =>`, e)
            return e.response
        }
    },
    async appLogout ({commit}) {
        try {
            console.log(`Store::App('appLogout') -> try to logout`)
            const worker = await this._vm.axios.post(`/logout`)
            if (worker.status === 200) {
                console.log(`Store::App('appLogout') -> logout complete, request login again`)
                commit(`IS_NOT_READY`)
                commit(`REQUEST_LOGINFORM`)
            }
        } catch (e) {
            console.log(e)
        }
    },
    async fetchAllResources ({ commit, dispatch }) {
        try {
            const [worker] = await Promise.all([this._vm.axios.get(`data`), dispatch(`getLoggedInUser`)])
            if (worker.status === 200) {
                console.log(`Store::App('fetchAllResources') -> data fetched`)
                dispatch(`storeResources`, worker.data)
                console.log(`Store::App('fetchAllResources') -> App is Ready`)
                commit(`IS_READY`)
            }
        } catch (e) {
            console.log(`Store::App('fetchAllResources') => `, e)
        }
    },
    appResourcesFetched ({commit}, data) {
        commit(`UPDATE_RESOURCES`, data)
    },
    sideComponent ({commit}, {componentName, props}) {
        commit(`TOGGLE_SECONDARY_DISPLAY_ON`)
        commit(`SET_SECONDARY_DISPLAY_PROPS`, props)
        commit(`SHOW_SECONDARY_DISPLAY`, componentName)
    },
    sideComponentOff ({commit}) {
        commit(`SET_SECONDARY_DISPLAY_PROPS`, {})
        commit(`SHOW_SECONDARY_DISPLAY`, ``)
        commit(`TOGGLE_SECONDARY_DISPLAY_OFF`)
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}
