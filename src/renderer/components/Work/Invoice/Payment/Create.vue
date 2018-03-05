<template>
    <transition name="slide-fade">
        <div class="payment_create--wrapper" v-if="invoice">
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs">
                        <router-link :to="{'name': 'invoice.show', 'params': {'id': invoice.id}}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-chevron-left"></i>
                            </span>
                            <span>Quay lại</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="container">
                    <div class="columns box">
                        <div class="column is-10 is-offset-1">
                            <div class="content">
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Thông tin hóa đơn</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field is-expanded has-addons">
                                            <p class="control">
                                                <a class="button is-static">Mã hóa đơn</a>
                                            </p>
                                            <p class="control has-icons-left  is-expanded">
                                                <input type="text" name="invoice_id" readonly :value="$route.params.invoice_id" class="input ">
                                                <span class="icon is-left">
                                                    <i class="mdi mdi-file-outline"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div class="field is-expanded  has-addons">

                                            <p class="control">
                                                <a class="button is-static">Người tạo</a>
                                            </p>
                                            <p class="control is-expanded">
                                                <input type="text" class="input" name="creator_name" :value="user.name">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Tên</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field is-expanded">
                                            <p class="control">
                                                <input type="input" v-model="new_payment.name" :class="{'input': true, 'is-danger': errors.has('payment_name')}" v-validate="'required'" name="payment_name" :disabled="onSubmit">
                                            </p>
                                            <p class="help is-danger" v-show="errors.has('payment_name')">Tên không được để trống</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Hình thức thanh toán</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field is-expanded">
                                            <div class="control">
                                                <div class="select">
                                                    <select v-model="new_payment.method" :disabled="onSubmit">
                                                        <option value="bank_transfer">Chuyển khoản</option>
                                                        <option value="cash">Tiền mặt</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Ngày thanh toán</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control">
                                                <cleave :options="options.date" v-model="new_payment.paid_on" :class="{'input': true, 'is-danger': errors.has('payment_date')}" name="payment_date" v-validate.initial="'required|date_format:DD/MM/YYYY'" :raw="false" :disabled="onSubmit"></cleave>
                                            </p>
                                            <p class="help is-danger" v-show="errors.firstByRule('payment_date', 'required')">
                                                Ngày không được để trống.
                                            </p>   
                                            <p class="help is-danger" v-show="errors.firstByRule('payment_date', 'date_format')">
                                                Ngày không hợp lệ. Nhập ngày theo dạng DD/MM/YYYY
                                            </p>     
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Số tiền</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field is-expanded">
                                            <p class="control">
                                                <cleave v-model="new_payment.amount" :options="options.price" :class="{'input': true, 'is-danger': errors.has('payment_amount')}" name="payment_amount" placeholder="Số tiền" v-validate.initial="'required'" :disabled="onSubmit"></cleave>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Nội dung</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field is-expanded">
                                            <div class="control">
                                                <textarea v-model="new_payment.content" :class="{'textarea': true, 'is-danger': errors.has('payment_content')}" v-validate.initial="'required'" name="payment_content" placeholder="Nội dung thanh toán" :disabled="onSubmit"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-grouped is-grouped-centered">
                                    <div class="control">
                                        <button :class="['button', 'is-link', {'is-loading': onSubmit}]" @click="submitPayment">
                                            <span class="icon">
                                                <i class="mdi mdi-file"></i>
                                            </span>
                                            <span>Tạo mới</span>
                                        </button>
                                    </div>
                                    <div class="control">
                                        <router-link class="button is-outlined" :to="{'name': 'invoice.show', 'params': {'id': invoice.id}}">Bỏ qua</router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div> 
    </transition>

</template>

<script>
export default {
    data: () => ({
        new_payment: {
            name: ``,
            paid_on: ``,
            content: ``,
            amount: ``,
            method: `bank_transfer`,
        },
        onSubmit: false,
        options: {
            price: {
                numeral: true,
                numeralThousandsGroupStyle: `thousand`,
            },
            vat: {
                numeral: true,
            },
            date: {
                date: true,
                datePattern: [`d`, `m`, `Y`],
            },
        },
    }),
    computed: {
        invoice () {
            return this.$store.getters[`invoice/invoice`](parseInt(this.$route.params.invoice_id))
        },
        payment_methods () {
            return this.$store.state.paymentMethods
        },
        pageMeta () {
            return {
                title: `Tạo thanh toán mới`,
                description: (this.invoice) ? `Hóa đơn: ${this.invoice.name}` : `Hóa đơn`,
            }
        },
        user () {
            return this.$store.getters[`user/user`]
        },
    },
    methods: {
        guard () {
            this.$store.dispatch(`invoice/getSingleInvoiceInstance`, {invoice_id: parseInt(this.$route.params.invoice_id)})
            // this.$store.dispatch(`invoice/getRelatedTrackers`, {invoice_id: parseInt(this.$route.params.invoice_id)})
            // this.$store.dispatch(`invoice/getRelatedMaterials`, {invoice_id: parseInt(this.$route.params.invoice_id)})
        },
        submitPayment () {
            if (this.errors.any()) {
                return false
            } else {
                this.onSubmit = true
                this.axios.post(`payment`, {
                    name: this.new_payment.name,
                    paid_on: this.toISODate(this.new_payment.paid_on),
                    content: this.new_payment.content,
                    amount: this.new_payment.amount,
                    method: this.new_payment.method,
                    invoice_id: this.$route.query.invoice_id,
                    user_id: this.$store.state.user.id,
                }).then(response => {
                    this.$store.dispatch(`newPayment`, response.data.created)
                    this.$store.dispatch(`updateInvoice`, response.data.affected.invoice)
                    this.onSubmit = false
                    this.$router.push({
                        name: `invoice.show`,
                        params: {
                            id: this.invoice.id,
                        },
                    })
                })
            }
        },
    },
    mounted () {
        const index = (this.$route.query.index) ? this.$route.query.index : 1
        this.new_payment.name = `Thanh toán lần ${index}`
    },
    beforeRouteEnter (to, from, next) {
        if (from.name === `invoice.show` || to.query.invoice_id) {
            next()
        } else {
            next(`/dashboard`)
        }
    },
}
</script>
