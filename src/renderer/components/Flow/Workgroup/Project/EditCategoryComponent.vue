<template>
    <div class="modal is-active" v-if="category">
        <div class="modal-background"></div>
        <div class="modal-content" style="overflow: unset">
            <transition name="appear" appear>
                <div class="box">
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
                                <p class="title is-3">Sửa danh mục <b>{{category.name}}</b></p>
                            </div>
                        </div>
                        <p class="subtitle is-5">Đổi tên danh mục</p>
                        <div class="field has-addons">
                            <div class="control has-icons-left is-expanded">
                                <input type="text" class="input" v-model="categoryName" v-selected :disabled="onSubmit">
                                <span class="icon is-left">
                                    <i class="mdi mdi-pencil"></i>
                                </span>
                            </div>
                            <div class="control">
                                <button :class="{'button': true, 'is-info': true, 'is-loading': onSubmit}" @click="submit" :disabled="category.name === categoryName">Lưu</button>
                            </div>
                        </div>
                        <br />
                        <div class="level">
                            <div class="level-left">
                                <p class="level-item">
                                    <button class="button is-light" :disabled="onSubmit" @click="$emit('close')">Hủy bỏ</button>
                                </p>
                            </div>
                            <div class="level-right">
                                <p class="level item">
                                    <button class="button is-danger" :disabled="onSubmit || showDelete" @click="showDelete = true">Xóa danh mục</button>
                                </p>
                            </div>
                        </div>
                        <div class="delete-confirm has-text-centered" v-if="showDelete">
                            <p class="is-size-5">
                                <sweet-icon type="warning"></sweet-icon>
                            </p>
                            <p class="title is-4">
                                Bạn có chắc muốn xóa danh mục <b>{{category.name}}</b>?
                            </p>
                            <p class="subtitle is-6 is-italic">
                                (Các dự án trong danh mục sẽ tự động chuyển sang danh mục <b>Chưa phân loại</b>)
                            </p>
                            <p class="field">
                                <button class="button is-light" @click="showDelete = false" :disabled="onSubmit">Bỏ qua</button>
                                <button class="button is-danger" :disabled="onSubmit" @click="deleteCategory">Có, tôi chắc chắn!</button>
                            </p>
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
    name: `edit-category`,
    props: {
        categoryId: {
            type: Number,
        },
    },
    computed: {
        category () {
            return this.$store.getters.categoryById(this.categoryId)
        },
        categoryName: {
            get () {
                if (this.name) {
                    return this.name
                }
                return this.category.name
            },
            set (value) {
                this.name = value
            },
        },
    },
    directives: {
        selected: {
            inserted (el) {
                el.focus()
            },
        },
    },
    data () {
        return {
            name: ``,
            showDelete: false,
            onSubmit: false,
        }
    },
    methods: {
        submit () {
            if (this.onSubmit) {
                return false
            }
            this.onSubmit = true
            this.$store.dispatch(`updateCategory`, {
                action: `change_name`,
                data: {
                    name: this.name,
                },
                categoryId: this.category.id,
            }).then(result => {
                if (result) {
                    this.$emit(`close`)
                }
            })
        },
        deleteCategory () {
            if (this.onSubmit) {
                return false
            }
            this.$store.dispatch(`deleteCategory`, {
                categoryId: this.category.id,
            }).then(result => {
                this.$emit(`close`)
            })
        },
    },
}
</script>

