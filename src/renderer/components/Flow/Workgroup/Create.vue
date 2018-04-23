<template>
    <content-sidebar v-scroll-spy="{selector: '.scroll-spy-holder', linksSelector: '.scroll-spy-links a'}">
        <aside class="menu" slot="sidebar">
            <p class="menu-label">Nhóm làm việc</p>
            <ul class="menu-list scroll-spy-links">
                <li>
                    <a>Tạo nhóm làm việc mới</a>
                </li>
                <li>
                    <a>Chọn Leader</a>
                </li>
            </ul>
            <p class="menu-label">Tùy chọn</p>
            <ul class="menu-list">
                <li>
                    <a class="has-text-success" @click="submitNewWorkgroup">Tạo mới</a>
                </li>
                <li>
                    <a class="has-text-danger" @click="$router.push({name: 'workgroup.index'})">Hủy</a>
                </li>
            </ul>            
        </aside>
        <div class="scroll-spy-holder">
            <div class="sector">
                <p class="title is-4">Tạo nhóm mới</p>
                <hr />    
                <div class="columns is-centered is-gapless">
                    <div class="column is-one-third">
                        <div class="content">
                            <figure class="image">
                                <img src="~@/assets/images/illustration-create-team.svg">
                            </figure>   
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="field">
                        <label for="">Tên nhóm</label>
                        <input type="text" :disabled="onSubmit" :class="{'input': true, 'is-danger': errors.has('name')}" placeholder="Nhập tên nhóm" v-model="name" name="name" v-validate="'required'">
                        <p class="help is-danger" v-if="errors.has('name')">Tên nhóm không được để trống</p>
                    </div>
                    <label class="checkbox">
                        <input type="checkbox" v-model="isPrivate" :disabled="onSubmit">
                        <span class="icon">
                            <i class="mdi mdi-lock"></i>
                        </span>
                        <span>Riêng tư </span><span class="is-size-7">(người khác sẽ không xem được những công việc mà nhóm đang thực hiện)</span>
                    </label>
                </div>
            </div>
            <div class="sector">
                <p class="title is-4">Chọn Leader</p>
                <hr />    
                <div class="columns is-centered is-gapless">
                    <div class="column is-one-third">
                        <div class="content">
                            <figure class="image">
                                <img src="~@/assets/images/illustration-invite-people.svg">
                            </figure>   
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="field">
                        <treeselect :load-root-options="fetchUsers" :open-on-focus="true" :close-on-select="true" :disableBranchNodes="false" placeholder="Chọn nhóm trưởng" :disabled="onSubmit" v-model="leaderId"></treeselect>
                    </div>
                </div>
            </div>
            <div class="field is-grouped">
                <p class="control">
                    <a class="button is-success" @click="submitNewWorkgroup">
                    Tạo mới
                    </a>
                </p>
                <p class="control">
                    <a class="button is-light" @click="$router.push({name: 'workgroup.index'})">
                    Hủy
                    </a>
                </p>
            </div>
        </div>
    </content-sidebar>
</template>

<script>
export default {
    name: `create-workgroup`,
    data () {
        return {
            name: ``,
            isPrivate: false,
            onSubmit: false,
            leaderId: false,
        }
    },
    methods: {
        submitNewWorkgroup () {
            this.$validator.validateAll()
            if (!this.errors.any() && this.name) {
                this.onSubmit = true
                this.$store.dispatch(`newWorkgroup`, {
                    name: this.name,
                    isPrivate: this.isPrivate,
                    leaderId: this.leaderId,
                }).then(result => {
                    this.$router.push({
                        name: `workgroup.index`,
                    })
                })
            }
        },
        fetchUsers (callback) {
            const users = this.$store.getters.usersSortByName.map(user => {
                return {
                    id: user.id,
                    label: user.name,
                }
            })
            callback(null, users)
        },
    },
}
</script>

