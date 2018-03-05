import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const withPrefix = (prefix, routes) =>
    routes.map(route => {
        route.path = prefix + route.path
        return route
    })
export default new VueRouter({
    routes: [
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
                ...withPrefix(`:work_id/invoice/`, [
                    {
                        path: `create`,
                        name: `invoice.create`,
                        component: require(`@/components/Work/Invoice/Create`).default,
                    },
                    {
                        path: `:invoice_id`,
                        name: `invoice.show`,
                        component: require(`@/components/Work/Invoice/Show`).default,
                    },
                    {
                        path: `:invoice_id/edit`,
                        name: `invoice.edit`,
                        component: require(`@/components/Work/Invoice/Edit`).default,
                    },
                    ...withPrefix(`:invoice_id/payment/`, [
                        {
                            path: `create`,
                            name: `payment.create`,
                            component: require(`@/components/Work/Invoice/Payment/Create`).default,
                        }, {
                            path: `:payment_id`,
                            name: `payment.show`,
                            component: require(`@/components/Work/Invoice/Payment/Show`).default,
                        }, {
                            path: `:payment_id/edit`,
                            name: `payment.edit`,
                            component: require(`@/components/Work/Invoice/Payment/Edit`).default,
                        },
                    ]),
                    ...withPrefix(`:invoice_id/receives/`, [
                        {
                            path: `create`,
                            name: `receive.create`,
                            component: require(`@/components/Work/Invoice/Receive/Create`).default,
                        }, {
                            path: `:receive_id`,
                            name: `receive.show`,
                            component: require(`@/components/Work/Invoice/Receive/Show`).default,
                        }, {
                            path: `:receive_id/edit`,
                            name: `receive.edit`,
                            component: require(`@/components/Work/Invoice/Receive`).default,
                        },
                    ]),
                ]),
                {
                    path: ``,
                    name: `work.index`,
                    component: require(`@/components/Work/Index`).default,
                },
            ],
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        window.document.getElementById(`main`).scrollTop = 0
    },
})
