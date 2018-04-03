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
                        path: `:invoice_id/delete`,
                        name: `invoice.delete`,
                        component: require(`@/components/Work/Invoice/Delete`).default,
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
                        }, {
                            path: `:payment_id/delete`,
                            name: `payment.delete`,
                            component: require(`@/components/Work/Invoice/Payment/Delete`).default,
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
        {
            path: `/options`,
            name: `options`,
            component: require(`@/components/Flow/User/Options/Options`).default,
        },
        {
            path: `/flow`,
            name: `flow.base`,
            component: require(`@/components/Flow/Base`).default,
            children: [
                ...withPrefix(`workgroup/`, [
                    {
                        path: ``,
                        name: `workgroup.index`,
                        component: require(`@/components/Flow/Workgroup/Index`).default,
                    },
                    {
                        path: `create`,
                        name: `workgroup.create`,
                        component: require(`@/components/Flow/Workgroup/Create`).default,
                    },
                ]),
                ...withPrefix(`task/`, [
                    {
                        path: ``,
                        name: `task.show`,
                        component: require(`@/components/Flow/Task/Show`).default,
                    },
                    {
                        path: ``,
                        name: `task.user`,
                        component: require(`@/components/Flow/Task/User`).default,
                    },
                ]),
            ],
        },
    ],
    scrollBehavior (to, from, savedPosition) {
        window.document.getElementById(`main_section`).scrollTop = 0
    },
})
