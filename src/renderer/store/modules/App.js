
const App = require(`../../bootstrap`).App

const state = {
    isReady: false,
    isLoggedIn: false,
    initialized: false,
    requestLogin: false,
    _token: ``,
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
}
const actions = {
    async appInit ({ commit }) {
        commit(`INITIALIZED`)
        try {
            const loginStatus = await this._vm.axios.get(`user`)
            if (loginStatus.status === 200) {
                console.log(`User Authorized`)
                console.log(`App is Ready`)
                commit(`IS_READY`)
            }
        } catch (e) {
            if (e.response.status === 401) {
                console.log(`User unauthorized or not logged in`)
                commit(`REQUEST_LOGINFORM`)
            }
            console.log(`AppInit error`, e)
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
                commit(`IS_READY`)
            }
            return loginWorker
        } catch (e) {
            console.log(`appLogin error`, e)
            return e.response
        }
    },
}
export default {
    state,
    mutations,
    actions,
}
