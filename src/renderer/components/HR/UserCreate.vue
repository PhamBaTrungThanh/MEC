<template>
    <transition name="slide-fade">
        <div class="index--wrapper" v-if="ready">
            <hero-header :page="pageMeta" >
                <div class="hero-foot" slot="footer"> 
                    <nav class="tabs  is-boxed">
                        <div class="container">
                            <ul>
                                <li class="is-active"><a>Nhân sự</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>     
            </hero-header>    
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs">
                        <router-link :to="{'name': 'hr.index'}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-chervon-left"></i>
                            </span>
                            <span>Quay lại</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="container">
                    <div class="content">
                        <p class="title is-3 has-text-centered">Thêm nhân viên mới</p>
                    </div>
                    <div class="content">
                        <p class="subtitle is-4">Thông tin cơ bản</p>
                        <div class="columns">
                            <div class="column is-8 is-offset-2">
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Họ tên</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.name">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Mã Nhân Viên</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.UID">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Số CMT</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.id_number">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Ngày sinh</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.birthday">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Số điện thoại</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.phone_number">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Phòng ban</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <span class="select">
                                                    <select v-model="new_user.role">
                                                        <option value="1">Ban giám đốc</option>
                                                        <option value="2">Phòng dự án</option>
                                                        <option value="3">Phòng kế toán</option>
                                                        <option value="4">Phòng kỹ thuật</option>
                                                        <option value="5">Phòng hành chính</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Nơi làm việc</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <span class="select">
                                                    <select v-model="new_user.workplace">
                                                        <option value="MEC Hà Nội" selected="selected">MEC Hà Nội</option>
                                                        <option value="MEC Campuchia">MEC Campuchia</option>
                                                        <option value="MEC Tp. Hồ Chí Minh">MEC Tp. Hồ Chí Minh</option>

                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Địa chỉ email</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.email">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <p class="subtitle is-4">Thông tin bổ sung</p>
                        <div class="columns">
                            <div class="column is-8 is-offset-2">
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Quê quán</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.native_place">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Địa chỉ liên hệ</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.address">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Công việc hiện tại</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.current_job">
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Nơi làm việc hiện tại</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.current_workplace">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Ngày vào MEC</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.joined_at" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Tình trạng hôn nhân</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.mariage_status" >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="field is-horizontal">
                                    <div class="field-label is-normal">
                                        <label class="label">Tình trạng gia đình</label>
                                    </div>
                                    <div class="field-body">
                                        <div class="field">
                                            <div class="control is-expanded">
                                                <input type="text" class="input" v-model="new_user.family_status" > 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>     
                        <hr>
                        <div class="field is-grouped is-grouped-centered">
                            <div class="control">
                                <button class="button is-primary" @click="submit">Lưu</button>
                            </div>    
                        </div>                   
                    </div>
                </div>
            </section>
        </div>

    </transition>
</template>

<script>
export default {
    data: () => {
        return {
            ready: false,
            onSumbit: false,
            new_user: {
                name: ``,
                email: ``,
                birthday: ``,
                UID: ``,
                id_number: ``,
                native_place: ``,
                phone_number: ``,
                address: ``,
                current_job: ``,
                current_workplace: ``,
                family_status: ``,
                mariage_status: ``,
                joined_at: ``,
                role: ``,
                workplace: ``,
            },
        }
    },
    computed: {
        user () {
            return this.$store.getters[`user/user`]
        },
        pageMeta () {
            return {
                'title': `Thêm nhân viên mới`,
                'description': `Công ty MEC`,
                'color': `dark`,
            }
        },
    },
    methods: {
        submit () {
            if (this.onSumbit) {
                return false
            } else {
                this.onSumbit = true
                this.$store.dispatch(`user/store`, this.new_user).then(result => {
                    if (result) {
                        this.swal({
                            'title': `Thành công`,
                            'text': `Đã thêm nhân viên mới`,
                            'type': `success`,
                            'timer': 3000,
                        }).then(_r => {
                            this.$router.push({
                                'to': `hr.index`,
                            })
                        })
                    }
                })
            }
        },

    },
    mounted () {
        this.ready = true
    },
}
</script>

<style>

</style>