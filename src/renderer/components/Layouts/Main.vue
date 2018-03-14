<template>
    <div class="main-layout-wrapper">
        <slot name="navbar">
        </slot>
        <slot>
            <section class="main-section scrollable-y" id="main_section">
                <router-view></router-view>
            </section>
        </slot>
    </div>

</template>

<script>
export default {
    name: `main-layout`,
}
</script>

<style lang="scss">

    .main-layout-wrapper {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        & > nav.navbar {
            flex: 0 0 0;
            border-bottom: 1px solid rgba(10, 10, 10, 0.1);
        }
        & > section.main-section {
            flex: 1 1 0;
            margin: 0;
            padding: 2rem 1.5rem;
            width: auto;
        }
    }
</style>
