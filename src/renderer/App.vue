<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: `mec`,
    }
</script>

<style lang="scss">
    @import "~@/assets/fonts/fonts.css";
    /*
     * Variables
    */
    $family-heading: "Source Sans Pro";
    $family-primary: "Roboto Condensed";
    $font-weight-heading: 400;

    @import "~bulma/bulma.sass";

    /** Global */
    * {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    h1, h2, h3, h4, h5, h6, .title, .subtitle {
        font-family: $family-heading;
        font-weight: $font-weight-heading;
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
    .zoom-in-enter, .zoom-in-leave-to {
        opacity: 0;
        transform: scale(1.2);
    }
    .zoom-in-enter-active, .zoom-in-leave-active {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
</style>

