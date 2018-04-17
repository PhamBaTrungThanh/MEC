<template>
    <main-layout :class="{'side-layout-enabled': showSecondDisplay}">
        <div class="flow-navbar flow-padding level" slot="navbar">
            <div class="level-left">
                <router-link class="level-item flow-item" :to="{name: 'user.tasks'}">Công việc</router-link>
                <router-link class="level-item flow-item" :to="{name: 'project.index', params: {workgroup_id: workgroupId}}">Dự án</router-link>
                <router-link class="level-item flow-item" :to="{name: 'workgroup.index'}">Nhóm</router-link>
            </div>
        </div>
        <div class="main-section-container">
            <section id="main_section" slot="default" class="main-section scrollable-y flow-section is-flow-main-section">
                <router-view></router-view>
            </section>
            <transition name="side">
                <section id="side_section" class="is-flow-side-section" v-if="showSecondDisplay">
                    <side-layout>
                        <person-detail v-if="secondaryComponent === 'person-detail'"></person-detail>
                        <leave-workgroup v-if="secondaryComponent === 'leave-workgroup'"></leave-workgroup>
                    </side-layout>
                </section> -exact
            </transition>
        </div>

    </main-layout>
</template>

<script>
import MainLayout from '@/components/Layouts/Main'
import SideLayout from '@/components/Layouts/SideLayout'
import PersonDetail from '@/components/Flow/User/User'
import LeaveWorkgroup from '@/components/Flow/User/LeaveWorkgroup'
export default {
    name: `flow-base`,
    components: {
        MainLayout,
        PersonDetail,
        SideLayout,
        LeaveWorkgroup,
    },
    computed: {
        showSecondDisplay () {
            return this.$store.getters.secondaryDisplayStatus
        },
        secondaryComponent () {
            return this.$store.getters.secondaryComponent
        },
        secondaryProps () {
            return this.$store.getters.secondaryProps
        },
        workgroupId () {
            return this.$route.params.workgroup_id || 0
        },
    },
    beforeRouteLeave (to, from, next) {
        this.$store.dispatch(`sideComponentOff`)
        next()
    },
}
</script>
<style lang="scss">
    .main-section-container {
        flex: 1 1 0;
        width: 100%;
        position: relative;
    }
    .side-layout-enabled {
        .is-flow-main-section {
            right: 550px;
        }
        .is-flow-side-section {
            width: 550px;
        }
    }
    .is-flow-side-section {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.15);
        overflow-y: auto;
    }
    .side-enter-active {
        transition: transform 200ms ease 0s;
    }
    .side-enter-to {
        transform: translateX(0);
    }
    .side-enter {
        transform: translateX(100%);
    }
    .is-flow-main-section {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: right 200ms ease 0s;
    }
    .flow-padding {
        // padding-left: calc(3rem + 32px);
        padding-left: 32px;
        padding-right: 32px;
    }
    .flow-navbar {
        // box-shadow: 0 2px 2px -1px rgba(0,0,0,0.2);
        background: #ffffff;
        min-height: 3rem;
        border-bottom: 1px solid rgba(68,68,68, 0.2);
    }
    .flow-card {
        box-shadow: 0px 1px 2px 0 rgba(0,0,0,0.15);       
        cursor: pointer;
        user-select: none; /* Standard */
        border-radius: 2px;
        background: #ffffff;
        &:hover {
            box-shadow: 0px 4px 6px 0 rgba(0,0,0,0.15);
        }
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
        margin: 0 10px;
    }
    a.flow-item:hover {
        color: #ffffff;
    }
    a.flow-item:before {
        display: block;
        content: "";
        pointer-events: none;
        background: #3273dc;
        position: absolute;
        top: -5px;
        left: -8px;
        right: -8px;
        bottom: -5px;
        border-radius: 4px;
        z-index: -999;
        opacity: 0;
        transition: opacity 0.2s ease 0s;
    }
    a.flow-item:hover:before {
        opacity: 1;
    }
    a.flow-item.router-link-active {
        color: #ffffff;
        cursor: default;
    }
    a.flow-item.router-link-active:before {
        opacity: 1;
    }
    .flow-section {
        background: rgb(245, 245, 245);
    }

    .nav.flow-topnav {
        background: #ffffff;
        margin-bottom: 0;
        a.header-item {
            padding: 10px 12px;
            position: relative;
            color: #363636;
            
            // font-size: 0.95rem;
            // margin-bottom: 0;
        }
        a.header-item:hover {
            color: #3273dc;
        }
        a.header-item.sub {
            font-size: 0.9rem;
            // color: #636363;
            &:before {
                top: -0.15rem;
            }
        }
        .header-item:before {
            display: block;
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            right: 0;                
            height: 2px;
            transform-origin: center center;
            transform: scaleX(0);
            background: #363636;
            transition: transform 150ms ease 0s, background 150ms ease 0s
        }
        .header-item.is-active:before, .header-item.router-link-exact-active:before {
            transform: scaleX(0.4);
        }
        .header-item:hover:before {
            transform: scaleX(0.8);
            background: #3273dc;
        }
    }
    .left-sidebar-toggle {
        color: #696969;
        background: #ffffff;
        border-radius: 3px;
        margin-left: 10px;
    }
    .left-sidebar-toggle.is-active {
        background: #f5f5f5;
    }
    .flow-body-padding {
        padding-left: 62px;
        padding-right: 32px;
    }
    .flow-body-margin {
        margin-left: 62px;
        margin-right: 32px;
    }
</style>
