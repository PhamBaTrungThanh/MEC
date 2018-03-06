<template>
    <div class="main-layout-wrapper">
        <slot name="navbar">
        </slot>
        <slot>
            <section class="section">
                <div class="container is-fluid">
                    <router-view></router-view>
                </div>
            </section>
        </slot>
    </div>

</template>

<script>
export default {
    name: `main-layout`,
}
</script>

<style>

</style>
