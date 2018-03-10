<template>
    <div :class="{'fullscreen-wrapper': true, 'is-fullscreen': isFullscreen}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        isFullscreen: {
            type: Boolean,
            default: false,
        },
    },
}
</script>

<style>
    .fullscreen-wrapper {
        padding: 1rem;
        background: #ffffff;
        z-index: 99999;
    }
    .fullscreen-wrapper.is-fullscreen {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
