<template>
    <div class="invoice_edit---wrapper">
        <div v-if="$route.query.action === 'new_receive'">
            <div class="card">
                <h4 class="card-title text-center">Nhận hàng đợt {{$route.query.index}}</h4>
                <div class="card-body">
                    <div class="payment--container">
                        <div class="form-group">
                            <input type="input" v-model="new_receive.name" class="form-control hide-border">
                        </div>
                         <div class="form-row">
                            <div class="form-group col-6">
                                <label for="receive_date">Ngày nhận</label>
                                <input type="date" v-model="new_receive.receive_at" class="form-control" id="payment_date">
                            </div>
                            <div class="form-group col-6">
                                <label for="receive_note">Ghi chú</label>
                                <input type="input" v-model="new_receive.note" class="form-control" id="payment_note" placeholder="Nhập ghi chú">
                            </div>
                        </div>
                        <div class="row">
                            <h5>Danh mục đơn hàng</h5>
                            <table class="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Tên</th>
                                        <th>Số lượng đặt hàng</th>
                                        <th>Số lượng đã nhận</th>
                                        <th>Nhận đợt này</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(row, index) in tracker_list" :key="index">
                                        <td>{{ (index + 1) }}</td>
                                        <td>{{ row.material.name }}</td>
                                        <td>{{ row.unit }}</td>
                                        <td>{{ row.received_unit }}</td>
                                        <td><input type="text" class="inline-td" v-model="row.value" @focus="$event.target.select()"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br>
                        <div class="form-group text-center">
                            <button class="btn btn-primary" @click="submitReceive">Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            new_receive: {
                name: ``,
                receive_at: ``,
                note: ``,
                type: `new_receive`,
                receive_list: [],
            },
            list: [],
            tracker_list: [],
        }
    },
    methods: {
        submitPayment () {
            this.axios.patch(`${this.$store.state.apiBase}/invoice/${this.$route.params.id}`, this.new_payment).then(response => {
                if (response.status === 200) {
                    this.$router.go(-1)
                }
            })
        },
        submitReceive () {
            this.new_receive.receive_list = this.tracker_list.map(tracker => {
                return {
                    id: tracker.id,
                    value: tracker.value,
                }
            })
            this.axios.patch(`${this.$store.state.apiBase}/invoice/${this.$route.params.id}`, this.new_receive).then(response => {
                if (response.status === 200) {
                    this.$router.go(-1)
                }
            })
        },
    },
    mounted () {
        this.new_payment.name = `Thanh toán lần ${this.$route.query.index}`
        this.new_receive.name = `Nhận hàng đợt ${this.$route.query.index}`
        if (this.$route.query.action === `new_receive`) {
            this.axios.get(`${this.$store.state.apiBase}/invoice/${this.$route.params.id}/edit`, {
                params: {
                    action: `new_receive`,
                },
            }).then(response => {
                this.tracker_list = response.data.trackers.map(tracker => {
                    return Object.assign({}, tracker, {value: 0})
                })
            })
        }
    },

}
</script>

<style>

</style>
