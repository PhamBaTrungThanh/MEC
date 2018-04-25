<template>

</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: `delete-payment`,
    computed: mapGetters({
        user: `currentUser`,
        invoice: `routeInvoice`,
        payment: `routePayment`,
        work: `routeWork`,
    }),
    mounted () {
        this.swal({
            title: `Cảnh báo`,
            text: `Bạn chắc chắn muốn xóa ${this.payment.name}?`,
            type: `error`,
        }).then(confirm => {
            if (confirm.dismiss) {
                this.$router.go(-1)
            } else if (confirm.value) {
                this.$store.dispatch(`deletePayment`, {paymentId: this.payment.id, confirm: true}).then(() => {
                    this.$router.push({name: `invoice.show`, params: {invoice_id: this.invoice.id}})
                })
            }
        })
    },
}
</script>

<style>

</style>
