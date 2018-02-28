<template>
    <transition name="slide-fade">
        <div class="work_report--container" v-if="work">
            <hero-header :page="pageMeta">
                <div class="hero-foot" slot="footer"> 
                    <nav class="tabs  is-boxed">
                        <div class="container">
                            <ul>
                                <li class="is-active"><a>Báo cáo</a></li>
                                <li><router-link :to="{'name': 'work.show', 'params': {'work_id': work.id}}"> Về công trình</router-link></li>
                                <li><a @click="$refs.fullscreen.enter()">Xem toàn màn hình</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>    
            </hero-header>
            <section class="section">
                <fullscreen :fullscreen.sync="fullscreen" ref="fullscreen">
                    <div :class="{'container': !fullscreen, 'fullscreen-container': fullscreen} ">

                        <div class="content">
                            <p class="title is-3 has-text-info">Báo cáo vật tư công trình {{work.name}}</p>
                            <div class="report">
                                <div class="top">
                                    <table class="table is-expanded is-striped is-hoverable is-bordered has-text-small has-text-centered-cell" v-if="materials">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th class="has-text-left">Tên</th>
                                                <th>Đơn vị</th>
                                                <th>Loại tiền</th>
                                                <th>Số đơn hàng</th>
                                                <th>Tổng tiền hàng</th>
                                                <th>Số lượng BOQ</th>
                                                <th>Giá trị BOQ</th>
                                                <th>Số lượng đã nhận</th>
                                                <th>Đã thanh toán</th>
                                                <th>Số lượng chưa thực hiện</th>
                                                <th>Giá trị chưa thực hiện</th>
                                                <th>% chưa thực hiện</th>
                                            </tr>
                                        </thead>    
                                        <tbody> <!--
                                            <template v-for="(material, index) in materials">
                                               
                                                <tr :key="key" @click="showMaterialDetail(row.id)" :class="{'material': row.type === 'material'}">
                                                    <td class="index-col">{{row.index}}</td>
                                                    <td class="">{{row.name}}</td>
                                                    <td class="per-col child-col">{{row.per}}</td>
                                                    <td class="currency-col child-col">{{row.currency}}</td>
                                                    <td class="invoice_count-col child-col">{{row.invoice_count}}</td>
                                                    <td class="total_unit-col child-col">{{row.total_unit}}</td>
                                                    <td class="total_price-col child-col">{{$comma(row.total_sum)}}</td>
                                                    <td class="boq_unit-col child-col">{{row.boq_unit}}</td>
                                                    <td class="boq_unit-col child-col">{{row.received_unit}}</td>
                                                    <td class="boq_total-col child-col">{{$comma(row.boq_price * row.boq_unit)}}</td>
                                                    <td class="real_unit-col child-col">{{ row.boq_unit - row.total_unit}}</td>
                                                    <td class="real_count-col child-col">{{$comma((row.boq_unit - row.total_unit)*row.boq_price)}}</td>
                                                    <td class="percent-col child-col">{{ parseFloat((row.boq_unit - row.total_unit)/row.boq_unit * 100).toFixed(2) }} %</td>
                                                </tr>                            
                                            </template>
                                            -->
                                            <tr v-for="(material, index) in materials" :key="index" :class="`depth-${material.depth}`">
                                                <td><b>{{index + 1}}</b></td>
                                                <td class="has-text-left depth-padding">{{material.name}}</td>
                                                <td>{{material.per}}</td>
                                                <td>{{material.currency}}</td>
                                                <td><span v-if="material.invoice_count > 0">{{material.invoice_count}}</span></td>
                                                <td class="has-text-right"><span v-if="material.total > 0">{{comma(material.total)}}</span></td>
                                                <td><span v-if="material.boqs">{{material.boqs.unit}}</span></td>
                                                <td class="has-text-right"><span v-if="material.sum_boqs > 0">{{comma(material.sum_boqs)}}</span></td>
                                                <td><span v-if="material.received_unit > 0">{{material.received_unit}}</span></td>
                                                <td><span v-if="material.received_unit > 0 && material.boqs">{{material.boqs.unit}}</span></td>
                                            </tr>
                                        </tbody> 
                                        <tfoot>
                                            <tr>
                                                <td colspan="4">Tổng cộng</td>
                                                <td colspan="1">{{work.invoice_count}}</td>
                                                
                                            </tr>
                                        </tfoot>

                                    </table>
                                </div>
                                <div class="bottom" v-if="material">
                                    <br>
                                    
                                    <h4 class="text-center">{{material.name}}</h4>
                                    <table class="table material-detail">
                                        <thead class="thead-light text-center">
                                            <tr>
                                                <th rowspan="2">STT</th>
                                                <th rowspan="2">Ngày lập đơn</th>
                                                <th rowspan="2">Ngày giao hàng</th>
                                                <th rowspan="2">Đơn hàng <br> Nhà cung cấp</th>
                                                <th colspan="3">Số lượng</th>
                                                <th colspan="4">Giá trị</th>
                                                <th rowspan="2">Ghi chú</th>
                                            </tr>

                                            <tr>
                                                <th>Số lượng đặt</th>
                                                <th>Số lượng đã nhận</th>
                                                <th>Số lượng còn lại</th>
                                                <th>Đơn giá</th>
                                                <th>Đơn giá BOQ</th>
                                                <th>Giá trị đặt hàng</th>
                                                <th>Giá trị đã nhận</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody class="text-center">
                                            <tr v-for="(tracker, index) in material.invoice_trackers" :key="index">
                                                <td>{{(index + 1)}}</td>
                                                <td>{{tracker.invoice.signed_at}}</td>
                                                <td>{{tracker.received_at}}</td>
                                                <td>{{tracker.invoice.name}} <br> <small>{{tracker.invoice.provider.name}}</small></td>
                                                <td>{{tracker.unit}}</td>
                                                <td>{{tracker.received_unit}}</td>
                                                <td>{{tracker.unreceive}}</td>
                                                <td>{{$comma(tracker.cost)}}</td>
                                                <td>{{$comma(material.boq_price)}}</td>
                                                <td>{{$comma(tracker.sum)}}</td>
                                                <td>{{$comma(tracker.unreceive_sum)}}
                                                <td>{{tracker.note}}</td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td colspan="4" class="tfoot-title">Tổng cộng</td>
                                                <td class="tfoot-content" colspan="3">{{material.total_unit}}</td>
                                                <td class="tfoot-content" colspan="4">{{$comma(material.total_sum)}}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" class="tfoot-title">BOQ</td>
                                                <td class="tfoot-content" colspan="3">{{material.boq_unit}}</td>
                                                <td class="tfoot-content" colspan="4">{{$comma(material.boq_price*material.boq_unit)}}</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colspan="4" class="tfoot-title">Chênh lệch</td>
                                                <td class="tfoot-content" colspan="3">{{material.boq_unit - material.total_unit}}</td>
                                                <td class="tfoot-content" colspan="4">{{$comma((material.boq_price * material.boq_unit) - material.total_sum)}}</td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </fullscreen>
            </section>

        </div>
    </transition>


</template>

<script>
import Fullscreen from "vue-fullscreen/src/component.vue";
import {mapGetters} from "vuex";
export default {
    data() {
        return {
            fullscreen: false,
            detailedWork: [],
            material: false,
        }
    },
    computed: {
        work() {
            return this.$store.getters['work/work'](parseInt(this.$route.params.work_id));
        },
        pageMeta() {
            return {
                'title': (this.work) ? `Báo cáo công trình ${this.work.name}` : "Báo cáo",
                'description': (this.work) ? this.work.description : "",
            }
        },
        materials() {
            const materials = this.$store.getters["material/materials"];
            return materials.map( material => {
                const boqs = this.boqsForMaterial(material.id);
                return Object.assign({}, material, {
                    'boqs': (boqs.length > 0) ? boqs[0] : false,
                    'sum_boqs': (boqs.length > 0) ? this.sum(boqs) : 0,

                });
            })
            
        },
        ...mapGetters("provider", [
            "providers"
        ]),
    },
    methods: {
        guard() {
            this.$store.dispatch("material/getTree", {'work_id': parseInt(this.$route.params.work_id)});
        },
        showMaterialDetail(material_id) {
            axios.get(`${this.$store.state.apiBase}/material/${material_id}`).then(result => {
                this.material = result.data.data;
            });
        },
        boqsForMaterial(material_id) {
            return this.$store.getters["boq/boqsForMaterial"](material_id);
        },
        sum(data) {

            if (data instanceof Array) {
                if (data.length > 1) {
                    return data.reduce( (sum, node) => sum + node.total);
                } else if (data.length === 1) {
                    
                    return data[0].total;
                }
            } 
            return 0;
        }
    },
    components: {Fullscreen},

}
</script>

<style>

</style>
