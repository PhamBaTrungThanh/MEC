<template>
    <transition name="slide-fade">
        <div class="payment_show--wrapper" v-if="receive">        
            <hero-header :page="pageMeta" />
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs" v-if="invoice">
                        <router-link :to="{'name': 'invoice.show', 'params': {'id': invoice.id}}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-chevron-left"></i>
                            </span>
                            <span>Về đơn hàng</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="container">
                </div>

            </section>

        </div>    
    </transition>
</template>

<script>
export default {
    computed: {
        user () {
            return this.$store.state.user
        },
        pageMeta () {
            return {
                title: (this.receive) ? `Biên nhận hàng hóa ${this.receive.name}` : ``,
                description: (this.invoice) ? `Đơn hàng: ${this.invoice.name}` : `Đơn hàng`,
            }
        },
    },
    asyncComputed: {
        receive: {
            default: false,
            get () {
                return this.$store.dispatch(`getReceive`, {payment_id: this.$route.params.id, fetchNew: true})
            },
        },
        invoice: {
            default: false,
            lazy: true,
            get () {
                return this.$store.dispatch(`getInvoice`, {invoice_id: this.payment.invoice_id})
            },
        },
    },
}
</script>

<style>

</style>
