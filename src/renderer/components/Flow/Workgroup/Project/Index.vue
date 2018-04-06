<template>
    <div class="project-dashboard">
        <router-link tag="div" v-for="workgroup in userWorkgroups" :key="workgroup.id" class="workgroup"
            :to="{name: 'project.dashboard', params: {workgroup_id: workgroup.id}}">
            <header class="header">
                <p class="title is-4">
                    {{workgroup.name}}
                </p>
            </header>   
        </router-link>
    </div>
</template>

<script>
export default {
    name: `project-index`,
    computed: {
        user () {
            return this.$store.getters.currentUser
        },
        userWorkgroups () {
            return (this.user) ? this.$store.getters.workgroupsForUser(this.user.id) : false
        },
    },
    data () {
        return {
            toggleSidebar: false,
        }
    },
}
</script>

<style lang="scss">
    .project-dashboard {
        padding-top: 3rem;
        .workgroup {
            padding: 1rem 2rem 3rem;
            background: #ffffff;
            margin-bottom: 1rem;
        }
    }
</style>
