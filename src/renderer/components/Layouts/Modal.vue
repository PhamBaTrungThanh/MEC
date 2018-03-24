<template>
<div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
        <slot></slot>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
