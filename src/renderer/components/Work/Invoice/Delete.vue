<template>

</template>

<script>
export default {
    name: `delete-invoice`,
    computed: {
        invoice () {
            return this.$store.getters.invoice
        },
        work () {
            return this.$store.getters.work
        },
    },
    mounted () {
        this.swal({
            title: `Cảnh báo`,
            text: `Bạn chắc chắn muốn xóa đơn hàng ${this.invoice.name}?`,
            type: `error`,
        }).then(confirm => {
            console.log(confirm)
            if (confirm.dismiss) {
                this.$router.go(-1)
            } else if (confirm.value) {
                this.$store.dispatch(`deleteInvoice`, {invoiceId: this.invoice.id, confirm: true}).then(() => {
                    this.$router.push({name: `work.show`, params: {work_id: this.work.id}})
                })
            }
        })
    },
}
</script>

<style>

</style>
