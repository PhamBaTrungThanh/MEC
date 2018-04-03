<template>
    <transition name="slide-up" appear>
        <div class="work_report--container" ref="container">
            <div class="work_report-content">
                <p class="title is-3 has-text-info has-text-centered">Báo cáo vật tư công trình {{work.name}}</p>
                <div :class="{'report': true, 'cascade': cascadePanel, 'columns': true}">
                    <div :class="{'left-panel': true, 'column': true, 'is-three-fifths': cascadePanel}">
                        <table class="table is-fullwidth is-striped is-hoverable is-bordered has-text-small has-text-centered-cell" v-if="materials">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th class="has-text-left">Tên</th>
                                    <th v-show="!cascadePanel">Đơn vị</th>
                                    <th v-show="!cascadePanel">Loại tiền</th>
                                    <th v-show="!cascadePanel">Số đơn hàng</th>
                                    <th>Tổng tiền hàng</th>
                                    <th>Số lượng BOQ</th>
                                    <th>Giá trị BOQ</th>
                                    <th v-show="!cascadePanel">Số lượng đã nhận</th>
                                    <th v-show="!cascadePanel">Số lượng chưa thực hiện</th>
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
                                        <td class="total_price-col child-col">{{comma(row.total_sum)}}</td>
                                        <td class="boq_unit-col child-col">{{row.boq_unit}}</td>
                                        <td class="boq_unit-col child-col">{{row.received_unit}}</td>
                                        <td class="boq_total-col child-col">{{comma(row.boq_price * row.boq_unit)}}</td>
                                        <td class="real_unit-col child-col">{{ row.boq_unit - row.total_unit}}</td>
                                        <td class="real_count-col child-col">{{comma((row.boq_unit - row.total_unit)*row.boq_price)}}</td>
                                        <td class="percent-col child-col">{{ parseFloat((row.boq_unit - row.total_unit)/row.boq_unit * 100).toFixed(2) }} %</td>
                                    </tr>                            
                                </template>
                                -->
                                <tr v-for="(material, index) in materials" :key="index" :class="`depth-${material.depth} ${(selectedId === material.id) ? 'is-selected' : ''}`" @click="showMaterial(material.id)">
                                    <td><b>{{index + 1}}</b></td>
                                    <td class="has-text-left depth-padding">
                                        <span class="icon">
                                            <i class="mdi mdi-chevron-down" v-if="material.has_children"></i>
                                            
                                        </span>
                                        <span>{{material.name}}</span></td>
                                    <td v-show="!cascadePanel">{{material.per}}</td>
                                    <td v-show="!cascadePanel">{{material.currency}}</td>
                                    <td v-show="!cascadePanel"><span v-if="material.invoice_count > 0">{{material.invoice_count}}</span></td>
                                    <td class="has-text-right"><span v-if="material.total > 0">{{comma(material.total)}}</span></td>
                                    <td><span v-if="material.boqs">{{material.boqs.unit}}</span></td>
                                    <td class="has-text-right"><span v-if="material.sum_boqs > 0">{{comma(material.sum_boqs)}}</span></td>
                                    <td v-show="!cascadePanel"><span v-if="material.received_unit > 0">{{material.received_unit}}</span></td>
                                    <td v-show="!cascadePanel"><span v-if="material.received_unit > 0 && material.boqs">{{material.boqs.unit - material.received_unit}}</span></td>
                                    <td><span v-if="material.received_unit > 0 && material.boqs">{{((material.boqs.unit - material.received_unit) / material.boqs.unit * 100).toFixed(2)}} %</span></td>
                                </tr>
                            </tbody> 
                            <tfoot>
                                <tr>
                                    <td :colspan="(cascadePanel) ? 3 : 4">Tổng cộng</td>
                                    <td :colspan="(cascadePanel) ? 1 : 2">{{comma(sumMaterials.total)}}</td>
                                    <td :colspan="(cascadePanel) ? 1 : 2">{{comma(sumMaterials.boq)}}</td>
                                    <td :colspan="(cascadePanel) ? 1 : 3"></td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>
                    <div class="right-panel column is-two-fifths" v-show="cascadePanel">
                        <div class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <a class="delete" @click="closeDetail"></a>
                                </div>
                            </div>
                            <div class="level-item">
                                <p class="has-text-centered is-4 title has-text-danger">{{material.name}}</p>
                            </div>
                        </div>
                        <hr />
                        <div class="tables">
                            <table v-for="tracker in trackers" :key="tracker.id" class="table material-detail is-striped is-hoverable is-bordered has-text-small">
                                <tbody>
                                    <tr class="header">
                                        <td colspan="2">
                                            <p class="has-text-centered title is-5 is-spaced">{{tracker.invoice.name}}</p>
                                            <p class="has-text-centered subtitle is-7">{{tracker.invoice.uid}}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ngày lập đơn</td>
                                        <td>{{tracker.invoice.signed_at}}</td>
                                    </tr>
                                    <tr>
                                        <td>Nhà cung cấp</td>
                                        <td>{{provider(tracker.invoice.provider_id).name}}</td>
                                    </tr>
                                    <tr>
                                        <td>Người mua</td>
                                        <td>{{user(tracker.buyer_id).name}}</td>
                                    </tr>
                                    <tr>
                                        <td>Số lượng</td>
                                        <td>{{tracker.unit}}</td>
                                    </tr>
                                    <tr>
                                        <td>Đơn giá</td>
                                        <td><p v-if="tracker.cost > 0">{{comma(tracker.cost)}} {{material.currency}}</p></td>
                                    </tr>
                                    <tr>
                                        <td>Đã nhận</td>
                                        <td>{{tracker.received_unit}}</td>
                                    </tr>
                                    <tr>
                                        <td>Giá trị</td>
                                        <td>{{comma(tracker.total)}}</td>
                                    </tr>
                                    <tr>
                                        <td>Ghi chú</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <table class="table material-detail is-striped is-hoverable is-bordered has-text-small has-text-centered-cell" v-show="false">
                            <thead>
                                <tr>
                                    <th rowspan="2">STT</th>
                                    <th rowspan="2">Ngày lập đơn</th>
                                    <th rowspan="2">Ngày giao hàng</th>
                                    <th rowspan="2">Đơn hàng <br> Nhà cung cấp</th>
                                    <th colspan="3">Số lượng</th>
                                    <th colspan="4">Giá trị</th>
                                    <th rowspan="2">Ghi chú</th>
                                </tr>                                
                            </thead>
                        </table>
                        <table class="table material-detail" v-show="false">
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
                                    <td>{{comma(tracker.cost)}}</td>
                                    <td>{{comma(material.boq_price)}}</td>
                                    <td>{{comma(tracker.sum)}}</td>
                                    <td>{{comma(tracker.unreceive_sum)}}
                                    <td>{{tracker.note}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4" class="tfoot-title">Tổng cộng</td>
                                    <td class="tfoot-content" colspan="3">{{material.total_unit}}</td>
                                    <td class="tfoot-content" colspan="4">{{comma(material.total_sum)}}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="tfoot-title">BOQ</td>
                                    <td class="tfoot-content" colspan="3">{{material.boq_unit}}</td>
                                    <td class="tfoot-content" colspan="4">{{comma(material.boq_price*material.boq_unit)}}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="tfoot-title">Chênh lệch</td>
                                    <td class="tfoot-content" colspan="3">{{material.boq_unit - material.total_unit}}</td>
                                    <td class="tfoot-content" colspan="4">{{comma((material.boq_price * material.boq_unit) - material.total_sum)}}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    data () {
        return {
            detailedWork: [],
            material: false,
            trackers: [],
            cascadePanel: false,
            selectedId: 0,
        }
    },
    computed: {
        work () {
            return this.$store.getters.work
        },
        materials () {
            const materials = this.$store.getters.materialsInWork
            return materials.map(material => {
                const boqs = this.boqs(material.id)
                return Object.assign({}, material, {
                    boqs: (boqs.length > 0) ? boqs[0] : false,
                    sum_boqs: (boqs.length > 0) ? this.sum(boqs) : 0,
                })
            })
        },
        sumMaterials () {
            if (this.materials) {
                return this.materials.reduce((sum, material) => {
                    sum.total += parseFloat(material.total)
                    sum.boq += parseFloat(material.sum_boqs)
                    return sum
                }, {total: 0, boq: 0})
            }
        },
        ...mapGetters({
            providers: `allProviders`,
            boqs: `relatedBoqsInMaterial`,
        }),
    },
    methods: {
        showMaterial (materialId) {
            this.cascadePanel = true
            const data = this.$store.getters.detailedMaterial(materialId)
            this.material = data.data
            this.trackers = data.trackers
            this.selectedId = this.material.id
        },
        closeDetail () {
            this.cascadePanel = false
            this.material = false
            this.trackers = false
        },
        sum (data) {
            if (data instanceof Array) {
                if (data.length > 1) {
                    return data.reduce((sum, node) => sum + node.total)
                } else if (data.length === 1) {
                    return data[0].total
                }
            }
        },
        provider (id) {
            return this.$store.getters.providerById(id)
        },
        user (id) {
            return this.$store.getters.userById(id)
        },
    },
}
</script>

<style lang="scss">
    .work_report--container {
        position: absolute;
        top: 2rem;
        left: 11px;
        right: 11px;
        bottom: 0;
        .work_report-content {
            display: flex;
            flex-direction: column;
            height: calc(100% - 12px);
            
        }
        .report {
            border-top: 1px solid #eee;
            margin-top: 1rem;
        }
        .table.material-detail {
            width: 100%;
            tr:not(.header) > td:first-child {
                width: 200px;
            }
        }
    
        .left-panel {
            overflow-y: auto;
        }
        .right-panel {
            overflow-y: auto;
            padding: 1rem;
            box-shadow: inset 4px 0px 12px -8px rgba(0,0,0,0.39);
        }
        .report.cascade .left-panel {
            padding-right: 8px;
        }
    }
</style>
