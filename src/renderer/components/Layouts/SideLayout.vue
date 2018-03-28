<template>
    <div class="side-layout-container">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <a class="delete is-medium" @click="toggleSideOff"></a>
                </div>
            </div>
            <slot name="nav"></slot>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: `side-layout`,
    methods: {
        toggleSideOff () {
            this.$store.dispatch(`sideComponentOff`)
        },
    },
}
</script>
<style lang="scss">
    .side-layout-container {
        padding: 1rem 1rem 1rem;
        width: 100%;
        min-height: 100%;
        max-width: 100%;
    }
</style>
