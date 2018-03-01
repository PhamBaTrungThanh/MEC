<template>
    <div>   
        <p class="title">Danh sách dự án</p>
        <table class="table is-fullwidth is-hoverable is-striped">
            <thead>
                <th style="width: 60px">STT</th>
                <th>Tên dự án</th>
                <th style="width: 200px">Số đơn hàng</th>
                <th style="width: 200px">Lần cập nhật</th>
            </thead>
            <tbody>
                <router-link v-for="(work, index) in works" :key="index" tag="tr" :to="{name: `work.show`, params: {work_id: work.id}}">
                    <td class="has-text-bold">{{index + 1}}</td>
                    <td class="media">
                        <figure class="media-left">
                            <p class="image is-64x64">
                                <img :src="work.image_cover">
                            </p>
                        </figure>
                        <div class="media-content">
                            <p>
                                <strong>{{work.name}}</strong>
                            </p>
                        </div>  
                    </td>
                    <td>{{work.invoices_count}}</td>
                    <td>{{work.updated_at}}</td>
                </router-link>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: `work-index`,
    data () {
        return {
            report: false,
            action: false,
            ready: false,
        }
    },
    computed: {
        ...mapGetters({
            user: `currentUser`,
            works: `getAllWorks`,
        }),
    },
}
</script>

<style>

</style>

