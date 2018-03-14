<template>
    <content-sidebar v-scroll-spy="{selector: '.scroll-spy-holder', linksSelector: '.scroll-spy-links a'}">
        <aside class="menu" slot="sidebar">
            <p class="menu-label">Thanh toán</p>
            <ul class="menu-list scroll-spy-links">
                <li>
                    <a>Thông tin chung</a>
                </li>
                <li>
                    <a>Chi tiết</a>
                </li>
                <li>
                    <a>Mặt hàng</a>
                </li>
            </ul>
            <p class="menu-label">Tùy chọn</p>
            <ul class="menu-list">
                <li>
                    <a class="has-text-success" @click="submitReceive">Tạo mới</a>
                </li>
                <li>
                    <a class="has-text-danger" @click="$router.push({name: 'invoice.show', params: {invoice_id: invoice.id}})">Hủy</a>
                </li>
            </ul>            
        </aside>
        <div class="scroll-spy-holder">
            <div class="sector">
                <p class="title is-4">Thông tin chung</p>
                <hr />
                <div class="field is-expanded has-addons">
                    <p class="control">
                        <a class="button is-static">Hóa đơn</a>
                    </p>
                    <p class="control has-icons-left  is-expanded">
                        <input type="text" name="invoice_id" readonly :value="invoice.name" class="input ">
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
            <div class="sector">
                <p class="title is-4">Thông tin chi tiết</p>
                <hr />                
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
            </div>
            <div class="sector">
                <p class="title is-4">Mặt hàng</p>
                <hr />
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
                        <tr v-for="(tracker, index) in trackers" :key="tracker.id" v-if="tracker.unit - tracker.received_unit !== 0">
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
                <div class="field is-grouped is-grouped-centered">
                    <div class="control">
                        <button :class="['button', 'is-success', {'is-loading': onSubmit}]" @click="submitReceive">
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
    </content-sidebar>
</template>

<script>
import ContentSidebar from '@/components/Layouts/ContentSidebar'
import { mapGetters } from 'vuex'
export default {
    name: `create-receive`,
    components: {
        ContentSidebar,
    },
    data () {
        return {
            receive_name: ``,
            received_at: ``,
            content: ``,
            receive_list: [],
            onSubmit: false,
        }
    },
    computed: {
        ...mapGetters({
            user: `currentUser`,
            invoice: `invoice`,
            trackers: `trackersForCurrentInvoice`,
            options: `cleaveOptions`,
            getMaterial: `materialById`,
        }),
    },
    methods: {
        submitReceive () {
            if (this.errors.any()) {
                return false
            } else {
                const list = Object.keys(this.receive_list).map(key => {
                    return {
                        tracker_id: key,
                        value: this.receive_list[key],
                    }
                })
                this.$store.dispatch(`storeReceive`, {
                    name: this.receive_name,
                    received_at: this.received_at,
                    receive_list: list,
                    invoice_id: this.invoice.id,
                }).then(result => {
                    this.swal({
                        title: `Hoàn tất`,
                        text: `Đã lưu dữ liệu`,
                        type: `success`,
                        timer: 3000,
                    }).then(r => {
                        this.$router.push({
                            name: `invoice.show`,
                            params: {
                                invoice_id: this.invoice.id,
                            },
                        })
                    })
                })
            }
        },
    },
}
</script>

