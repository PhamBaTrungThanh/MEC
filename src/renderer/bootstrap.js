import axios from 'axios'

const App = Object.freeze({
    version: `0.0.1`,
    name: `MEC International`,
    timeout: `5000`,
    baseAPIUrl: `http://tracker.dev/api/v1`,
})

const helpers = Object.freeze({
    axios: axios.create({
        baseURL: App.baseAPIUrl,
        timeout: App.timeout,
    }),
})

export {
    App,
    helpers,
}

export const Tracker = {
    install: (Vue) => {
        // Mixins
        Vue.mixin({
            methods: {
                swal: App.helpers.swal,
                getMaterialById (id) {
                    if (this.materials) {
                        return this.materials.find(m => m.id === id)
                    } else {
                        return false
                    }
                },
            },
        })

        /**
         * Create new axios instance
         */
        Vue.prototype.axios = helpers.axios
    },
}
