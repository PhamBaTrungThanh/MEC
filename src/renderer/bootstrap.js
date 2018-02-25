import axios from 'axios'

const App = Object.freeze({
    version: `0.0.1`,
    name: `MEC International`,
    timeout: `5000`,
    baseURL: `http://tracker.dev`,
    get baseAPIUrl () { return `${this.baseURL}/api/v1` },
})

const helpers = Object.freeze({
    axios: axios.create({
        baseURL: App.baseAPIUrl,
        timeout: App.timeout,
        headers: {
            'X-Requested-With': `XMLHttpRequest`,
        },
    }),
})

const MEC = {
    install: (Vue) => {
        /**
         * Create new axios instance
         */
        Vue.prototype.axios = helpers.axios
    },
}

export {
    App,
    helpers,
    MEC,
}
