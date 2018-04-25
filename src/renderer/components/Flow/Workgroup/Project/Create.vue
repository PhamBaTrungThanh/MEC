<template>
    <content-sidebar v-scroll-spy="{selector: '.scroll-spy-holder', linksSelector: '.scroll-spy-links a'}">
        <aside class="menu" slot="sidebar">
            <p class="menu-label">Tạo dự án mới</p>
            <ul class="menu-list scroll-spy-links">
                <li>
                    <a>Thông tin cơ bản</a>
                </li>
                <li>
                    <a>Danh mục & công trình</a>
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
            <p class="has-text-centered">
                <breathe-icon></breathe-icon>
            </p>    
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
                        <input type="text" :disabled="onSubmit" :class="{'input': true, 'is-danger': errors.has('name')}" placeholder="Tên dự án không được để trống" v-model="projectName" name="name" v-validate.initial="'required'">
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
                <p class="title is-4">Danh mục và Công trình</p>
                <p class="subtitle is-6">Chọn danh mục và công trình cho dự án</p>
                <hr />    
                <div class="content">
                    <div class="field">
                        <label for="select_work">Chọn công trình</label>
                        <div class="control has-icons-left">
                            <div class="select">
                                <select :disabled="onSubmit" name="select_work" v-model="bindingWorkId">
                                    <option value="0">Không</option>
                                    <option disabled="disabled">---------------------------------</option>
                                    <option v-for="work in works" :key="work.id">{{work.name}}</option>
                                </select>
                            </div>
                            <div class="icon is-left">
                                <i class="mdi mdi-home-modern"></i>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="sector">
                <p class="title is-4">Chọn mã màu</p>
                <p class="subtitle is-6">Chọn màu đại diện cho dự án</p>
                <hr />    
                <div class="content">
                    <div class="color-selectors">
                        <a class="color project-color white" @click="projectColor = 'white'" :disabled="onSubmit">
                            <span>Trắng</span>
                            <span class="icon" v-show="projectColor === 'white'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color black project-color" @click="projectColor = 'black'" :disabled="onSubmit">
                            <span>Đen</span>
                            <span class="icon" v-show="projectColor === 'black'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color orange" @click="projectColor = 'orange'" :disabled="onSubmit">
                            <span>Cam</span>
                            <span class="icon" v-show="projectColor === 'orange'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color yellow" @click="projectColor = 'yellow'" :disabled="onSubmit">
                            <span>Vàng</span>
                            <span class="icon" v-show="projectColor === 'yellow'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color green" @click="projectColor = 'green'" :disabled="onSubmit">
                            <span>Xanh lá</span>
                            <span class="icon" v-show="projectColor === 'green'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color turquoise" @click="projectColor = 'turquoise'" :disabled="onSubmit">
                            <span>Xanh ngọc</span>
                            <span class="icon" v-show="projectColor === 'turquoise'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                        <a class="color project-color cyan" @click="projectColor = 'cyan'" :disabled="onSubmit">
                            <span>Xanh lơ</span>
                            <span class="icon" v-show="projectColor === 'cyan'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                       <a class="color project-color blue" @click="projectColor = 'blue'" :disabled="onSubmit">
                            <span>Xanh dương</span>
                            <span class="icon" v-show="projectColor === 'blue'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                       <a class="color project-color purple" @click="projectColor = 'purple'" :disabled="onSubmit">
                            <span>Tím</span>
                            <span class="icon" v-show="projectColor === 'purple'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>
                       <a class="color project-color red" @click="projectColor = 'red'" :disabled="onSubmit">
                            <span>Đỏ</span>
                            <span class="icon" v-show="projectColor === 'red'">
                                <i class="mdi mdi-check"></i>
                            </span>
                        </a>                                                
                    </div>
                </div>
            </div>
            <div class="sector">
                <p class="title is-4">Phương thức hiển thị </p>
                <p class="subtitle is-6">Chọn phương thức hiển thị mặc định cho dự án</p>
                <hr />    
                <div class="sector-body">
                    <div class="columns">
                        <div class="column is-half">
                            <div class="content">
                                <figure class="image">
                                    <img src="~@/assets/images/list-view.svg">
                                </figure> 
                            </div>
                            <p class="has-text-centered title is-5">
                                Dạng danh sách
                            </p>
                            <p class="has-text-centered subtitle">
                                <span class="icon is-large">
                                    <i class="mdi mdi-checkbox-blank-circle-outline"></i>
                                </span>
                            </p>
                        </div>
                        <div class="column is-half">
                            <div class="content">
                                <figure class="image">
                                    <img src="~@/assets/images/kanban-view.svg">
                                </figure> 
                            </div>
                            <p class="has-text-centered title is-5">
                                Dạng thẻ
                            </p>
                            <p class="has-text-centered subtitle">
                                <span class="icon is-large">
                                    <i class="mdi mdi-checkbox-blank-circle-outline"></i>
                                </span>
                            </p>
                        </div>
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
            works: `getAllWorks`,
        }),
    },
    data () {
        return {
            createDefaultCategories: true,
            onSubmit: false,
            projectName: ``,
            projectColor: `white`,
            bindingWorkId: 0,
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
            border-width: 1px;
            border-style: solid;
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
