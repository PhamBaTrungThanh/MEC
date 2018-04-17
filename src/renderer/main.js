import {remote} from 'electron'
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { sync } from 'vuex-router-sync'
import Cleave from 'vue-cleave-component'
import Treeselect from '@riophae/vue-treeselect'
import VCalendar from 'v-calendar'

import App from './App'
import router from './router'
import store from './store'
import { MEC } from './bootstrap'
import SweetIcon from '@/components/Components/SweetIcon'
import ContentSidebar from '@/components/Layouts/ContentSidebar'
if (process.env.NODE_ENV === `production`) window.console = remote.getGlobal(`log`)
if (!process.env.IS_WEB) Vue.use(require(`vue-electron`))

Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(MEC)
Vue.use(Cleave)
Vue.use(VCalendar)
Vue.component(`sweet-icon`, SweetIcon)
Vue.component(`treeselect`, Treeselect)
Vue.component(`content-sidebar`, ContentSidebar)

// Sync store and router
sync(store, router)
/*
router.afterEach((to, from) => {
    store.dispatch(`ROUTE_CHANGE`, to, from)
})
*/
/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: `<App/>`,
}).$mount(`#app`)
