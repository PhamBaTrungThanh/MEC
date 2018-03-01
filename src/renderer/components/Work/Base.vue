<template>
    <div class="work---wrapper">
        <nav class="navbar has-shadow">
            <div class="container is-fluid">
                <div class="navbar-menu">
                    <div class="navbar-start">
                        <nav class="navbar-item breadcrumb">
                            <ul>
                                <router-link tag="li" :to="{name: `dashboard`}" active-class="router-active" exact-active-class="is-active"><a>MEC</a></router-link>
                                <router-link tag="li" :to="{name: `work.index`}" active-class="router-active" exact-active-class="is-active"><a>Dự án</a></router-link>
                                <router-link tag="li" :to="{name: `work.show`}" active-class="router-active" exact-active-class="is-active" v-if="routeName === `work.show`"><a>{{work.name}}</a></router-link>
                                <router-link tag="li" :to="{name: `work.create`}" active-class="router-active" exact-active-class="is-active" v-if="routeName === `work.create`"><a>Tạo dự án mới</a></router-link>
                            </ul>
                        </nav>
                    </div>
                    <div class="navbar-end">
                        <p class="navbar-item">
                            <router-link :to="{name: `work.create`}" class="button is-success" v-if="routeName === `work.index`">Tạo dự án</router-link>
                            <router-link :to="{name: `work.index`}" class="button is-danger" v-if="routeName === `work.create`">Hủy</router-link>
                            <router-link :to="{name: `work.report`, params: {work_id: work.id}}" class="button is-link" v-if="routeName === `work.show`">Xem báo cáo</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </nav>
        <section class="section">
            <div class="container is-fluid">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: `work-base`,
    computed: {
        work () {
            return this.$store.getters.currentWork.data
        },
        routeName () {
            return this.$route.name
        },
    },
}
</script>

<style>

</style>
