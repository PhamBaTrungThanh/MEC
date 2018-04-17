<template>
    <content-sidebar v-scroll-spy="{selector: '.scroll-spy-holder', linksSelector: '.scroll-spy-links a'}">
        <aside class="menu" slot="sidebar">
            <p class="menu-label">Đơn hàng</p>
            <ul class="menu-list scroll-spy-links">
                <li>
                    <a>Thông tin chung</a>
                </li>
                <li>
                    <a>Nhà cung cấp</a>
                </li>
                <li>
                    <a>Danh mục hàng hóa</a>
                </li>
            </ul>
            <p class="menu-label">Tùy chọn</p>
            <ul class="menu-list">
                <li>
                    <a class="has-text-success">Tạo mới</a>
                </li>
                <li>
                    <a class="has-text-danger" @click="$router.push({name: 'work.show', params: {work_id: work.id}})">Hủy</a>
                </li>
            </ul>            
        </aside>
        <div class="scroll-spy-holder">
            <div class="general-info sector">
                <a name="general"></a>
                <p class="title is-4">Thông tin chung</p>
                <hr />
                <div class="field">
                    <label class="label">Tên đơn hàng</label>
                    <div class="control">
                        <input type="text" :class="{'input': true, 'is-danger': errors.has('invoice_name')}" name="invoice_name" v-model="new_invoice.name" v-validate.initial="'required'">
                    </div>
                    <p class="help has-text-danger" v-show="errors.has('invoice_name')">Tên đơn hàng không được để trống.</p>
                </div>
                <div class="field">
                    <label class="label">Loại đơn hàng</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="new_invoice.type">
                                <option value="invoice">Hợp đồng kinh tế / Đơn hàng</option>
                                <option value="contract">Hợp đồng nguyên tắc</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Ngày ký</label>
                    <p class="control">
                        <cleave :options="options.date" v-model="new_invoice.signed_at" :class="{'input': true, 'is-danger': errors.has('invoice_date')}" name="invoice_date" v-validate.initial="'required|date_format:DD/MM/YYYY'" :raw="false" :disabled="onSubmit"></cleave>
                    </p>
                    <p class="help is-danger" v-show="errors.firstByRule('invoice_date', 'required')">
                        Ngày không được để trống.
                    </p>   
                    <p class="help is-danger" v-show="errors.firstByRule('invoice_date', 'date_format')">
                        Ngày không hợp lệ. Nhập ngày theo dạng DD/MM/YYYY
                    </p>   
                </div>
                <div class="field">
                    <label class="label">Số hợp đồng</label>
                    <div class="control">
                        <input type="text" class="input" id="uid" v-model="new_invoice.uid">
                    </div>
                </div> 
            </div>
            <div class="provider-info sector">
                <p class="title is-4">Nhà cung cấp</p>
                <hr />
                <div class="field">
                    <label :class="{'label': true, 'has-text-danger': errors.has('provider_id')}">Chọn nhà cung cấp</label>
                    <p class="control">
                        <treeselect :load-root-options="fetchProviders"  v-model="provider_id" placeholder="Chọn nhà cung cấp" v-validate="'required'" name="provider_id"></treeselect>
                    </p>
                </div>
                <div class="field">
                    <label class="label">Tên nhà cung cấp</label>
                    <div class="control" v-if="provider_id === 0">
                        <input type="text" :class="{'input': true, 'is-danger': errors.has('new_provider_name')}" v-model="new_provider.name"  name="new_provider_name" v-validate="'required'">
                        <p class="help has-text-danger" v-if="errors.has('new_provider_name')">Không được để trống</p>
                    </div>
                    <div class="control" v-else>
                        <input type="text" class="input" disabled :value="selectedProvider.name">
                        
                    </div>
                </div>
                <div class="field">
                    <label class="label">Mã số thuế</label>
                    <div class="control" v-if="provider_id === 0">
                        <input type="text" class="input" v-model="new_provider.tax_number">
                    </div>
                    <div class="control" v-else>
                        <input type="text" class="input" disabled :value="selectedProvider.tax_number">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Địa chỉ</label>
                    <div class="control" v-if="provider_id === 0">
                        <input type="text" class="input" v-model="new_provider.address">
                    </div>
                    <div class="control" v-else>
                        <input type="text" class="input" disabled :value="selectedProvider.address">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Mô tả</label>
                    <div class="control" v-if="provider_id === 0">
                        <input type="text" class="input" v-model="new_provider.description">
                    </div>
                    <div class="control" v-else>
                        <input type="text" class="input" disabled :value="selectedProvider.description">
                    </div>
                </div>
            </div>
            <div class="material-list sector">
                <p class="title is-4">Danh mục</p>
                <hr />
                <fullscreen :is-fullscreen="toggleFullscreen">
                    <div class="columns">
                        <div class="column">
                            <treeselect :multiple="true" :load-root-options="fetchTree" :open-on-focus="true" :close-on-select="false" :disableBranchNodes="false" placeholder="Chọn vật tư theo danh sách" @close="chooseMaterials" :disabled="materialSelect.disabled"></treeselect>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column"></div>
                        <div class="column is-narrow">
                            <div class="field is-grouped">
                                <div class="control">
                                    <button :class="{'button': true ,'is-success': true, 'is-loading': onSubmit}" @click="submit" v-if="toggleFullscreen === true">Lưu</button>
                                </div>                               
                                <div class="control">
                                    <button class="button is-link" @click="toggleFullscreen = false" v-if="toggleFullscreen === true">Thu nhỏ</button>
                                    <button class="button is-link" @click="toggleFullscreen = true" v-if="toggleFullscreen === false">Phóng to</button>
                                </div>
                                <div class="control">
                                    <div class="button is-warning" @click="openMaterialSelect" :disabled="!materialSelect.dirty">Sửa danh mục</div>
                                </div>
                                <div class="control">
                                    <button class="button is-primary" @click="newMaterial">Thêm danh mục gốc</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="table-container scrollable-x scrollable-y" style="max-height: 600px; max-width: 100vw;">
                        <table class="table has-text-centered-cell is-bordered is-striped is-hoverable is-fullwidth" v-if="flatList">
                            <thead>
                                <tr>
                                    
                                    <th rowspan="2" class="has-text-left">Tên vật tư / Danh mục</th>
                                    <th rowspan="2" style="width: 80px">Đơn vị tính</th>
                                    <th rowspan="2" style="width: 80px">Loại tiền</th>
                                    <th rowspan="2" style="width: 100px">Hãng</th>
                                    <th colspan="4" class=""><span v-if="new_invoice.type === 'invoice'">Đơn hàng</span><span v-else>Hợp đồng</span></th>
                                    <th colspan="4" class="">BOQ</th>
                                    <th rowspan="2" class="">Ghi chú</th>
                                </tr>
                                <tr>
                                    <th style="width: 100px">Số lượng</th>
                                    <th style="width: 100px">Đơn giá</th>
                                    <th style="width: 60px">VAT (%)</th>
                                    <th style="width: 120px">Thành tiền</th>
                                    <th style="width: 100px">Số lượng</th>
                                    <th style="width: 100px">Đơn giá</th>
                                    <th style="width: 60px">VAT (%)</th>
                                    <th style="width: 100px">Thành tiền</th>                                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(material, index) in flatList" :key="index" :class="`depth-${material.depth} ${(selectedIndex === index) ? 'is-selected': ''}`" @click.right.prevent="openMenu(index, $event)">
                                    <template v-if="!material.is_new">
                                        <td class="has-text-left depth-padding" :style="`padding-left: ${(material.depth + 1) * depthPadding}px`">
                                            <span class="icon">
                                                <i class="mdi mdi-chevron-down" v-if="material.has_children"></i>
                                                <i class="mdi mdi-chevron-right" v-else></i>
                                            </span>
                                            <span>{{material.name}}</span></td>
                                        <td>{{material.per}}</td>
                                        <td>{{material.currency}}</td>
                                        <td>{{material.brand}}</td>
                                    </template>
                                    <template v-else >        
                                        <td class="has-text-left" :style="`padding-left: ${(material.depth + 1)* depthPadding}px`">
                                            <div class="field">
                                                <div class="control has-icons-left">
                                                    <span class="icon is-left is-small">
                                                        <i class="mdi mdi-chevron-down" v-if="material.has_children"></i>
                                                        <i class="mdi mdi-chevron-right" v-else></i>
                                                    </span>
                                                    <input type="text" :class="{'input': true, 'is-small': true, 'is-danger': errors.has(`material_name_${material.uid}`)}" v-model="material.name" @focus="$event.target.select()" v-validate.initial="'required'" :name="`material_name_${material.uid}`">
                                                </div>

                                            </div>          
                                        </td>    
                                        <td class="control"><input type="text" class="input is-small" v-model="material.per"></td>
                                        <td class="control"><input type="text" class="input is-small" v-model="material.currency"></td>
                                        <td class="control"><input type="text" class="input is-small" v-model="material.brand"></td>
                                    </template>  
                                        <template v-if="material.is_dirty">
                                            <td class="control"><input type="text" :class="{'input': true, 'is-small': true, 'is-danger': errors.has(`tracker_unit_${material.uid}`)}" v-model="material.tracker.unit" @focus="$event.target.select()" validate.initial="'required'" :name="`tracker_unit_${material.uid}`"></td>
                                            <td class="control"><cleave type="text" :class="{'input': true, 'is-small': true, 'is-danger': errors.has(`tracker_price_${material.uid}`)}" v-model="material.tracker.price" @focus="$event.target.select()" :options="options.price" validate.initial="'required'" :name="`tracker_price_${material.uid}`"></cleave></td>
                                            <td class="control"><cleave type="text" :class="{'input': true, 'is-small': true, 'has-text-centered': true, 'is-danger': errors.has(`tracker_vat_${material.uid}`)}" v-model="material.tracker.vat" @focus="$event.target.select()" :options="options.vat" validate.initial="'required'" :name="`tracker_vat_${material.uid}`"></cleave></td>
                                            <td>{{ comma((material.tracker.unit * material.tracker.price) * ((material.tracker.vat/100) + 1)) }}</td>
                                        </template>
                                        <template v-else>
                                            <td colspan="4">
                                                <a @click="material.is_dirty = true" class="button is-success">Thêm đơn hàng</a>
                                            </td>
                                        </template>
                                        <template v-if="material.boqs.length > 0">
                                            <td>
                                                <p v-for="boq in material.boqs" :key="boq.id" :class="{'has-text-centered': !boq.is_new, 'control': boq.is_new, 'has-spliter': true}">
                                                    <input v-if="boq.is_new" type="text" class="input is-small" v-model="boq.unit" />
                                                    <span v-else>{{comma(boq.unit)}}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p v-for="boq in material.boqs" :key="boq.id" :class="{'has-text-centered': !boq.is_new, 'control': boq.is_new, 'has-spliter': true}">
                                                    <cleave v-if="boq.is_new" type="text" class="input is-small" v-model="boq.price" :options="options.price"></cleave>
                                                    <span v-else>{{comma(boq.price)}}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p v-for="boq in material.boqs" :key="boq.id" :class="{'has-text-centered': !boq.is_new, 'control': boq.is_new, 'has-spliter': true}">
                                                    
                                                    <input v-if="boq.is_new" type="text" class="input is-small" v-model="boq.vat" />
                                                    <span v-else>{{boq.vat}}</span>
                                                </p>
                                            </td>
                                            <td>
                                                <p v-for="boq in material.boqs" :key="boq.id" class="has-text-centered has-spliter">
                                                    <span v-if="boq.is_new">{{comma(boq.unit * boq.price * (boq.vat/100 + 1))}}</span>
                                                    <span v-else>{{comma(boq.total)}}</span>
                                                </p>
                                            </td>
                                        </template>
                                        <template v-else>
                                            <td colspan="4" class="has-text-center">
                                                <a class="button is-link" @click="newBOQ(index)">Thêm BOQ</a>
                                            </td>
                                        </template>
                                        <td></td>
                                </tr>
                                <tr>
                                    <td colspan="4">Tổng cộng</td>
                                    <td colspan="4">
                                        <div class="level">
                                            <div class="level-left">
                                                <p class="level-item">
                                                    <b>Trước VAT: </b>
                                                </p>
                                            </div>
                                            <div class="level-right">
                                                <p class="level-item">
                                                    {{comma(sum)}}
                                                </p>
                                            </div>
                                        </div>     
                                    </td>
                                    <td colspan="5" class="has-text-left">
                                        <div class="level">
                                            <div class="level-left">
                                                <p class="level-item">
                                                    <b>Sau VAT: </b>
                                                </p>
                                            </div>
                                            <div class="level-right">
                                                <p class="level-item">
                                                    {{comma(sumVAT)}}
                                                </p>
                                            </div>
                                        </div>    
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </fullscreen>
            </div>
        </div>
        <div class="field is-grouped-centered is-grouped">
            <div class="control">
                <button :class="{'button': true ,'is-success': true, 'is-loading': onSubmit}" @click="submit">Lưu</button>
            </div>
            <div class="control">
                <router-link class="button is-outlined" :to="{'name': 'work.show', 'params': {'work_id': this.$route.params.work_id}}">Hủy</router-link>
            </div>
        </div>
    </content-sidebar>
</template>

<script>
export default {
    name: `create-project`,
}
</script>

<style>

</style>
