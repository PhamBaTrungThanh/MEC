<template>
    <transition name="zoom-in">
        <div v-if="work">           
            <div class="columns">
                <div class="column is-narrow">
                    <figure class="image is-48x48">
                        <img :src="work.image_cover" class="is-full-height" />
                    </figure>
                </div>
                <div class="column">
                    <h1 class="title">Công trình {{work.name}}</h1>
                    <h4 class="subtitle"><em>Cập nhật lần cuối: </em>{{work.updated_at}}</h4>
                </div>
            </div>
            <hr>
            <div class="level">
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Khởi công</p>
                        <p class="title">{{ work.started_at }}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Số đơn hàng</p>
                        <p class="title">{{invoices.length}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Giá trị đơn hàng</p>
                        <p class="title">{{comma(sum_invoices)}}</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Giá trị BOQ</p>
                        <p class="title">0</p>
                    </div>
                </div>
                <div class="level-item has-text-centered">
                    <div>
                        <p class="heading">Đã thanh toán</p>
                        <p class="title">{{comma(sum_payments)}}</p>
                    </div>
                </div>                
            </div>
            <hr>
            <div class="content">
                <h3 class="title">Danh sách đơn hàng</h3>
                <table class="table is-striped is-hoverable">
                    <tbody>
                        <tr>
                            <th style="width: 50px;">#</th>
                            <th style="width: 250px">Tên</th>
                            <th style="width: 125px">Ngày ký</th>
                            <th>Nhà cung cấp</th>
                            <th style="width: 175px">Giá trị đơn hàng</th>
                            <th style="width: 175px">Giá trị thanh toán</th>
                            <th style="width: 100px">Ghi chú</th>
                        </tr>
                        <tr v-for="(invoice, index) in invoices" :key="index" >
                            <td><b>{{index + 1}}</b></td>
                            <td><router-link :to="{'name': 'invoice.show', 'params': {'invoice_id': invoice.id}}">{{invoice.name}}</router-link></td>
                            <td><b>{{invoice.signed_at}}</b></td>
                            <td>{{ provider(invoice.provider_id).name}}</td>
                            <td>{{comma(invoice.total * 1.1)}}</td>
                            <td>{{comma(invoice.payment_total)}}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>          
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data: () => ({
        sortBy: `date`,
    }),
    computed: {
        ...mapGetters({
            user: `currentUser`,
            currentWork: `currentWork`,
        }),
        invoices () {
            return this.currentWork.invoices
        },
        work () {
            return this.currentWork.data
        },
        sum_invoices () {
            return this.invoices.reduce((sum, invoice) => (sum += parseFloat(invoice.total)), 0) * 1.1
        },
        sum_payments () {
            return this.invoices.reduce((sum, invoice) => (sum += parseFloat(invoice.payment_total)), 0)
        },
    },
    methods: {
        provider (id) {
            return this.$store.getters.providerById(id)
        },
        viewReport () {
            this.$router.push({
                name: `work.report`,
            })
        },
    },
}
</script>

<style>

</style>
