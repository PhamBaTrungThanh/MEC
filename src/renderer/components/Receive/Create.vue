<template>
    <transition name="slide-fade">
        <div class="create_receive---wrapper" v-if="invoice">
            <hero-header :page="pageMeta" />
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
                                        <label for="" class="label">Thông tin biên nhận</label>
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
                                                <input type="input" v-model="receive_name" :class="{'input': true, 'is-danger': errors.has('receive_name')}" v-validate="'required'" name="receive_name" :disabled="onSubmit">
                                            </p>
                                            <p class="help is-danger" v-show="errors.has('receive_name')">Tên không được để trống</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Ngày nhận</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <p class="control">
                                                <cleave :options="options.date" v-model="received_at" :class="{'input': true, 'is-danger': errors.has('received_at')}" name="received_at" v-validate.initial="'required|date_format:DD/MM/YYYY'" :raw="false" :disabled="onSubmit"></cleave>
                                            </p>
                                            <p class="help is-danger" v-show="errors.firstByRule('received_at', 'required')">
                                                Ngày không được để trống.
                                            </p>   
                                            <p class="help is-danger" v-show="errors.firstByRule('received_at', 'date_format')">
                                                Ngày không hợp lệ. Nhập ngày theo dạng DD/MM/YYYY
                                            </p>     
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label for="" class="label">Nhận</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control">
                                                <table class="table is-striped is-bordered is-hoverable">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Tên</th>
                                                            <th>Tổng</th>
                                                            <th>Chưa nhận</th>
                                                            <th>Nhận đợt này</th>
                                                            <th>Còn lại</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody v-if="receive_list">
                                                        <tr v-for="(tracker, index) in trackers" :key="index" v-if="tracker.unit - tracker.received_unit !== 0">
                                                            <td>{{index + 1}}</td>
                                                            <td>{{getMaterial(tracker.material_id).name}}</td>
                                                            <td>{{tracker.unit}}</td>
                                                            <td>{{tracker.unit - tracker.received_unit}}</td>
                                                            <td class="control"><input type="text" class="input has-text-centered" v-model="receive_list[tracker.id]"></td>            
                                                            <td><span v-if="typeof receive_list[tracker.id] === 'undefined'">{{tracker.unit - tracker.received_unit}}</span><span v-else>{{tracker.unit - tracker.received_unit - receive_list[tracker.id]}}</span></td>                                                     
                                                        </tr>
                                                    </tbody>
                                                    <tbody v-else>
                                                        <tr>
                                                            <td colspan="5">
                                                                <p class="subtitle is-5 has-text-centered">Đang tải dữ liệu</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-grouped is-grouped-centered">
                                    <div class="control">
                                        <button :class="['button', 'is-link', {'is-loading': onSubmit}]" @click="submitReceive">
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
import {mapGetters} from 'vuex';
export default {
    data: () => ({
        'receive_name': "",
        'received_at': "",
        'content': "",
        'receive_list': [],
        'onSubmit': false,
        'options': {
            'price': {
                'numeral': true,
                'numeralThousandsGroupStyle': 'thousand'
            },
            'vat': {
                'numeral': true,
            },
            'date': {
                'date': true,
                'datePattern' : ["d", "m", "Y"],                    
            }
        },
    }),
    computed: {
        pageMeta() {
            return {
                'title': "Biên nhận hàng hóa",
                'description': (this.invoice) ? `Đơn hàng: ${this.invoice.name}` : "Đơn hàng",
            }
        },
        user() {
            return this.$store.getters["user/user"];
        },
        trackers() {
            const trackers = this.$store.getters["tracker/trackersForInvoice"](parseInt(this.$route.params.invoice_id));

            return trackers;
        },
        invoice() {
            return this.$store.getters["invoice/invoice"](parseInt(this.$route.params.invoice_id));
        },
    },

    methods: {
        getMaterial(material_id) {
            return this.$store.getters["material/material"](material_id);
        },
        guard() {
            this.$store.dispatch("invoice/getSingleInvoiceInstance", {'invoice_id': parseInt(this.$route.params.invoice_id)});
            this.$store.dispatch("invoice/getRelatedTrackers", {'invoice_id': parseInt(this.$route.params.invoice_id)});
           // this.$store.dispatch("invoice/getRelatedMaterials", {'invoice_id': parseInt(this.$route.params.invoice_id)});
        },
        submitReceive() {
            const list = Object.keys(this.receive_list).map(key => {
                return {
                    'tracker_id': key,
                    'value': this.receive_list[key],
                }
            })
            
            this.$store.dispatch("receive/store", {data: {
                'name': this.receive_name,
                'received_at': this.received_at,
                'receive_list': list,
                'invoice_id': this.$route.params.invoice_id,
            }}).then(result => {

                this.swal({
                    'title': "Hoàn tất",
                    'text': "Đã lưu dữ liệu",
                    'type': "success",
                    'timer': 3000
                }).then(r => {
                    this.$router.push({
                        'to': "invoice.show",
                    });
                })
            
            });
        }
    }
}
</script>

<style>

</style>
