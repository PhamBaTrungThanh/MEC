<template>
    <transition name="zoom" appear>
        <div class="index--wrapper">
            <section class="section">
                <div class="">
                    <div class="content">
                        <p class="title is-3 has-text-centered">Danh sách nhân viên</p>
                    </div>
                    <div class="content">
                        <table class="table" style="font-size: 0.9rem; width: auto">
                            <thead>
                                <th>STT</th>
                                <th class="has-text-left">Họ Tên</th>
                                <th>Mã NV</th>
                                <th>Số CMT</th>
                                <th>Ngày sinh</th>
                                <th>Quê quán</th>
                                <th style="width: 90px">SĐT</th>
                                <th>Địa chỉ liên hệ</th>
                                <th>Nơi làm việc</th>
                                <th>Ngày vào MEC</th>
                                <th>Công việc hiện tại</th>
                                <th>Nơi làm việc hiện tại</th>
                                <!--
                                <th>Địa chỉ email</th>
                                
                                <th>Tình trạng hôn nhân</th>
                                <th>Tình trạng gia đình</th>
                                -->
                            </thead>                         
                            <IndexTBody :title="group.label" :users="group.list" v-for="(group, index) in groups" :key="index"/>
                        </table>
                    </div>
                </div>
            </section>
        </div>

    </transition>
</template>

<script>
import IndexTBody from './IndexTBody.vue'
export default {
    name: `hr-index`,
    computed: {
        user () {
            return this.$store.getters.currentUser
        },
        groups () {
            return this.$store.getters.usergroups
        },
    },
    components: {
        IndexTBody,
    },
}
</script>

<style>

</style>