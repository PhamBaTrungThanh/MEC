<template>
    <div :class="{'control': true, 'is-loading': onSubmit, 'is-large': true}">
        <input type="text" ref="editor" class="input is-large is-static tooltip-trigger inline-input"
            @blur="onBlur"
            v-model="value"
            :placeholder="text"
            @keyup.enter="submitting"
            @keyup.esc="onBlur"
            :disabled="onSubmit">
        <span class="tooltip-content bloated"><slot></slot></span>
    </div>
</template>

<script>
export default {
    name: `inline-input`,
    props: {
        text: {
            type: String,
            required: true,
        },
        onSubmit: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        onSubmit () {
            if (this.onSubmit && !this.onProcess) {
                this.onProcess = true
                return true
            }
            if (!this.onSubmit && this.onProcess) {
                this.onProcess = false
                this.value = ``
                return false
            }
        },
    },
    data () {
        return {
            value: ``,
            onProcess: false,
        }
    },
    methods: {
        onBlur () {
            this.value = ``
            return true
        },
        submitting () {
            if (this.value) {
                this.$emit(`submit`, this.value)
            }
        },
    },
}
</script>
<style>
    .inline-input + .tooltip-content.bloated {
        left: 10%;
        font-size: 1em;
    }
</style>