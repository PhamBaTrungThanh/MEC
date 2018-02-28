<template>
    <transition name="slide-fade">
        <div class="payment_show--wrapper" v-if="payment">        
            <hero-header :page="pageMeta" />
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs" v-if="invoice">
                        <router-link :to="{'name': 'invoice.show', 'params': {'invoice_id': invoice.id}}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-chevron-left"></i>
                            </span>
                            <span>Về đơn hàng</span>
                        </router-link>
                        <a class="navbar-item is-tab" @click="deletePayment">
                            <span class="icon">
                                <i class="mdi mdi-delete has-text-danger"></i>
                            </span>
                            <span class="has-text-danger">Xóa thanh toán</span>
                        </a>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <div class="box">
                                <div class="media">
                                    <figure class="media-left">
                                        <span class="icon is-large has-text-success">
                                            <i class="mdi mdi-48px mdi-account-outline"></i>
                                        </span>
                                    </figure>
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="title is-5">{{payment.creator.name}}</p>
                                            <p class="heading">Người tạo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="box">
                                <div class="media">
                                    <figure class="media-left">
                                        <span class="icon is-large has-text-link">
                                            <i class="mdi mdi-48px mdi-calendar"></i>
                                        </span>
                                    </figure>
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="title is-5">{{payment.paid_on}}</p>
                                            <p class="heading">Ngày tạo</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="box">
                                <div class="media">
                                    <figure class="media-left">
                                        <span class="icon is-large has-text-info">
                                            <i class="mdi mdi-48px mdi-currency-usd"></i>
                                        </span>
                                    </figure>
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="title is-5">{{comma(payment.amount)}}</p>
                                            <p class="heading">Số tiền</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="box">
                                <div class="media">
                                    <figure class="media-left">
                                        <span class="icon is-large has-text-success">
                                            <i class="mdi mdi-48px mdi-cash-multiple"></i>
                                        </span>
                                    </figure>
                                    <div class="media-content">
                                        <div class="content">
                                            <p class="title is-5">{{__(payment.method)}}</p>
                                            <p class="heading">Hình thức thanh toán</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns is-stretch">
                        <div class="column">
                            <div class="box" style="height: 100%">
                                <p class="title is-5">Nội dung thanh toán</p>
                                <div class="media">
                                    <figure class="media-left">
                                        <span class="icon is-large has-text-warning">
                                            <i class="mdi mdi-48px mdi-format-page-break"></i>
                                        </span>
                                    </figure>
                                    <div class="media-content">
                                        <p>
                                            {{payment.content}}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="column">
                            <div class="box">
                                <p class="title is-5">Lịch sử</p>
                                <div class="content" v-if="payment.notes">
                                    <table class="table is-striped is-hoverable is-fullwidth">
                                        <tbody>
                                            <tr>
                                                <th style="width: 50px">#</th>
                                                <th style="width: 125px">Ngày sửa</th>
                                                <th style="width: 190px">Người sửa</th>
                                                <th>Nội dung</th>
                                            </tr>
                                            <tr v-for="(note, index) in payment.notes" :key="note.index">
                                                <td>{{(index +1)}}</td>
                                                <td>{{note.created_at}}</td>
                                                <td>{{note.actor_name}}</td>
                                                <td>{{note.content}}</td>
                                            </tr>
                                        </tbody>

                                    </table>
                                </div>                           
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column">
                            <div class="field is-grouped is-grouped-centered">
                                <div class="control">
                                    <button class="button is-danger" @click="deletePayment">
                                        <span class="icon">
                                            <span class="mdi mdi-delete"></span>
                                        </span>
                                        <span class="">Xóa thanh toán</span>
                                    </button>
                                </div>
                                <div class="control">
                                    <router-link class="button is-outlined" :to="{'name': 'invoice.show', 'params': {'invoice_id': invoice.id}}">
                                        <span class="icon">
                                            <span class="mdi mdi-chevron-left"></span>
                                        </span>
                                        <span class="">Quay lại</span>
                                    </router-link>
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
        
    }),
    computed: {
        user() {
            return this.$store.getters["user/user"];
        },
        invoice() {
            return this.$store.getters["invoice/invoice"](parseInt(this.$route.params.invoice_id));
        },
        payment() {
            return this.$store.getters["payment/payment"](parseInt(this.$route.params.payment_id));
        },
        pageMeta() {
            return {
                title: (this.payment) ? `${this.payment.name}` : "",
                description: (this.invoice) ? `Đơn hàng: ${this.invoice.name}` : "Đơn hàng",
            }
        }
    },

    methods: {
        guard() {
            this.$store.dispatch("payment/getSinglePaymentInstance", {payment_id: parseInt(this.$route.params.payment_id)});
            this.$store.dispatch("payment/getRelatedInvoice", {invoice_id: parseInt(this.$route.params.invoice_id)});
        },
        deletePayment() {
            this.swal({
                'title': "Xác nhận xóa!",
                'text': "Bạn có chắc chắc xóa thanh toán này? Hành động này sẽ không thể khôi phục.",
                'type': "error",
                'confirmButtonClass': "button is-danger",
            }).then( result => {
                if (result.value) {
                    this.axios.delete(`payment/${this.payment.id}`).then(response => {
                        this.swal({
                            'title': "Đã xóa",
                            'text': "Thanh toán đã được xóa",
                            'type': "success",
                            'timer': 3000
                        }).then( response => {
                            this.$store.dispatch("removePaymentsById", [this.payment.id]);
                            this.$store.dispatch("updateInvoice", response.data.affected.invoice);
                        });
                    });
                }
            });
        }
    }


}
</script>

<style>

</style>
