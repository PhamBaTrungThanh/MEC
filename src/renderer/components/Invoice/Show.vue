<template>
    <transition name="slide-fade">
        <div class="invoice_show--wrapper"  v-if="invoice" >
            <hero-header :page="page" />
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs">
                        <router-link :to="{'name': 'work.show', 'params': {'id': invoice.work_id}}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-chevron-left"></i>
                            </span>
                            <span>Trở về công trình</span>
                        </router-link>
                        <a class="navbar-item is-tab" href="#general"> 
                            Thông tin chung
                        </a>
                        <a class="navbar-item is-tab">
                            Thanh toán
                        </a>
                        <a class="navbar-item is-tab">
                            Nhận hàng
                        </a>
                        <a class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-delete has-text-danger"></i>
                            </span>
                            <span class="has-text-danger" @click="deleteInvoice">Xóa đơn hàng</span>
                        </a>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="content">
                    <div class="container">
                        <a name="general"></a>
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
                        <a name="payments"></a>
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
                                                <router-link :to="{'name': 'payment.create', 'query': {'index': payments.length + 1}}" class="button is-link" v-if="user.can_add_payment">
                                                    <span class="icon">
                                                        <i class="mdi mdi-credit-card-plus"></i>
                                                    </span>
                                                    <span>Thêm thanh toán</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </nav>
                                    
                                    <table class="table is-striped is-hoverable" v-if="payments">
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
                                                <td><router-link :to="{'name': 'payment.show', 'params': {'payment_id': payment.id}}">{{payment.name}}</router-link></td>
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
                                                <td colspan="3">{{comma(invoice.total * 1.1 - sum_payment)}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <a name="receives"></a>
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
                                                <router-link :to="{'name': 'receive.create'}" class="button is-link">
                                                    <span class="icon">
                                                        <i class="mdi mdi-package-down"></i>
                                                    </span>
                                                    <span>Nhận hàng</span>
                                                </router-link>
                                            </div>
                                        </div>
                                    </nav>
                                    
                                    <table class="table is-striped is-hoverable">
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
                </div>
            </section>
        </div>
    </transition>
</template>

<script>

import { chartColors, ChartJs, monetize } from "./../../bootstrap";
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        'chartRefs': {
            'payments': false,
            'receives': false,
        }
    }),
    computed: {
        ...mapGetters('user',[
            'user',
        ]),
        invoice() {
            return this.$store.getters["invoice/invoice"](parseInt(this.$route.params.invoice_id));
        },
        payments() {
            return this.$store.getters["payment/paymentsForInvoice"](parseInt(this.$route.params.invoice_id));;
        },
        receives() {
            return this.$store.getters["receive/receivesForInvoice"](parseInt(this.$route.params.invoice_id));;
        },     
        receivesMap() {
            let list = [];
            for (let i = this.trackers.length - 1; i >= 0 ; i--) {
                list[i] = [];
                for (let j = this.receives.length - 1; j >= 0; j--) {
                    
                    for (let k = this.receives[j].units.length - 1; k >= 0; k--) {
                        if (this.receives[j].units[k].tracker_id === this.trackers[i].id) {
                            list[i][j] = this.receives[j].units[k].unit;
                        }
                    }
                }
                
            }
            return list;
        },
        paymentsChartData() {
            if (this.payments.length > 0 && this.invoice && this.chartRefs.payments) {
                let $_data = [];
                let $_labels = [];
                let $_moneized_data = [];
                let sum = 0;

                let total = Math.floor(this.invoice.total * 1.1);
                this.payments.forEach(payment => {
                    $_labels.push(payment.name);
                    $_data.push(Math.floor(payment.amount));
                    $_moneized_data.push(this.comma(payment.amount));
                    sum += Math.floor(payment.amount);
                });
                $_labels.push("Chưa thanh toán");
                if ( (total - sum) !== 0) {
                    $_data.push(total-sum);
                    $_moneized_data.push(this.comma(total-sum));
                }

                return {
                    'labels': $_labels,
                    'data': $_data,
                    'real': $_moneized_data,
                    'total': total,
                };
            }
            return false;
        },
        trackers() {
            return this.$store.getters["tracker/trackersForInvoice"](parseInt(this.$route.params.invoice_id));
        },
        page() {
            return {
                title: (this.invoice) ? `Đơn hàng ${this.invoice.name}` : "Đơn hàng",
                description: (this.work) ? `Công trình ${this.work.name}` : "Công trình",
            }
        },
        
        sum_payment() {
            if (this.payments) {
                return this.payments.reduce( (sum, p) => sum + parseFloat(p.amount), 0);
            }
            else {
                return 0;
            }
        },
        
    },
    asyncComputed: {
        /*
        work: {
            lazy: true,
            default: false,
            get() {
                return this.$store.dispatch("getWork", {'work_id': this.invoice.work_id});
            },   
        },
        payments: {
            lazy: true,
            default: [],
            get() {
                return this.$store.dispatch("getRelatedPayments", {'invoice_id': this.invoice.id, 'expect': this.invoice.payments_count}).then( result => {
                    this.initializePaymentsChart(result);
                    return result;
                });
            }
        },
        trackers: {
            lazy: true, 
            default: [],
            get() {
                return this.$store.dispatch("getRelatedTrackers", {'invoice_id': this.invoice.id, 'expect': this.invoice.trackers_count});
            }
        },
        materials: {
            lazy: true,
            default: [],
            get() {
                return this.$store.dispatch("guaranteeMaterials", {'material_ids': this.trackers.map( t => t.material_id)});
            }
        }
        */
    }, 
    directives: {
        'payments-chart': {
            inserted(el, binding, vnode) {
                vnode.context.initializePaymentsChart(el);
            },
            update(el, binding, vnode) {
                if (JSON.stringify(binding.oldValue) !== JSON.stringify(binding.value)) {
                    vnode.context.updatePaymentsChart(binding.value);
                }
            }
        },
        'receives-chart': {
            inserted(el, binding, vnode) {
                vnode.context.initializeReceivesChart(el);
            },

        },        
    },
    methods: {
        material(id) {
            return this.$store.getters["material/material"](id);
        },

        guard() {
            this.$store.dispatch("invoice/getSingleInvoiceInstance", {'invoice_id': parseInt(this.$route.params.invoice_id)});
            this.$store.dispatch("invoice/getRelatedPayments", {'invoice_id': parseInt(this.$route.params.invoice_id)});
            this.$store.dispatch("invoice/getRelatedTrackers", {'invoice_id': parseInt(this.$route.params.invoice_id)});
            this.$store.dispatch("invoice/getRelatedReceives", {'invoice_id': parseInt(this.$route.params.invoice_id)});
            this.$store.dispatch("invoice/getRelatedWork", {'work_id': parseInt(this.$route.params.work_id)});
        },
        deleteInvoice() {
            const invoice_id = parseInt(this.$route.params.invoice_id);
            this.swal({
                'title': "Xác nhận xóa",
                'text': "Thao tác này sẽ không thể khôi phục",
                'type': "error",
            }).then( result => {
                if (result) {
                    this.$store.dispatch("invoice/delete", {invoice_id}).then( response => {
                        this.$router.push({
                            'name': "work.show",
                            'params': {
                                'work_id': this.$route.params.work_id,
                            }
                        });
                    });       
                }
            });
        },
        updatePaymentsChart(value) {
                this.chartRefs.payments.data.labels = value.labels;
                this.chartRefs.payments.data.datasets[0].data = value.data;
                this.chartRefs.payments.data.datasets[0].real = value.real;
                this.chartRefs.payments.data.datasets[0].total = value.total;
                this.chartRefs.payments.update();
        },
        initializePaymentsChart(element) {
            this.chartRefs.payments = new ChartJs(element.getContext("2d"), {
                'type': "doughnut",
                'options': {
                    'title': {
                        'display': true,
                        'text': "Biểu đồ thanh toán"
                    },
                    'cutoutPercentage': 60,
                    'legend': {
                        'position': 'right',
                    },
                    'tooltips': {
                        'callbacks': {
                            'label': (tooltipItem, data) => {
                                
                                //return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                                return `${data.labels[tooltipItem.index]}: ${parseFloat(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] / data.datasets[tooltipItem.datasetIndex].total * 100).toFixed(2)}%`;
                            },
                            'footer': function (tooltipItems, data)  {
                                let item = tooltipItems[0];
                                return "Số tiền: " + data.datasets[item.datasetIndex].real[item.index];
                            }
                        }
                    }
                },
                'data': {
                    /*'labels': $_labels,*/
                    'datasets': [{
                        'label': "Thanh toán",
                        /*'data': $_data,*/
                        'backgroundColor': [
                            chartColors.red,
                            chartColors.blue,
                            chartColors.green,
                            chartColors.yellow,
                            chartColors.orange,
                            chartColors.purple,
                        ],
                        /*'real': $_moneized_data,*/
                    }],
                }
            });  
        },
        initializeReceivesChart(element) {
            this.chartRefs.receives = new ChartJs(element.getContext("2d"), {
                'type': "line",
                'options': {
                    'title': {
                        'display': true,
                        'text': "Biểu đồ nhận hàng"
                    },
                    'legend': {
                        'position': 'top',
                    },

                },
                'data': {
                    'datasets': [{
                        'label': "Mặt hàng",
                        'backgroundColor': [
                            chartColors.red,
                            chartColors.blue,
                            chartColors.green,
                            chartColors.yellow,
                            chartColors.orange,
                            chartColors.purple,
                        ],
                    }],
                }
            });  
        }
    },

}
</script>
