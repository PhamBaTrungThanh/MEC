
<template>
    <transition name="slide-fade">
        <div class="hr---wrapper" v-if="ready">
            <hero-header :page="pageMeta">
          
            </hero-header>
            <div class="navbar has-shadow">
                <div class="container">
                    <div class="navbar-tabs">
                        <router-link :to="{'name': 'hr.index'}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-chevron-left"></i>
                            </span>
                            <span>Quay lại</span>
                        </router-link>
                        <router-link :to="{'name': 'task.today', 'params': {'user_id': this.user.id}}" class="navbar-item is-tab">
                            <span class="icon">
                                <i class="mdi mdi-file-tree"></i>
                            </span>
                            <span>Công việc ngày hôm nay</span>
                        </router-link>
                        <router-link class="navbar-item is-tab" to="/option">
                            <span class="icon">
                                <i class="mdi mdi-settings"></i>
                            </span>
                            <span>Tùy chọn</span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data: () => {
        return {
            ready: false,
        }
    },
    computed: {
        user () {
            return this.$store.getters[`user/user`]
        },
        pageMeta () {
            return {
                'title': (this.user) ? `Nhân viên: ${this.user.name}` : `Nhân viên`,
                'description': (this.user) ? `Phòng: ${this.user.label}` : ``,
                'color': `dark`,
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
