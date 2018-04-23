<template>
    <transition name="zoom-in">
        <div class="invoice_show--wrapper container is-fluid" v-if="invoice" >
            <p class="title"><i>Đơn hàng:</i> {{invoice.name}}</p>
            <div class="columns">
                <div class="column">
                    <div class="box">
                        <figure class="image is-2by1 canvas-container">
                            <canvas class="canvas-holder" id="pie_chart_payments" v-payments-chart="paymentsChartData"></canvas>
                        </figure>
                    </div>
                </div>
                <div class="column">
                    <div class="box">
                        <figure class="image is-2by1 canvas-container">
                            <canvas class="canvas-holder" id="pie_chart_receives" v-receives-chart></canvas>
                        </figure>
                    </div>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <div class="box">
                        <nav class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <p class="title is-4">Chi tiết đơn hàng</p>
                                </div>
                            </div>
                            <div class="level-right" v-if="false">
                                <div class="level-item">
                                    <router-link :to="{'name': 'payment.create', 'query': {index: payments.length + 1}}" class="button is-link" v-if="user.can_add_payment">
                                        <span class="icon">
                                            <i class="mdi mdi-credit-card-plus"></i>
                                        </span>
                                        <span>Thêm thanh toán</span>
                                    </router-link>
                                </div>
                            </div>
                        </nav>
                        <div class="content">
                            <p class="subtitle">
                                Nhà cung cấp: <b>{{provider.name}}</b>
                            </p>
                            <!--
                            <p class="subtitle">
                                Người mua hàng: <b>{{$store.getters.userById(invoice.buyer_id).name}}</b>
                            </p>
                            -->
                        </div>          
                        <table class="table is-striped is-hoverable is-fullwidth" v-if="trackers">
                            <tbody>
                                <tr>
                                    <th style="width: 50px">#</th>
                                    <th style="width: 175px">Tên</th>
                                    <th style="width: 110px">Đơn vị</th>
                                    <th style="width: 110px">Loại tiền</th>
                                    <th style="width: 110px">Hãng</th>
                                    <th style="width: 110px">Đơn giá</th>
                                    <th style="width: 110px">VAT</th>
                                    <th style="width: 110px">Thành tiền</th>
                                    <!--
                                    <th style="width: 110px">Số lượng (BOQ)</th>
                                    <th style="width: 110px">Đơn giá (BOQ)</th>
                                    <th style="width: 110px">VAT (BOQ)</th>
                                    <th style="width: 110px">Thành tiền (BOQ)</th>
                                    -->
                                </tr>
                                <tr v-for="(tracker, index) in trackers" :key="index">
                                    <td><b>{{index + 1}}</b></td>
                                    <td>{{tracker.material.name}}</td>
                                    <td>{{tracker.material.per}}</td>
                                    <td>{{tracker.material.currency}}</td>
                                    <td>{{tracker.material.brand}}</td>
                                    <td>{{comma(tracker.cost)}}</td>
                                    <td>{{comma(tracker.vat)}}</td>
                                    <td>{{comma(tracker.total)}}</td>
                                </tr>
                                <tr>
                                    <td colspan="7">
                                        <b>Tổng cộng</b>
                                    </td>
                                    <td>
                                        <b>{{comma(invoice.total)}}</b>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="columns" >
                <div class="column">
                    <div class="box">
                        <nav class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <p class="title is-4">Thanh toán</p>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <router-link :to="{'name': 'payment.create', 'query': {index: payments.length + 1}}" class="button is-link" v-if="user.can_add_payment">
                                        <span class="icon">
                                            <i class="mdi mdi-credit-card-plus"></i>
                                        </span>
                                        <span>Thêm thanh toán</span>
                                    </router-link>
                                </div>
                            </div>
                        </nav>                        
                        <table class="table is-striped is-hoverable is-fullwidth" v-if="payments">
                            <tbody>
                                <tr>
                                    <th style="width: 50px">#</th>
                                    <th style="width: 175px">Tên</th>
                                    <th style="width: 110px">Ngày</th>
                                    <th style="width: 110px">Hình thức</th>
                                    <th>Số tiền</th>
                                    <th>Nội dung</th>
                                    <th>Ghi chú</th>
                                </tr>
                                <tr v-for="(payment, index) in payments" :key="payment.id">
                                    <td><b>{{index + 1}}</b></td>
                                    <td><router-link :to="{name: 'payment.show', params: {payment_id: payment.id, invoice_id: invoice.id}}">{{payment.name}}</router-link></td>
                                    <td>{{payment.paid_on}}</td>
                                    <td>{{__(payment.method)}}</td>
                                    <td>{{comma(payment.amount)}}</td>
                                    <td>{{payment.content}}</td>
                                    <td><span v-if="payment.count_notes > 0">{{payment.count_notes}} ghi chú</span></td>
                                </tr>
                                <tr>
                                    <td colspan="4"><span class="is-size-5">Tổng cộng</span></td>
                                    <td colspan="3">{{comma(sum_payment)}}</td>
                                </tr>
                                <tr>
                                    <td colspan="4"><span class="is-size-5"><b>Chưa thanh toán</b></span></td>
                                    <td colspan="3">{{comma(invoice.total - sum_payment)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <div class="box">
                        <nav class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <p class="title is-4">Nhận hàng</p>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <router-link :to="{name: 'receive.create'}" class="button is-link">
                                        <span class="icon">
                                            <i class="mdi mdi-package-down"></i>
                                        </span>
                                        <span>Nhận hàng</span>
                                    </router-link>
                                </div>
                            </div>
                        </nav>
                        
                        <table class="table is-striped is-hoverable is-fullwidth">
                            <tbody>
                                <tr>
                                    <th style="width: 50px">#</th>
                                    <th style="">Tên</th>
                                    <th style="width: 150px">Số lượng</th>
                                    <template v-for="receive in receives">
                                        <th style="width: 200px" :key="receive.id">
                                            <p class="has-text-centered">
                                                <span>{{receive.name}}</span><br />
                                                <span class="has-text-weight-light">{{receive.received_at}}</span>
                                            </p>
                                        </th>
                                    </template>
                                    <th style="width: 150px">Chưa nhận</th>
                                </tr>
                                <tr v-for="(tracker, index) in trackers" :key="tracker.id">
                                    <td><b>{{index + 1}}</b></td>
                                    <td>{{ material(tracker.material_id).name }}</td>
                                    <td>{{ tracker.unit}} </td>
                                    <td v-for="(receive, re_index) in receives" :key="receive.id" class="has-text-centered">
                                        <span v-if="receivesMap[index][re_index]">{{ receivesMap[index][re_index] }}</span><span v-else>-</span>
                                    </td>
                                    <td>{{ tracker.unreceive }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>

import { helpers } from "@/bootstrap"
import { mapGetters } from 'vuex'
export default {
    name: `invoice-show`,
    data: () => ({
        chartRefs: {
            payments: false,
            receives: false,
        },
    }),
    computed: {
        ...mapGetters({
            user: `currentUser`,
            currentInvoice: `currentInvoice`,
        }),
        invoice () {
            return this.currentInvoice.data
        },
        payments () {
            return this.currentInvoice.payments
        },
        receives () {
            const receives = this.currentInvoice.receives
            if (receives[0] === `loading`) {
                this.$store.dispatch(`getReceiveForInvoice`)
                return []
            }
            return this.currentInvoice.receives
        },
        provider () {
            return this.currentInvoice.provider
        },
        trackers () {
            return this.currentInvoice.trackers
        },
        receivesMap () {
            if (this.receives) {
                let list = []
                for (let i = this.trackers.length - 1; i >= 0; i--) {
                    list[i] = []
                    for (let j = this.receives.length - 1; j >= 0; j--) {
                        for (let k = this.receives[j].units.length - 1; k >= 0; k--) {
                            if (this.receives[j].units[k].tracker_id === this.trackers[i].id) {
                                list[i][j] = this.receives[j].units[k].unit
                            }
                        }
                    }
                }
                return list
            }
        },
        paymentsChartData () {
            if (this.invoice && this.chartRefs.payments) {
                let $Data = []
                let $Labels = []
                let $MoneizedData = []
                let sum = 0
                let total = Math.floor(this.invoice.total)
                this.payments.forEach(payment => {
                    $Labels.push(payment.name)
                    $Data.push(Math.floor(payment.amount))
                    $MoneizedData.push(this.comma(payment.amount))
                    sum += Math.floor(payment.amount)
                })
                $Labels.push(`Chưa thanh toán`)
                if ((total - sum) !== 0) {
                    $Data.push(total - sum)
                    $MoneizedData.push(this.comma(total - sum))
                }
                return {
                    labels: $Labels,
                    data: $Data,
                    real: $MoneizedData,
                    total: total,
                    colors: helpers.colorWheels($Labels.length),
                }
            }
            return false
        },
        sum_payment () {
            if (this.payments) {
                return this.payments.reduce((sum, p) => sum + parseFloat(p.amount), 0)
            } else {
                return 0
            }
        },
    },
    directives: {
        'payments-chart': {
            inserted (el, binding, vnode) {
                vnode.context.initializePaymentsChart(el)
            },
            update (el, binding, vnode) {
                if (JSON.stringify(binding.oldValue) !== JSON.stringify(binding.value)) {
                    vnode.context.updatePaymentsChart(binding.value)
                }
            },
        },
        'receives-chart': {
            inserted (el, binding, vnode) {
                vnode.context.initializeReceivesChart(el)
            },
        },
    },
    methods: {
        material (id) {
            return this.$store.getters.materialById(id)
        },
        deleteInvoice () {
            const invoiceId = parseInt(this.$route.params.invoice_id)
            this.swal({
                title: `Xác nhận xóa`,
                text: `Thao tác này sẽ không thể khôi phục`,
                type: `error`,
            }).then(result => {
                if (result) {
                    this.$store.dispatch(`invoice/delete`, {invoiceId}).then(response => {
                        this.$router.push({
                            name: `work.show`,
                            params: {
                                work_id: this.$route.params.work_id,
                            },
                        })
                    })
                }
            })
        },
        updatePaymentsChart (value) {
            this.chartRefs.payments.data.labels = value.labels
            if (this.chartRefs.payments.data.datasets.length === 0) {
                this.chartRefs.payments.data.datasets.push({})
            }
            this.chartRefs.payments.data.datasets[0].data = value.data
            this.chartRefs.payments.data.datasets[0].real = value.real
            this.chartRefs.payments.data.datasets[0].total = value.total
            this.chartRefs.payments.data.datasets[0].backgroundColor = value.colors
            this.chartRefs.payments.update()
        },
        initializePaymentsChart (element) {
            this.chartRefs.payments = new this.ChartJs(element.getContext(`2d`), {
                type: `doughnut`,
                options: {
                    title: {
                        display: true,
                        text: `Biểu đồ thanh toán`,
                    },
                    cutoutPercentage: 60,
                    legend: {
                        position: `right`,
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                return `${data.labels[tooltipItem.index]}: ${parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / data.datasets[tooltipItem.datasetIndex].total * 100).toFixed(2)}%`
                            },
                            footer: function (tooltipItems, data) {
                                let item = tooltipItems[0]
                                return `Số tiền: ${data.datasets[item.datasetIndex].real[item.index]}`
                            },
                        },
                    },
                    data: {
                        datasets: [{
                            label: `Thanh toán`,
                            backgroundColor: [
                            ],
                        }],
                    },
                },
            })
        },
        initializeReceivesChart (element) {
            this.chartRefs.receives = new this.ChartJs(element.getContext(`2d`), {
                type: `line`,
                options: {
                    title: {
                        display: true,
                        text: `Biểu đồ nhận hàng`,
                    },
                    legend: {
                        position: `top`,
                    },
                },
                data: {
                    datasets: [{
                        label: `Mặt hàng`,
                    }],
                },
            })
        },
    },
}
</script>
