<template>
    <content-sidebar v-scroll-spy="{selector: '.scroll-spy-holder', linksSelector: '.scroll-spy-links a'}">
        <aside class="menu" slot="sidebar">
            <p class="menu-label">Tạo dự án mới</p>
            <ul class="menu-list scroll-spy-links">
                <li>
                    <a>Tên dự án</a>
                </li>
                <li>
                    <a>Chọn mã màu</a>
                </li>
                <li>
                    <a>Phương thức hiển thị</a>
                </li>
                <li>
                    <a>Tùy chỉnh riêng tư</a>
                </li>
            </ul>
            <p class="menu-label">Tùy chọn</p>
            <ul class="menu-list">
                <li>
                    <a class="has-text-success">Tạo mới</a>
                </li>
                <li>
                    <a class="has-text-danger" @click="$router.push({name: 'workgroup.index'})">Hủy</a>
                </li>
            </ul>            
        </aside>
        <div class="scroll-spy-holder">
            <div class="sector">
                <p class="title is-4">Tạo dự án mới</p>
                <hr />    
                <div class="columns is-centered is-gapless">
                    <div class="column is-one-third">
                        <div class="content">
                            <figure class="image">
                                <img src="~@/assets/images/create-project.svg">
                            </figure>   
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="field">
                        <label for="">Tên dự án</label>
                        <input type="text" :disabled="onSubmit" :class="{'input': true, 'is-danger': errors.has('name')}" placeholder="Tên dự án không được để trống" v-model="projectName" name="name" v-validate="'required'">
                        <p class="help is-danger" v-if="errors.has('name')">Tên nhóm không được để trống</p>
                    </div>
                    <label class="checkbox">
                        <input type="checkbox" v-model="createDefaultCategories" :disabled="onSubmit">
                        <span>Tạo danh mục cơ bản</span>
                        <p class="help">Các danh mục "Chuẩn bị", "Đang thực hiện", "Hoàn thành" sẽ được tạo sẵn.</p>
                    </label>
                </div>
            </div>
            <div class="sector">
                <p class="title is-4">Chọn mã màu</p>
                <p class="subtitle is-6">Chọn màu đại diện cho dự án</p>
                <hr />    
                <div class="content">
                    <div class="color-selectors">
                        <a class="color project-color">
                            <span>Không màu</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color black project-color">
                            <span>Đen</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color orange">
                            <span>Cam</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color yellow">
                            <span>Vàng</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color green">
                            <span>Xanh lá</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color turquoise">
                            <span>Xanh ngọc</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color cyan">
                            <span>Xanh lơ</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                       <a class="color project-color blue">
                            <span>Xanh dương</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                       <a class="color project-color purple">
                            <span>Tím</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                       <a class="color project-color red">
                            <span>Đỏ</span>
                            <span class="icon">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>                                                
                    </div>
                </div>
            </div>
            <div class="field is-grouped">
                <p class="control">
                    <a class="button is-success">
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
import { mapGetters } from 'vuex'
export default {
    name: `create-project`,
    computed: {
        ...mapGetters({
            workgroup: `currentWorkgroup`,
            category: `currentCategory`,
        }),
    },
    data () {
        return {
            createDefaultCategories: true,
            projectName: ``,
        }
    },
}
</script>

<style lang="scss">
    .color-selectors {
        display: flex;
        flex-wrap: wrap;
        margin-left: -5px;
        margin-right: -5px;
        .color {
            display: flex;
            flex: 1 1 calc(50% - 10px);
            padding: 5px 15px;
            border: 1px solid #ccc;
            border-radius: 3px;
            margin: 5px 5px;
            span:first-child {
                flex: 1 1 0;
            }
        }
        .color.is-x2 {
            flex-basis: 100%;
        }
    }
</style>
