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
        computed: {
            ready () {
                return this.$store.state.App.initialized
            },
        },
        methods: {
            open (link) {
                this.$electron.shell.openExternal(link)
            },
        },
    }
</script>

<style>
    ::-webkit-scrollbar { 
        display: none;
    }
</style>
