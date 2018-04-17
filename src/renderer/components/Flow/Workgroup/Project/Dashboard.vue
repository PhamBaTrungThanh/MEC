<template>
    <div class="project-dashboard-container">
        <div class="categories" ref="categories">
            <div v-for="(category, index) in categories" :class="{'category-container': true, 'is-collapse': category.isCollapse, 'flow-body-margin': true}" :key="category.id">
                <div class="category">
                    <div class="level">
                        <div class="level-left">
                            <div class="header level-item">
                                <p class="title is-4">
                                    <span class="draggable-handler icon pointer">
                                        <i class="mdi mdi-drag-vertical"></i>
                                    </span>
                                    <span class="pointer icon" @click="collapsed(index)">
                                        <i class="mdi mdi-chevron-right" v-if="localCategories[index].isCollapse"></i>
                                        <i class="mdi mdi-chevron-down" v-else></i>
                                    </span>
                                    <span class="is-unselectable">{{category.name}}</span>
                                </p>
                            </div>
                            <div class="controls level-item show-on-hover">
                                <a class="button is-white has-label" @click="openEditCategoryModal(category.id)">
                                    <span class="icon"><i class="mdi mdi-pencil"></i></span>
                                    <span class="label">Chỉnh sửa</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="body" v-if="!localCategories[index].isCollapse">
                        <div class="project-card"></div>
                        <a class="project-card flow-card add-project">
                            <span class="icon">
                                <i class="mdi mdi-plus"></i>
                            </span>
                            <span>Thêm dự án mới</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="add-categories flow-body-margin">
            <inline-input text="Thêm danh mục" @submit="newCategory" :on-submit="onSubmit">
                Enter để xác nhận
            </inline-input>
        </div>
        <p class="subtitle is-6 has-text-centered has-background-light">Hiện có <b>{{categories.length}}</b> danh mục và <b>{{0}}</b> dự án trong nhóm làm việc <b>{{workgroup.name}}</b></p>
        <div class="modals-container">
            <edit-category @close="closeModal" v-if="editCategoryModal === true" :categoryId="activeCategoryId"></edit-category>
        </div>
        <div class="float-controls-container">
            <a class="float-control" v-if="dragDirty" @click="submitNewOrder" :disabled="onSubmit">
                <span class="icon"><i class="mdi mdi-content-save"></i></span>
                <span class="float-explain">Lưu thay đổi</span>
            </a>
        </div>
    </div>
</template>

<script>
import Sortable from 'sortablejs'
import EditCategory from './EditCategoryComponent'
import InlineInput from '@/components/Components/InlineInput'
export default {
    name: `project-dashboard`,
    components: {
        EditCategory,
        InlineInput,
    },
    computed: {
        workgroup () {
            return this.$store.getters.workgroupById(parseInt(this.$route.params.workgroup_id))
        },
        categories () {
            if (this.workgroup) {
                const categories = this.$store.getters.categoriesForWorkgroup(this.workgroup.id)
                this.localCategories = categories.map(cat => {
                    return {
                        isCollapse: false,
                        originalOrder: cat.order,
                        order: cat.order,
                        id: cat.id,
                    }
                })
                return categories
            }
        },
        uncategorized () {
            return this.workgroup.uncategorized
        },
    },
    data () {
        return {
            localCategories: [],
            dragDirty: false,
            editCategoryModal: false,
            activeCategoryId: 0,
            onSubmit: false,
        }
    },
    methods: {
        collapsed (categoryIndex) {
            this.localCategories[categoryIndex].isCollapse = !this.localCategories[categoryIndex].isCollapse
        },
        editCategory (CategoryId) {
            if (this.onSubmit || this.editCategoryModal || this.newCategoryModal) {
                return false
            }
            this.activeCategoryId = CategoryId
            this.editCategoryModal = true
            const escKey = window.document.addEventListener(`keyup`, event => {
                if (event.key === `Escape` || event.keyCode === 27) {
                    this.closeModal()
                    window.document.removeEventListener(`keyup`, escKey, false)
                }
            })
        },
        closeModal () {
            this.activeCategoryId = 0
            this.activeIndex = 0
            this.editCategoryModal = false
            this.newCategoryModal = false
        },
        openEditCategoryModal (categoryId) {
            this.activeCategoryId = categoryId
            this.editCategoryModal = true
        },
        onDragEnd (event) {
            if (event.oldIndex === event.newIndex) {
                return false
            }
            if (!this.dragDirty) {
                this.dragDirty = true
            }
            const swap = this.localCategories[event.oldIndex]
            this.localCategories[event.oldIndex] = this.localCategories[event.newIndex]
            this.localCategories[event.newIndex] = swap
            return true
        },
        newCategory (value) {
            if (this.onSubmit || this.editCategoryModal) {
                return false
            }
            this.onSubmit = true
            this.$store.dispatch(`newCategory`, {
                name: value,
                parentId: this.workgroup.id,
                parentType: `workgroup`,
            }).then(result => {
                this.onSubmit = false
            })
        },
        recaculateOrder () {
            return this.localCategories.map((cat, index) => {
                return {
                    id: cat.id,
                    order: index,
                }
            })
        },
        submitNewOrder () {
            if (this.onSubmit) {
                return false
            }
            this.onSubmit = true
            this.$store.dispatch(`updateCategoriesOrder`, {
                workgroupId: this.workgroup.id,
                categories: this.recaculateOrder(),
            }).then(result => {
                this.onSubmit = true
                this.dragDirty = false
            })
        },
    },
    beforeRouteLeave (to, from, next) {
        if (this.onSubmit || this.editCategoryModal) {
            return false
        }
        next()
    },
    mounted () {
        Sortable.create(this.$refs.categories, {
            sort: true,
            group: `caegories`,
            draggable: `.category-container`,
            onEnd: event => {
                this.onDragEnd(event)
            },
        })
    },
}
</script>

<style lang="scss">

    .project-dashboard-container {
        padding-top: 3rem;      
        .categories {
            &:focus {
                outline: none;
            }
            .category-container {
                margin-bottom: 1rem;
                padding-top: 1rem;
                border: 2px dashed transparent;
                &:focus {
                    outline: none;
                }
                &:not(:last-child):not(.sortable-ghost):after {
                    display: block;
                    content: "";
                    height: 1px;
                    width: 100%;
                    margin: 0.75rem auto 0.5rem;
                    background: #ddd;
                }
                .category {
                    padding-bottom: 2rem;
                    .header {
                        position: relative;
                        .draggable-handler {
                            color:  hsl(0, 0%, 48%);
                            position: absolute;
                            left: 5px;
                            top: 1px;
                            transform: translateX(-100%);
                            opacity: 0;
                            cursor: -webkit-grab;
                            transition: opacity 150ms ease 0s;
                            &:hover {
                                color: hsl(204, 86%, 53%);
                            }
                        }
                    }
                    .body {
                        width: 50%;
                    }
                }
                .add-category {
                    opacity: 0;
                    color: #979797;
                    display: block;
                    transition: opacity 150ms ease 0s;
                }
                .show-on-hover {
                    opacity: 0;
                }
                &:hover {
                    .add-category, .draggable-handler, .show-on-hover {
                        opacity: 1 !important;
                    }
                }
                // Sort events

                &.sortable-ghost {
                    .category {
                        display: none;
                    }
                }
                &.sortable-ghost:before {
                    display: block;
                    width: 100%;
                    content: "";
                    border: 2px dashed rgba(#444, 0.5);
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    height: 50px;
                }
                &.draggable-mirror {
                    // display: none;
                    span.icon {
                        display: none;
                    }
                    margin: 0;
                    border: 1px solid rgb(165, 165, 165);
                    background: #ffffff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100px;
                    padding: 0 30px;
                    .category {
                        padding: 0;
                    }
                    p.title {
                        margin-bottom: 0;
                    }
                    .category > .body, .add-category {
                        display: none;
                    }
                }
            }
        }
        .add-project {
            text-align: center;
        }
        .project-card {
            width: 100%;
            padding-top: 5px;
            padding-bottom: 5px;
            display: block;
        }
    }

</style>
