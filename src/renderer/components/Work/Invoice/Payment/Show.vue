<template>
    <transition name="zoom-in">
        <div class="payment_show--wrapper container is-fluid" v-if="payment.isFull">        
            <div class="level">
                <div class="level-left">
                    <div class="level-item">
                        <p class="title">
                            {{payment.name}}
                        </p>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <router-link class="button is-link" :to="{name: 'payment.edit'}">
                            <span class="icon">
                                <i class="mdi mdi-pencil"></i>
                            </span>
                            <span>Sửa thanh toán</span>
                        </router-link>
                    </div>
                </div>
            </div>

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
                            <router-link tag="button" class="button is-danger" :to="{name: 'payment.delete'}">
                                <span class="icon">
                                    <span class="mdi mdi-delete"></span>
                                </span>
                                <span class="">Xóa thanh toán</span>
                            </router-link>
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
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: `payment-show`,
    computed: {
        ...mapGetters({
            user: `currentUser`,
            invoice: `routeInvoice`,
        }),
        payment () {
            if (this.$store.getters.routePayment) {
                if (!this.$store.getters.routePayment.isFull) {
                    this.$store.dispatch(`getPayment`, this.$store.getters.routePayment.id)
                }
            }
            return this.$store.getters.routePayment
        },
    },
}
</script>

<style>

</style>
