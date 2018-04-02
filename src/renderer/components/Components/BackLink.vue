<template>
    <a @click="$emit('click')" class="back-link title">
        <span class="icon">
            <i class="mdi mdi-chevron-left"></i>
        </span>
        <span>
            <slot></slot>
        </span>
    </a>
</template>

<script>
export default {
    name: `back-link`,
}
</script>

<style>
    .back-link {
        font-size: 1rem;
        text-transform: uppercase;
    }
    .back-link > span.icon {
        transition: transform 150ms ease 0s;
    }
    .back-link:hover > span.icon {
        transform: translateX(-5px);
    }
    .back-link > span + span {
        margin-left: -10px;
    }
</style>
