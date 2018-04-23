<template>
    <content-sidebar>
        <aside class="menu" slot="sidebar">
            <div class="has-text-centered">
                <div class="breathe-icon breathe-light">
                    <span class="icon is-large">
                        <i class="mdi mdi-pencil mdi-24px"></i>
                    </span>
                </div>
            </div>

        </aside>
        <div class="payment_edit--wrapper">
            <div class="sector">
                <p class="title is-4">Sửa thanh toán</p>
                <hr />    
                <div class="field">
                    <label for="payment_name">Tên</label>
                    <div class="control">
                        <input type="input" v-model="payment.name" :class="{'input': true, 'is-danger': errors.has('payment_name')}" v-validate="'required'" name="payment_name" :disabled="onSubmit">
                        <span class="help is-danger" v-if="errors.has('payment_name')">Xin nhập tên</span>
                    </div>
                </div>
                <div class="field">
                    <label for="" class="label">Hình thức thanh toán</label>
                    <div class="field-body">
                        <div class="control is-expanded">
                            <div class="select">
                                <select v-model="payment.method" :disabled="onSubmit">
                                    <option value="bank_transfer">Chuyển khoản</option>
                                    <option value="cash">Tiền mặt</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label for="payment_date">Ngày thanh toán</label>
                    <div class="control">
                        <cleave :options="cleave.date" v-model="payment.paid_on" :class="{'input': true, 'is-danger': errors.has('payment_date')}" name="payment_date" v-validate.initial="'required|date_format:DD/MM/YYYY'" :raw="false"  :disabled="onSubmit"></cleave>
                        <span class="help is-danger" v-show="errors.firstByRule('payment_date', 'required')">
                            Ngày không được để trống.
                        </span>   
                        <span class="help is-danger" v-show="errors.firstByRule('payment_date', 'date_format')">
                            Ngày không hợp lệ. Nhập ngày theo dạng DD/MM/YYYY
                        </span>        
                    </div>
                </div>
                <div class="field">
                    <label for="payment_content">Nội dung</label>
                    <div class="control">
                        <input type="input" v-model="payment.content"  name="payment_content" :class="{'input': true, 'is-danger': errors.has('payment_content')}"  :disabled="onSubmit">
                        <span class="help is-danger" v-if="errors.has('payment_content')">Xin nhập lý do thanh toán</span>
                    </div>
                </div>
                <div class="field">
                    <label for="payment_amount">Số tiền</label>
                    <div class="control">
                        <cleave v-model="payment.amount" :options="cleave.price" :class="{'input': true, 'is-danger': errors.has('payment_amount')}" name="payment_amount" placeholder="Số tiền" v-validate.initial="'required'" @focus="$event.target.select()"  :disabled="onSubmit"></cleave>
                        <span class="help is-danger" v-if="errors.has('payment_amount')">Xin nhập số tiền</span>
                    </div>
                </div>
                <div class="field">
                    <label for="reason">Lý do sửa:</label>
                    <div class="control">
                        <textarea name="reason" v-model="edit_reason" :class="{'textarea': true, 'is-danger': errors.has('reason')}" placeholder="Nhập lý do (bắt buộc)" v-validate.initial="'required'"></textarea>
                    </div>
                </div>
                <hr />
                <div class="field has-text-centered">
                    <button class="button is-primary" @click="submitPayment" :disabled="onSubmit">Sửa thanh toán</button>
                    <button class="button is-danger" @click="$router.push({name: 'payment.show'})" :disabled="onSubmit">Hủy</button>
                </div>
            </div>
        </div>  
    </content-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            user: `currentUser`,
            cleave: `cleaveOptions`,
            invoice: `routeInvoice`,
        }),
    },
    data: () => ({
        payment: false,
        original_payment: false,
        edit_reason: ``,
        onSubmit: false,
    }),
    methods: {
        submitPayment () {
            if (this.errors.any() || this.onSubmit) {
                return false
            } else {
                this.onSubmit = true
                const data = {
                    name: this.payment.name,
                    method: this.payment.method,
                    paid_on: this.toISODate(this.payment.paid_on),
                    content: this.payment.content,
                    amount: this.payment.amount,
                    reason: this.edit_reason,
                    id: this.payment.id,
                }
                this.$store.dispatch(`editPayment`, data).then(result => {
                    this.$router.push({
                        name: `invoice.show`,
                        params: {
                            invoice_id: this.invoice.id,
                        },
                    })
                })
            }
        },
    },
    created () {
        this.payment = Object.assign({}, this.$store.getters.routePayment)
    },
}
</script>

<style>

</style>
