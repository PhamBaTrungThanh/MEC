
const App = require(`../../bootstrap`).App

const state = {
    isReady: false,
    isLoggedIn: false,
    initialized: false,
    requestLogin: false,
    _token: ``,
    resources: [],
}
const mutations = {
    IS_READY (state) {
        state.isReady = true
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
        this._vm.axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    UPDATE_RESOURCES (state, data) {
        state.resources.push(data)
    },
}
const actions = {
    async appInit ({ commit, dispatch }) {
        commit(`INITIALIZED`)
        try {
            const loginStatus = await this._vm.axios.get(`user`)
            if (loginStatus.status === 200) {
                console.log(`Store::App('AppInit') -> User Authorized`)
                dispatch(`fetchAllResources`)
            }
        } catch (e) {
            if (e.response.status === 401) {
                console.log(`Store::App('AppInit') => User unauthorized or not logged in`)
                commit(`REQUEST_LOGINFORM`)
            }
            console.log(`Store::App('AppInit') => `, e)
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
                commit(`TOKEN`, loginWorker.data.access_token)
                commit(`LOGGED_IN`)
            }
            return loginWorker
        } catch (e) {
            console.log(`Store::App('AppLogin') =>`, e)
            return e.response
        }
    },
    appResourcesFetched ({commit}, data) {
        commit(`UPDATE_RESOURCES`, data)
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
}
export default {
    state,
    mutations,
    actions,
}
