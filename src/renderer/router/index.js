import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
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
            path: `/hr`,
            component: require(`@/components/HR/Base`).default,
            children: [
                {
                    path: ``,
                    name: `hr.index`,
                    component: require(`@/components/HR/Index`).default,
                },
            ],
        },
        {
            path: `/work`,
            component: require(`@/components/Work/Base`).default,
            children: [
                {
                    path: `create`,
                    name: `work.create`,
                    component: require(`@/components/Work/Create`).default,
                },
                {
                    path: `:work_id`,
                    name: `work.show`,
                    component: require(`@/components/Work/Show`).default,
                },
                {
                    path: `:work_id/edit`,
                    name: `work.edit`,
                    component: require(`@/components/Work/Edit`).default,
                },
                {
                    path: `:work_id/report`,
                    name: `work.report`,
                    component: require(`@/components/Work/Report`).default,
                },
                {
                    path: ``,
                    name: `work.index`,
                    component: require(`@/components/Work/Index`).default,
                },
            ],
        },
        {
            path: `/work/:work_id/invoice`,
            component: require(`@/components/Invoice/Base`).default,
            children: [
                {
                    path: `create`,
                    name: `invoice.create`,
                    component: require(`@/components/Invoice/Create`).default,
                },
                {
                    path: `:invoice_id`,
                    name: `invoice.show`,
                    component: require(`@/components/Invoice/Show`).default,
                },
                {
                    path: `:invoice_id/edit`,
                    name: `invoice.edit`,
                    component: require(`@/components/Invoice/Edit`).default,
                },
            ],
        },
        {
            path: `/work/:work_id/invoice/:invoice_id/payment`,
            component: require(`@/components/Payment/Base`).default,
            children: [
                {
                    path: `create`,
                    name: `payment.create`,
                    component: require(`@/components/Payment/Create`).default,
                }, {
                    path: `:payment_id`,
                    name: `payment.show`,
                    component: require(`@/components/Payment/Show`).default,
                }, {
                    path: `:payment_id/edit`,
                    name: `payment.edit`,
                    component: require(`@/components/Payment/Edit`).default,
                },
            ],
        },
        {
            path: `/work/:work_id/invoice/:invoice_id/receive`,
            component: require(`@/components/Receive/Base`).default,
            children: [
                {
                    path: `create`,
                    name: `receive.create`,
                    component: require(`@/components/Receive/Create`).default,
                }, {
                    path: `:receive_id`,
                    name: `receive.show`,
                    component: require(`@/components/Receive/Show`).default,
                }, {
                    path: `:receive_id/edit`,
                    name: `receive.edit`,
                    component: require(`@/components/Receive/Edit`).default,
                },
            ],
        },
        {
            path: `*`,
            redirect: `/`,
        },
    ],
    linkActiveClass: `is-active`,
    linkExactActiveClass: `is-exact-active`,
})
