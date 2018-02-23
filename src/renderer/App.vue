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
    @import "~bulma/bulma.sass";
    @import "~@/assets/fonts/fonts.css";
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
/* CSS */
</style>
