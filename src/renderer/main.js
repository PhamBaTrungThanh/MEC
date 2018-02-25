import Vue from 'vue'
import VeeValidate from 'vee-validate'

import App from './App'
import router from './router'
import store from './store'
import { MEC } from './bootstrap'

if (!process.env.IS_WEB) Vue.use(require(`vue-electron`))
Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(MEC)
/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: `<App/>`,
}).$mount(`#app`)
