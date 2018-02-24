<template>
    <div id="app">
        <div class="wrapper" v-if="show">
            <router-view></router-view>
        </div>
        <transition name="zoom">
            <div id="login-form" class="hero is-fullheight" v-if="$store.state.App.requestLogin">
                <div class="hero-body">
                    <p class="subtitle has-text-centered">
                        <span>Đăng nhập</span>
                    </p>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        name: `mec`,
        computed: {
            show () {
                if (this.$store.state.App.initialized) {
                    if (this.$store.state.App.requestLogin) {
                        return false
                    } else {
                        return true
                    }
                }
            },
        },
        created () {
            this.$store.dispatch(`appInit`)
        },
    }
</script>

<style lang="scss">
    @import "~@/assets/fonts/fonts.css";
    /*
     * Variables
    */
    $family-primary: "Roboto Condensed";
    $font-weight-heading: 400;

    @import "~bulma/bulma.sass";

    /** Global */
    * {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .is-relative {
        position: relative;
    }
    .columns.is-stretch {
        align-items: stretch;
    }    
    .columns.is-verticaly-centered {
        align-items: center;
    }
    .fuild-height {
        height: 100vh;
    }
    /* per buttons */
    .is-traffic-button {
        border: none;
    }
    .is-traffic-button:hover {
        background: $white-ter;
    }
</style>
<style lang="scss">
    /* Animation */
    .zoom-enter, .zoom-leave-to {
        opacity: 0;
        transform: scale(1.2);
    }
    .zoom-enter-to, .zoom-leave {
        opacity: 1;
        transform: scale(1);
    }
    .zoom-enter-active, .zoom-leave-active {
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
</style>

