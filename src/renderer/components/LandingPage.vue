<template>
    <div id="wrapper">
        <div class="content">
            <div class="container">
                <div class="columns fuild-height is-verticaly-centered">
                    <div class="column has-text-centered">                       
                        <img id="logo" src="~@/assets/logo.png" alt="electron-vue">                       
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: `landing-page`,
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
