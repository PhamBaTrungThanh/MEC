import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: `/`,
            name: `landing-page`,
            component: require(`@/components/LandingPage`).default,
        },
        {
            path: `/dashboard`,
            name: `dashboard`,
            component: require(`@/components/Dashboard`).default,
        },
        {
            path: `*`,
            redirect: `/`,
        },
    ],
    linkActiveClass: `is-active`,
    linkExactActiveClass: `is-exact-active`,
})
