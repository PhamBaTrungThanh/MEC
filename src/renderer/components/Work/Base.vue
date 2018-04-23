<template>
    <main-layout>
        <nav class="navbar" slot="navbar">
            <div class="container is-fluid">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <nav class="navbar-item breadcrumb">
                            <ul>
                                <router-link tag="li" :to="{name: `dashboard`}" active-class="router-active" exact-active-class="is-active"><a>MEC</a></router-link>
                                <router-link tag="li" :to="{name: `work.index`}" active-class="router-active" exact-active-class="is-active"><a>Dự án</a></router-link>
                                <router-link tag="li" :to="{name: `work.create`}" active-class="router-active" exact-active-class="is-active" v-if="routeName === `work.create`"><a>Tạo dự án mới</a></router-link>
                                <router-link tag="li" :to="{name: `work.show`, params: {work_id: work.id}}" active-class="router-active" exact-active-class="is-active" v-if="work"><a>{{work.name}}</a></router-link>
                                <router-link tag="li" :to="{name: `work.report`, params: {work_id: work.id}}" active-class="router-active" exact-active-class="is-active" v-if="routeName === 'work.report'"><a>Báo cáo công trình {{work.name}}</a></router-link>
                                <router-link tag="li" :to="{name: `invoice.create`}" active-class="router-active" exact-active-class="is-active" v-if="routeName === `invoice.create`"><a>Tạo đơn hàng</a></router-link>
                                <router-link tag="li" :to="{name: `invoice.show`, params: {invoice_id: invoice.id}}" active-class="router-active" exact-active-class="is-active" v-if="invoice"><a>Đơn hàng: {{invoice.name}}</a></router-link>
                                <router-link tag="li" :to="{name: `payment.show`, params: {payment_id: payment.id}}" active-class="router-active" exact-active-class="is-active" v-if="payment"><a>Thanh toán: {{payment.name}}</a></router-link>
                            </ul>
                        </nav>
                    </div>
                    <div class="navbar-end">
                        <div class="navbar-item">
                            <div class="buttons">
                                <router-link :to="{name: `work.create`}" class="button is-success" v-if="routeName === `work.index`">Tạo dự án</router-link>
                                <router-link :to="{name: `work.index`}" class="button is-danger" v-if="routeName === `work.create`">Hủy</router-link>
                                <router-link :to="{name: `invoice.create`, params: {work_id: work.id}}" class="button is-success" v-if="routeName === `work.show`">Tạo đơn hàng</router-link>
                                <router-link :to="{name: `work.report`, params: {work_id: work.id}}" class="button is-link" v-if="routeName === `work.show`">Xem báo cáo</router-link>
                                <router-link :to="{name: `invoice.delete`, params: {work_id: work.id, invoice_id: invoice.id}}" class="button is-danger" v-if="routeName === `invoice.show`">Xóa đơn hàng</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </main-layout>
</template>

<script>
import MainLayout from '@/components/Layouts/Main'
import { mapGetters } from 'vuex'
export default {
    name: `work-base`,
    components: {
        MainLayout,
    },
    computed: {
        ...mapGetters({
            invoice: `routeInvoice`,
            payment: `routePayment`,
        }),
        work () {
            return this.$store.getters.currentWork.data
        },
        routeName () {
            return this.$route.name
        },
    },
}
</script>

<style>

</style>
