<template>
    <transition name="zoom-in">
        <div id="wrapper" v-if="ready">
            <div class="content">
                <section class="hero is-fullheight">
                    <div class="hero-body">
                        <div class="container">
                            <p class="content has-text-centered">
                                <img id="logo" src="~@/assets/logo.png" alt="electron-vue">        
                            </p>
                            <p class="title has-text-centered is-4">
                                <span>MEC INTERNATIONAL</span>
                            </p>
                        </div>
                    </div>
                    <div class="hero-foot">
                        <p class="has-text-centered">                       
                            <span>Đang tải dữ liệu</span>
                            <br>
                            <a class="button is-white is-loading">loading</a>
                        </p>
                        <p class="a-foot">
                        </p>
                    </div>
                </section>
            </div>        
        </div>
    </transition>
</template>

<script>
    export default {
        name: `landing-page`,
        data: () => {
            return {
                ready: false,
            }
        },
        methods: {
            open (link) {
                this.$electron.shell.openExternal(link)
            },
        },
        created () {
            this.ready = true
            console.log(`fired`)
            this.$axios.get(`http://tracker.dev/api/v1/user`).then(response => {
                console.log(response)
            })
        },
    }
</script>

<style>
    ::-webkit-scrollbar { 
        display: none;
    }
</style>
