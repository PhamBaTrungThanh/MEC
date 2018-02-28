<template>
    <div class="wrap">
        <hero-header :page="pageMeta" />
        <div class="navbar has-shadow">
            <div class="container">
                <div class="navbar-tabs">
                    <router-link :to="{'name': 'work.create'}" class="navbar-item is-tab" v-if="user.can_add_work"> 
                        <span>Thêm công trình </span>
                    </router-link>
                </div>
            </div>
        </div>        
        <section class="section">
            <div class="container">
                <transition name="slide-fade">
                    <div class="work_index--wrapper" v-if="works" >
                        <div class="tile is-ancestor">
                            <div v-for="work in works" :key="work.id" class="tile is-3">
                                <router-link class="card is-hoverable" tag="article" :to="{ 'name': 'work.show', 'params': {'work_id': work.id} }">
                                    <div class="card-image">
                                        <figure class="image is-4by3">
                                            <img :src="work.image_cover" alt="">
                                        </figure>
                                    </div>
                                    <div class="card-content">
                                        <div class="media">
                                            <div class="media-left">
                                                <figure class="image image is-1by1 is-32x32">
                                                    <img :src="work.image_cover" alt="">
                                                </figure>
                                            </div>
                                            <div class="media-content">
                                                <p class="title is-6">{{work.name}}</p>
                                                <p class="subtitle is-6">Cập nhật mới: <i>{{work.updated_at}}</i></p>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </section>
    </div>


</template>

<script>

import {mapGetters} from 'vuex'

export default {
    data () {
        return {
            report: false,
            action: false,
            ready: false,
        }
    },
    computed: {
        ...mapGetters(`work`, [
            `works`,
        ]),
        ...mapGetters(`user`, [
            `user`,
        ]),
    },
}
</script>

<style>

</style>

