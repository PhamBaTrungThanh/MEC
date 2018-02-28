<template>
    <transition v-if="work" name="slide-fade">
        <div class="wrap">
            <hero-header :page="pageMeta" />
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs">
                        <router-link :to="{'name': 'work.index'}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-chevron-left"></i>
                            </span>
                            <span>Quay lại</span>
                        </router-link>
                        <router-link :to="{'name': 'work.report'}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-file-chart has-text-link"></i>
                            </span>
                            <span class="has-text-link">Xem báo cáo</span>
                        </router-link>
                        <router-link :to="{'name': 'invoice.create'}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-library-plus has-text-success"></i>
                            </span>
                            <span class="has-text-success">Thêm đơn hàng</span>
                        </router-link>
                    </div>
                </div>
            </div>
            
            <section class="show_work--container section">
                <article role="work" class="">
                    <div class="container">
                        <h1 class="title">Công trình {{work.name}}</h1>
                        <h3 class="subtitle"><em>Cập nhật lần cuối: </em>{{work.updated_at}}</h3>
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
                </article>               
            </section>
            
        </div>
    </transition>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import * as moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi');
export default {
    data: () => ({
        sortBy: "date",
    }),
    computed: {
        user() {
            return this.$store.getters['user/user'];
        },
        work() {
            return this.$store.getters['work/work'](parseInt(this.$route.params.work_id));
        },
        invoices() {
            return this.sortInvoices(this.$store.getters['invoice/invoicesInWork'](parseInt(this.$route.params.work_id)));
        },
        trackers() {
            return this.$store.getters['tracker/trackersForInvoice'](parseInt(this.$route.params.work_id));
        },
        sum_invoices() {
            return this.invoices.reduce( (sum, invoice) => sum += parseFloat(invoice.total), 0) * 1.1;
        },
        sum_payments() {
            return this.invoices.reduce( (sum, invoice) => sum += parseFloat(invoice.payment_total), 0);
        },
        pageMeta() {
            return {
                'title': `Công trình ${this.work.name}`,
                'description': this.work.description,
                'background': this.work.image_cover,
                'isBigHero': true,
            }
        }
    },
    methods: {
        guard() {
            this.$store.dispatch("work/getWork", {work_id: parseInt(this.$route.params.work_id)});
            this.$store.dispatch("work/getRelatedInvoices", {work_id: parseInt(this.$route.params.work_id)});
        },
        provider(id) {
            return this.$store.getters["provider/provider"](id);
        },
        viewReport() {
            this.$router.push({
                name: "work.report",
            });
        },

        sortInvoices($_invoices) {
            let $_result = $_invoices;

            if (this.sortBy === "date") {
                let mapped = $_invoices.map( (el, i) => {
                    return {'index': i, value: moment(el.signed_at, 'DD-MM-YYYY').unix() }
                });
                mapped.sort( (a, b) => {
                    if (a.value > b.value) {
                        return -1;
                    }
                    if (a.value < b.value) {
                        return 1;
                    }
                    return 0;
                });

                $_result = mapped.map( el => {
                    return $_invoices[el.index];
                });
            }
            return $_result;
        },
    },

}
</script>

<style>

</style>
