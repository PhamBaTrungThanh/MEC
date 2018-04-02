<template>
    <div class="modal is-active" v-if="workgroup">
        <div class="modal-background"></div>
        <div class="modal-content" style="overflow: unset">
            <transition name="appear" appear>
                <div class="box" v-if="!onDelete">
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="delete" @click="$emit('close')"></a>
                            </div>
                        </div>
                        <div class="level-item">
                            <p>
                                <span class="icon is-large has-text-info">
                                    <i class="mdi mdi-pencil mdi-48px"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="content">
                        <div class="level">
                            <div class="level-item">
                                <p class="title is-3">Sửa nhóm <b>{{workgroup.name}}</b></p>
                            </div>
                        </div>
                        <p class="field">
                            <label for="" class="label">Tên nhóm</label>
                            <input type="text" :class="{'input': true, 'is-info': true, 'is-danger': errors.has('name')}" v-validate="'required'" name="name" v-model="name" :disabled="onSubmit" @keyup.enter="submit">
                        </p>
                        <p class="field">
                            <label class="label">Trạng thái nhóm</label>
                            <label class="checkbox">
                                <input type="checkbox" v-model="isPrivate" :disabled="onSubmit">
                                <span class="icon">
                                    <i class="mdi mdi-lock"></i>
                                </span>
                                <span>Riêng tư </span><span class="is-size-7">(người khác sẽ không xem được những công việc mà nhóm đang thực hiện)</span>
                            </label>
                        </p>
                        <div class="field">
                            <label class="label">Leader của nhóm</label>
                            <div class="select">
                                <select v-model="leaderId">
                                    <option value="0">Không</option>
                                    <option disabled>──────────</option>
                                    <option v-for="user in workgroup.users" :key="user.id" :selected="workgroup.leaderId === user.id" :value="user.id">{{user.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <p class="level-item">
                                    <button class="button is-light" :disabled="onSubmit" @click="$emit('close')">Hủy bỏ</button>
                                </p>
                            </div>
                            <div class="level-right">
                                <p class="level-item">
                                    <button :class="{'button': true, 'is-info': true, 'is-loading': onSubmit}" @click="submit">Lưu</button>
                                </p>
                            </div>
                        </div>    
                        <div class="delete-container" @click="deleteWorkgroup">
                            <p>
                                <span class="icon has-text-danger">
                                    <i class="mdi mdi-delete"></i>
                                </span>
                                <span class="has-text-danger">Xóa nhóm</span>
                                <span class="is-size-7">Sau khi xác nhận, toàn bộ nội dung của nhóm này sẽ bị xóa vĩnh viễn. Hành động này không thể khôi phục.</span>
                            </p>

                        </div>
                    </div>
                </div>
                <div class="box" v-if="onDelete">
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="delete" @click="$emit('close')"></a>
                            </div>
                        </div>
                        <div class="level-item">
                            <p>
                                <span class="icon is-large has-text-danger">
                                    <i class="mdi mdi-delete mdi-48px"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="content">
                        <div class="level">
                            <div class="level-item">
                                <p class="title has-text-centered">
                                    Xóa {{workgroup.name}}?
                                </p>
                            </div>
                        </div>
                        <p>
                            <b>Hành động này không thể khôi phục!</b>
                        </p>
                        <div class="field">
                            <label for="" class="label">Nhập tên nhóm để xác nhận</label>
                            <input type="text" :class="{'input': true, 'is-danger': errors.has('delete_workgroup_name')}" placeholder="Nhập tên" @click="submitDeleteWorkgroup" @keyup.enter="submitDeleteWorkgroup" v-validate="{is: workgroup.name}" name="delete_workgroup_name" v-model="deleteWorkgroupName">
                            <p class="help is-danger" v-if="errors.has('delete_workgroup_name')">
                                <span class="icon">
                                    <i class="mdi mdi-alert-circle-outline"></i>
                                </span>
                                <span>Tên nhóm không hợp lệ</span>
                            </p>
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <p class="level-item">
                                    <button class="button is-light" :disabled="onSubmit" @click="onDelete = false">Hủy bỏ</button>
                                </p>
                            </div>
                            <div class="level-right">
                                <p class="level-item">
                                    <button :class="{'button': true, 'is-danger': true, 'is-loading': onSubmit}" @click="submitDeleteWorkgroup">Xác nhận</button>
                                </p>
                            </div>
                        </div>   
                    </div>
                </div>
            </transition>
        <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
        </div>
        
    </div>
</template>

<script>
export default {
    name: `edit-workgroup`,
    props: {
        workgroupId: {
            type: Number,
        },
    },
    computed: {
        workgroup () {
            const workgroup = this.$store.getters.workgroupById(this.workgroupId)
            if (workgroup) {
                this.name = workgroup.name
                this.isPrivate = workgroup.isPrivate
                this.leaderId = workgroup.leaderId
            }
            return workgroup
        },
    },
    data () {
        return {
            name: ``,
            isPrivate: false,
            leaderId: false,
            onSubmit: false,
            onDelete: false,
            deleteWorkgroupName: ``,
        }
    },
    methods: {
        submit () {
            if (this.errors.any()) {
                this.onSubmit = false
            } else {
                if (this.name === this.workgroup.name && this.isPrivate === this.workgroup.isPrivate && this.leaderId === this.workgroup.leaderId) {
                    this.$emit(`close`)
                    return true
                } else {
                    this.onSubmit = true
                    this.$store.dispatch(`updateWorkgroup`, {
                        id: this.workgroup.id,
                        name: this.name,
                        isPrivate: this.isPrivate,
                        leaderId: this.leaderId,
                    }).then(result => {
                        if (result) {
                            this.$emit(`close`)
                        }
                    })
                }
            }
        },
        submitDeleteWorkgroup () {
            if (this.onDelete && !this.errors.has(`delete_workgroup_name`) && this.deleteWorkgroupName) {
                if (this.deleteWorkgroupName === this.workgroup.name) {
                    this.onSubmit = true
                    this.$store.dispatch(`deleteWorkgroup`, {
                        workgroupId: this.workgroup.id,
                    }).then(result => {
                        if (result) {
                            this.$emit(`close`)
                        }
                    })
                }
            } else {
                this.onSubmit = false
                return false
            }
        },
        deleteWorkgroup () {
            if (this.onSubmit) {
                return false
            } else {
                this.onDelete = true
            }
        },
    },
}
</script>

<style>
    .delete-container {
        background: rgba(85, 85, 85, 0.1);
        padding: 1.5rem 1rem;  
        margin: 0 -1.25rem -1.25rem;
        cursor: pointer;
    }
    .delete-container:hover {
        background: rgba(120, 120, 120, 0.25)
    }
</style>
