<template>
    <div class="modal is-active">
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
                                <p class="title is-3">Sửa nhóm {{workgroup.name}}</p>
                            </div>
                        </div>
                        <p class="field">
                            <label for="" class="label">Tên nhóm</label>
                            <input type="text" :class="{'input': true, 'is-info': true, 'is-danger': errors.has('name')}" v-validate="'required'" name="name" v-model="name" :disabled="onSubmit" @keyup.enter="submit">
                        </p>
                        <p class="field">
                            <label class="checkbox">
                                <input type="checkbox" v-model="isPrivate" :disabled="onSubmit">
                                <span class="icon">
                                    <i class="mdi mdi-lock"></i>
                                </span>
                                <span>Riêng tư </span><span class="is-size-7">(người khác sẽ không xem được những công việc mà nhóm đang thực hiện)</span>
                            </label>
                        </p>
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
                        <div class="delete-container">
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
            }
            return workgroup
        },
    },
    data () {
        return {
            name: ``,
            isPrivate: false,
            onSubmit: false,
            onDelete: false,
        }
    },
    methods: {
        submit () {
            if (this.errors.any()) {
                this.onSubmit = false
            } else {
                if (this.name === this.workgroup.name && this.isPrivate === this.workgroup.isPrivate) {
                    this.$emit(`close`)
                    return true
                } else {
                    this.onSubmit = true
                    this.$store.dispatch(`updateWorkgroup`, {
                        id: this.workgroup.id,
                        name: this.name,
                        isPrivate: this.isPrivate,
                    }).then(result => {
                        if (result) {
                            this.$emit(`close`)
                        }
                    })
                }
            }
        },
    },
}
</script>

<style>
    .delete-container {
        background: rgba(85, 85, 85, 0.1);
        padding: 1.5rem 1rem;  
    }
</style>
