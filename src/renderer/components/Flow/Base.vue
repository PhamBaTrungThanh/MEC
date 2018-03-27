<template>
    <main-layout>
        <div class="flow-navbar flow-padding level" slot="navbar">
            <div class="level-left">
                <router-link class="level-item flow-item" :to="{name: 'workgroup.index'}">Nhóm</router-link>
            </div>
        </div>
        <section id="main_section" slot="default" class="main-section scrollable-y flow-section">
            <router-view></router-view>
        </section>
        <section id="side_section" v-if="showSecondDisplay">

        </section>
    </main-layout>
</template>

<script>
import MainLayout from '@/components/Layouts/Main'
export default {
    name: `flow-base`,
    components: {
        MainLayout,
    },
    computed: {
        showSeccondDisplay () {
            return this.$store.getters.secondaryDisplay
        },
    },
}
</script>

<style>
    .flow-padding {
        padding-left: calc(3rem + 32px);
        padding-right: 32px;
    }
    .flow-navbar {
        box-shadow: 0 2px 2px -1px rgba(0,0,0,0.2);
        background: #ffffff;
        min-height: 3rem;
        border-bottom: 1px solid rgba(68,68,68, 0.2);
    }
    .level.flow-navbar {
        margin-bottom: 0;
    }
    a.flow-item {
        text-transform: uppercase;
        font-size: 0.9rem; 
        position: relative;
        z-index: 1;
        padding: 2px 5px;
    }
    a.flow-item:not(.router-link-active):hover {
        color: #ffffff;
    }
    a.flow-item.router-link-active:hover {
        color: #3273dc;
        pointer-events: none;
    }
    a.flow-item:not(.router-link-active):before {
        display: block;
        content: "";
        pointer-events: none;
        background: #3273dc;
        position: absolute;
        top: -5px;
        left: -10px;
        right: -10px;
        bottom: -5px;
        border-radius: 4px;
        z-index: -999;
        opacity: 0;
        transition: opacity 0.2s ease 0s;
        transform: rotate(-5deg);
    }
    a.flow-item.router-link-active:before {
        display: block;
        content: "";
        pointer-events: none;
        background: #3273dc;
        left: -5px;
        right: -5px;
        position: absolute;
        height: 2px;
    }
    a.flow-item.router-link-active:before {
        bottom: 0;
        transform: translateY(3px);
    }
    a.flow-item:not(.router-link-active):hover:before {
        opacity: 1;
    }
    .flow-section {
        background: rgb(245, 245, 245);
    }
</style>
