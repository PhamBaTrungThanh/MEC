<template>
    <div class="payment_edit--wrapper">
        <transition v-if="payment">
                
            <div class="card">
                <h4 class="card-header text-center">Sửa thanh toán</h4>
                <div class="card-body">
                    <div class="form-group">
                        <label for="payment_name">Tên</label>
                        <input type="input" v-model="payment.name" :class="{'form-control': true, 'is-invalid': errors.has('payment_name')}" v-validate="'required'" name="payment_name">
                        <span class="invalid-feedback">Xin nhập tên</span>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-12">
                            <label>Hình thức thanh toán</label>
                            <div :class="{'is-invalid': errors.has('payment_method'), 'form-control': errors.has('payment_method')}">
                                <treeselect :options="payment_methods" v-model="payment.method" name="payment_method" v-validate.initial="'required'"></treeselect>
                            </div>
                            <span class="invalid-feedback">Xin chọn hình thức thanh toán</span>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col">
                            <label for="payment_date">Ngày thanh toán</label>
                            <cleave :options="cleave.date" v-model="payment.paid_on" :class="{'form-control': true, 'is-invalid': errors.has('payment_date')}" name="payment_date" v-validate.initial="'required|date_format:DD/MM/YYYY'" :raw="false"></cleave>
                            <span class="invalid-feedback" v-show="errors.firstByRule('payment_date', 'required')">
                                Ngày không được để trống.
                            </span>   
                            <span class="invalid-feedback" v-show="errors.firstByRule('payment_date', 'date_format')">
                                Ngày không hợp lệ. Nhập ngày theo dạng DD/MM/YYYY
                            </span>        
                        </div>
                        <div class="form-group col">
                            <label for="payment_content">Nội dung</label>
                            <input type="input" v-model="payment.content"  name="payment_content" :class="{'form-control': true, 'is-invalid': errors.has('payment_content')}">
                            <span class="invalid-feedback">Xin nhập lý do thanh toán</span>
                        </div>
                        
                        <div class="form-group col">
                            <label for="payment_amount">Số tiền</label>
                            <cleave v-model="payment.amount" :options="cleave.price" :class="{'form-control': true, 'is-invalid': errors.has('payment_amount')}" name="payment_amount" placeholder="Số tiền" v-validate.initial="'required'" @focus="$event.target.select()"></cleave>
                            <span class="invalid-feedback">Xin nhập số tiền</span>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="reason">Lý do sửa:</label>
                        <textarea name="reason" v-model="edit_reason" :class="{'form-control': true, 'is-invalid': errors.has('reason')}" placeholder="Nhập lý do (bắt buộc)" v-validate.initial="'required'"></textarea>
                        
                    </div>
                </div>
                <div class="card-footer text-center">
                    <submit :on-submit="submitPayment" :on-success="success">Sửa thanh toán</submit>
                    <button class="btn" @click="$router.push(-1)">Bỏ qua</button>
                </div>
            </div>
        </transition>
    </div>  
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        },
        cleave() {
            return this.$store.state.cleaveOptions;
        },
        validates() {
            return this.$store.state.veeValidations;
        },
        payment_methods() {
            return this.$store.state.paymentMethods;
        },
    },

    data: () => ({
        "payment": false,
        "original_payment": false,
        "edit_reason": "",
    }),
    methods: {
        submitPayment() {
            if (this.errors.any())
            {
                return false;
            }
            else {
                return {
                    "method": "PATCH",
                    "url": `payment/${this.$route.params.id}`,
                    "data": {
                        "name": this.payment.name,
                        "method": this.payment.method,
                        "paid_on": this.toISODate(this.payment.paid_on),
                        "content": this.payment.content,
                        "amount": this.payment.amount,
                        "reason": this.edit_reason,
                    }
                }
            }
        },
        success() {
            this.$router.push({
                "name": "invoice.show",
                "params": {
                    "id": this.payment.invoice.id,
                }
            });
        }
    },
    created() {
        this.axios.get(`payment/${this.$route.params.id}`).then( response => {
            this.payment = response.data;
        });
    }
}
</script>

<style>

</style>
