<template>
    <div class="project-container">
        <nav class="nav flow-padding level flow-topnav">
            <div class="level-left">
                <a :class="{'left-sidebar-toggle': true, 'is-active': toggleSidebar}" @click="toggleSidebar = !toggleSidebar">
                    <span class="icon">
                        <i class="mdi mdi-google-physical-web"></i>
                    </span>
                </a>
                <a class="header-item">
                    <span>Danh sách nhóm</span>
                    <span class="icon">
                        <i class="mdi mdi-chevron-down"></i>
                    </span>
                </a>
                <router-link :to="{name: 'project.dashboard', params: {workgroup_id: workgroup.id}}" v-for="workgroup in userWorkgroups" :key="workgroup.id" class="header-item sub">
                    {{workgroup.name}}
                </router-link>
            </div>
            <div class="level-right" v-if="false">
                <div class="dropdown">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span>Content</span>
                            <span class="icon is-small">
                                <i class="mdi mdi-chevron-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <div class="project-body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: `project-base`,
    computed: {
        user () {
            return this.$store.getters.currentUser
        },
        userWorkgroups () {
            return (this.user) ? this.$store.getters.workgroupsForUser(this.user.id) : false
        },
        activeWorkgroupId () {
            return parseInt(this.$route.params.workgroup_id) || false
        },
    },
    data () {
        return {
            toggleSidebar: false,
        }
    },
}
</script>
