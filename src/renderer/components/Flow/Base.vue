<template>
    <main-layout>
        <nav class="navbar flow-navbar" slot="navbar">
            <div class="container is-fluid">
            </div>
        </nav>
        <section id="main_section" slot="default" class="main-section scrollable-y flow-section"></section>
    </main-layout>
</template>

<script>
import MainLayout from '@/components/Layouts/Main'
export default {
    name: `flow-base`,
    components: {
        MainLayout,
    },
}
</script>

<style>
    .flow-navbar {
        box-shadow: 0 2px 2px -1px rgba(0,0,0,0.2);
    }
    .flow-section {
        background: rgb(245, 245, 245);
    }
</style>
