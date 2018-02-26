<template>
    <transition name="zoom" appear>
        <div class="wrapper landing-page" v-if="initialized">
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
                            <a class="button is-white is-loading" v-show="!ready">loading</a>

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
            initialized () {
                return this.$store.state.App.initialized
            },
            ready () {
                if (this.$store.state.App.isReady) {
                    this.$router.push(`dashboard`)
                    return true
                }
                return false
            },
        },
        methods: {
        },
    }
</script>
