const axios = require(`../../bootstrap`).helpers.axios

const state = {
    isReady: false,
    isLoggedIn: false,
    initialized: false,
    requestLogin: false,
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
    REFUSE_LOGINFORM (state) {
        state.requestLogin = false
    },
}
const actions = {
    async appInit ({ commit }) {
        commit(`INITIALIZED`)
        try {
            const loginStatus = await axios.get(`user`)
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
}
export default {
    state,
    mutations,
    actions,
}
