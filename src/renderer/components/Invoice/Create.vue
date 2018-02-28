<template>
    <transition v-if="is_ready">
        <div class="create_invoice--container">
            <hero-header :page="pageMeta" />
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs" v-if="work">
                        <router-link :to="{'name': 'work.show', 'params': {'work_id': work.id}}" class="navbar-item is-tab">
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
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <div class="tile is-child box">
                                <p class="title is-4">Tạo đơn hàng mới</p>
                                <hr />
                                <div class="columns">
                                    <div class="column">
                                        <p class="subtitle is-5">Thông tin chung</p>
                                        <div class="field">
                                            <label class="label">Tên đơn hàng</label>
                                            <div class="control">
                                                <input type="text" :class="{'input': true, 'is-danger': errors.has('invoice_name')}" name="invoice_name" v-model="new_invoice.name" v-validate.initial="'required'">
                                            </div>
                                            <p class="help has-text-danger" v-show="errors.has('invoice_name')">Tên đơn hàng không được để trống.</p>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
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
                                            </div>
                                            <div class="column">
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
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label">Số hợp đồng</label>
                                            <div class="control">
                                                <input type="text" class="input" id="contract_number" v-model="new_invoice.contract_number">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="column">
                                        <p class="subtitle is-5">Thông tin nhà cung cấp</p>
                                        <div class="field">
                                            <label :class="{'label': true, 'has-text-danger': errors.has('provider_id')}">Chọn nhà cung cấp</label>
                                            <p class="control">
                                                <treeselect :load-root-options="fetchProviders"  v-model="provider_id" placeholder="Chọn nhà cung cấp" v-validate="'required'" name="provider_id"></treeselect>
                                            </p>
                                        </div>
                                        <div class="columns">
                                            <div class="column">
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
                                            </div>
                                            <div class="column">
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
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <p class="subtitle is-5">Danh sách vật tư</p>
                                <div class="columns">
                                    <div class="column">
                                        <treeselect :multiple="true" :load-root-options="fetchTree" :open-on-focus="true" :close-on-select="false" :disableBranchNodes="false" placeholder="Chọn vật tư theo danh sách" @close="chooseMaterials" :disabled="materialSelect.disabled"></treeselect>
                                    </div>
                                    <div class="column is-narrow">
                                        <div class="field is-grouped">
                                            <div class="control">
                                                <div class="button is-warning" @click="openMaterialSelect" :disabled="!materialSelect.dirty">Thay đổi</div>
                                            </div>
                                            <div class="control">
                                                <button class="button is-primary" @click="newMaterial">Thêm danh mục gốc</button>
                                            </div>
                                            
                                        </div>
                                       
                                    </div>
                                </div>
                                
                                <div class="columns">
                                    <div class="column">
                                        <table class="table has-text-centered-cell is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-if="flatList">
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
                                                <tr v-for="(material, index) in flatList" :key="index" :class="`depth-${material.depth} ${(rightClick.selectedUID === material.uid) ? 'is-selected': ''}`" @click.right.prevent="openMenu(index, $event)">
                                                    <template v-if="!material.is_new">
                                                        
                                                        <td class="has-text-left depth-padding">
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
                                                        <td class="has-text-left">
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
                                            </tbody>
                                        </table>
                                        <div class="field is-grouped-centered is-grouped">
                                            <div class="control">
                                                <button :class="{'button': true ,'is-success': true, 'is-loading': onSubmit}" @click="submit">Lưu</button>
                                            </div>
                                            <div class="control">
                                                <router-link class="button is-outlined" :to="{'name': 'work.show', 'params': {'work_id': this.$route.params.work_id}}">Hủy</router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <aside :class="{'menu': true, 'right-click': true, 'active': rightClick.isActive}" ref="rightClick">
                <p class="menu-label">
                    Tùy chọn
                </p>
                <ul class="menu-list">
                    <li>
                        <a class="has-text-primary" @click="addChildMaterial">Thêm danh mục con</a>
                        <a class="has-text-danger" @click="deleteMaterial">Xóa danh mục</a>
                        <a class="has-text-info" @click="addBOQ">Thêm BOQ</a>
                        <a class="has-text-success" @click="closeMenu">Hủy</a>
                    </li>
                </ul>
            </aside>
        </div>           
    </transition>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            is_read: true,
            materials_list: [],
            flatList: [],
            rightClick: {
                'isActive': false,
                'selectedUID': null,
                'clickHandle': null,
                'selectedIndex': null,
            },
            materialSelect: {
                disabled: false,
                dirty: false,
            },
            options: {
                price: {
                    numeral: true,
                    numeralThousandsGroupStyle: `thousand`,
                },
                vat: {
                    numeral: true,
                },
                date: {
                    date: true,
                    datePattern: [`d`, `m`, `Y`],
                },
            },
            new_invoice: {
                name: ``,
                type: `invoice`,
                signed_at: ``,
                contract_number: ``,
            },
            provider_id: null,
            new_provider: {
                name: ``,
                tax_number: ``,
                description: ``,
                address: ``,
            },
            onSubmit: false,
        }
    },

    computed: {
        selectedProvider () {
            return (this.providers && this.provider_id) ? this.providers.find(p => p.id === this.provider_id) : {}
        },
        pageMeta () {
            return {
                title: `Tạo đơn hàng mới`,
                description: (this.work) ? `Công trình ${this.work.name}` : `Công trình`,
                color: `success`,
            }
        },
        tree () {
            return this.$store.getters[`material/tree`]
        },
        ...mapGetters(`provider`, [
            `providers`,
        ]),
        work () {
            return this.$store.getters[`work/work`](parseInt(this.$route.params.work_id))
        },
    },

    methods: {
        guard () {
            this.$store.dispatch(`invoice/getRelatedWork`, {work_id: parseInt(this.$route.params.work_id)})
            this.$store.dispatch(`material/getTree`, {work_id: parseInt(this.$route.params.work_id)})
        },
        boqs (materialId) {
            return this.$store.getters[`boq/boqsForMaterial`](materialId)
        },
        generateFlatList () {
            let list = this.materials_list
            let _flatList = this.$store.getters[`material/materials`].map(value => Object.assign({}, value, {
                active: false,
                children: null,
                is_new: false,
                uid: null,
                tracker: {
                    vat: 10,
                    price: 0,
                    unit: 0,
                },
                is_dirty: true,
            }))

            let _trackBackward = (id) => {
                let index = _flatList.findIndex(i => i.id === id)
                _flatList[index].active = true
                if (_flatList[index].parent_id) {
                    _trackBackward(_flatList[index].parent_id)
                }
            }
            let _trackForward = (id, index) => {
                for (let i = index + 1; i < _flatList.length; i++) {
                    if (_flatList[i].parent_id === id) {
                        _flatList[i].active = true
                        if (_flatList[i].has_children) {
                            _trackForward(_flatList[i].id, i)
                        }
                    }
                }
            }
            for (let i = list.length - 1; i >= 0; i--) {
                let index = _flatList.findIndex(m => m.id === list[i])
                if (index !== -1) {
                    _flatList[index].active = true
                    if (_flatList[index].parent_id) {
                        _trackBackward(_flatList[index].parent_id)
                    }
                    if (_flatList[index].has_children) {
                        _trackForward(_flatList[index].id, index)
                    }
                }
            }
            return _flatList.reduce((materials, material) => {
                if (material.active === true) {
                    if (material.children) {
                        material.children = null
                    }
                    material.uid = this.uid()
                    material.boqs = this.boqs(material.id)
                    materials.push(material)
                }
                return materials
            }, [])
        },
        chooseMaterials (values) {
            this.materials_list = values
            this.flatList = this.generateFlatList()
            this.materialSelect.disabled = true
            if (!this.materialSelect.dirty) {
                this.materialSelect.dirty = true
            }
        },
        materialResource (depth = 0) {
            return {
                name: ``,
                type: `material`,
                currency: ``,
                per: ``,
                uid: this.uid(),
                brand: ``,
                is_new: true,
                tracker: {
                    vat: 10,
                    price: 0,
                    unit: 0,
                },
                is_dirty: (depth !== 0),
                id: 0,
                parent_uid: null,
                parent_id: null,
                depth: depth,
                boqs: [],
                has_children: false,
            }
        },
        closeMenu () {
            this.rightClick.isActive = false
            this.rightClick.selectedUID = null
            this.rightClick.selectedIndex = null
            this.$refs.rightClick.style.top = `-999px`
            this.$refs.rightClick.style.left = `-999px`
            document.removeEventListener(`click`, this.rightClick.clickHandle)
        },
        openMenu (index, event = false) {
            this.closeMenu()
            this.$refs.rightClick.style.top = event.pageY + `px`
            this.$refs.rightClick.style.left = event.pageX + `px`
            this.rightClick.isActive = true
            this.rightClick.selectedUID = this.flatList[index].uid
            this.rightClick.selectedIndex = index
            this.rightClick.clickHandle = (event) => {
                if (event.button === 0) {
                    if (!this.$refs.rightClick.contains(event.target)) {
                        this.closeMenu()
                    }
                }
            }
            document.addEventListener(`click`, this.rightClick.clickHandle)
        },
        newMaterial () {
            if (!this.materialSelect.dirty) {
                this.materialSelect.dirty = true
            }
            this.flatList.push(this.materialResource(0))
        },
        deleteMaterial () {
            const index = this.rightClick.selectedIndex
            let parentIds = [this.flatList[index].id]
            let parentUids = [this.flatList[index].uid]
            let count = 1
            for (let i = index + 1; i < this.flatList.length; i++) {
                if ((parentIds.indexOf(this.flatList[i].parent_id) !== -1) || (parentUids.indexOf(this.flatList[i].parent_uid) !== -1)) {
                    if (this.flatList[i].has_children) {
                        if (this.flatList[i].is_new) {
                            parentUids.push(this.flatList[i].uid)
                        } else {
                            parentIds.push(this.flatList[i].id)
                        }
                    }
                    count++
                } else {
                    break
                }
            }
            this.flatList.splice(index, count)
            this.closeMenu()
        },
        addChildMaterial () {
            const index = this.rightClick.selectedIndex
            let material = this.materialResource(this.flatList[index].depth + 1)
            if (!this.flatList[index].is_new) {
                material.parent_id = this.flatList[index].id
            } else {
                material.parent_uid = this.flatList[index].uid
            }
            this.flatList[index].has_children = true
            let parentIds = [this.flatList[index].id]
            let parentUids = [this.flatList[index].uid]
            let count = 0
            for (let i = index + 1; i < this.flatList.length; i++) {
                if ((parentIds.indexOf(this.flatList[i].parent_id) !== -1) || (parentUids.indexOf(this.flatList[i].parent_uid) !== -1)) {
                    if (this.flatList[i].has_children) {
                        if (this.flatList[i].is_new) {
                            parentUids.push(this.flatList[i].uid)
                        } else {
                            parentIds.push(this.flatList[i].id)
                        }
                    }
                    count++
                } else {
                    break
                }
            }
            this.flatList.splice(index + 1 + count, 0, material)
            this.newBOQ(index + 1 + count)
        },
        newBOQ (materialIndex) {
            this.flatList[materialIndex].boqs.push({
                unit: 0,
                price: 0,
                vat: 0,
                total: 0,
                is_new: true,
            })
        },
        addBOQ () {
            const index = this.rightClick.selectedIndex
            this.newBOQ(index)
        },
        uid () {
            return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36).substring(10)
        },
        fetchProviders (callback) {
            callback(null, [{id: 0, label: `TẠO NHÀ CUNG CẤP MỚI`}].concat(this.providers.map(provider => { return {id: provider.id, label: provider.name} })))
        },
        fetchTree (callback) {
            callback(null, this.tree)
        },
        openMaterialSelect () {
            this.swal({
                title: `Xác nhận`,
                text: `Thay đổi này sẽ xóa hết các dữ liệu đã nhập trong bảng, tiếp tục?`,
                type: `warning`,
            }).then(result => {
                if (result) {
                    this.materialSelect.disabled = false
                }
            })
        },
        submit () {
            if (this.errors.any()) {
                return false
            } else {
                // this.onSubmit = true
                this.$store.dispatch(`invoice/store`, {
                    work_id: this.$route.params.work_id,
                    provider_id: (this.provider_id !== 0) ? this.provider_id : `undefined`,
                    new_provider: (this.provider_id === 0) ? this.new_provider : `undefined`,
                    new_invoice: this.new_invoice,
                    list: this.flatList,
                }).then(response => {
                    this.swal({
                        title: `Thành công`,
                        text: `Đã tạo đơn hàng`,
                        type: `success`,
                        timer: 3000,
                    }).then(result => {
                        this.$router.push({
                            name: `work.show`,
                            params: {
                                work_id: this.$route.params.work_id,
                            },
                        })
                    })
                })
            }
        },
    },
    directives: {
        focus: {
            // directive definition
            inserted: function (el) {
                el.focus()
            },
        },
    },
    components: {
        Treeselect,
    },
}
</script>

<style>

</style>
