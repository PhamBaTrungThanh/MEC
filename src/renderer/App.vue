<template>
    <div id="app">
        <div class="wrapper" v-if="show">
            <router-view></router-view>
        </div>
        <transition name="zoom">
            <login-form v-if="requestLogin" />
        </transition>
    </div>
</template>

<script>
    import LoginForm from './components/LoginForm'
    export default {
        name: `mec`,
        components: {
            LoginForm,
        },
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
            requestLogin () {
                return this.$store.state.App.requestLogin
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
    $family-primary: "Roboto";
    $family-heading: "Roboto Condensed";
    $font-weight-heading: 400;
    $radius: 0px;
    $label-weight: 400;
    @import "~bulma/bulma.sass";
    /* Override */
    h1, h2, h3, h4, h5, h6, .title, .subtitle {
        font-family: $family-heading;
        font-weight: $font-weight-heading;
    }
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
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
</style>

