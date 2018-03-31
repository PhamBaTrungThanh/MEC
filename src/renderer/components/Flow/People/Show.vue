<template>
    <div class="person-detail-container">
        <div class="avatar-holder">
            <img :src="user.avatar" alt="">
        </div>
        <p class="title has-text-centered is-4 is-spaced">
            {{user.name}}
        </p>
        <p class="subtitle is-6 has-text-centered">
            <a :href="`mailto:${user.email}`">{{user.email}}</a>
        </p>
        <div class="tabs is-centered">
            <ul>
                <li :class="{'is-active': activeTab === 'jobs'}"><a @click="activeTab = 'jobs'">Công việc</a></li>
                <li :class="{'is-active': activeTab === 'personal-info'}"><a @click="activeTab = 'personal-info'">Thông tin cá nhân</a></li>
            </ul>
        </div>
        <div class="tabs-content">
            <workgroups :user="user" v-if="activeTab === 'jobs'" :workgroups="workgroups"></workgroups>
            <personal-info v-if="activeTab === 'personal-info'" :user="user"></personal-info>
        </div>
    </div>
</template>

<script>
import Workgroups from './WorkgroupsComponents'
import PersonalInfo from './PersonalInfoComponent'
export default {
    name: `person-detail`,
    components: {
        PersonalInfo,
        Workgroups,
    },
    computed: {
        props () {
            // reset active tab when props change
            this.activeTab = `jobs`
            return this.$store.getters.secondaryProps
        },
        user () {
            return this.$store.getters.userById(this.props.user.id)
        },
        workgroups () {
            if (this.user) {
                return this.$store.getters.workgroupsForUser(this.user.id)
            }
            return false
        },
    },
    data () {
        return {
            activeTab: `jobs`,
        }
    },
}
</script>

<style lang="scss">
    .avatar-holder {
        margin: 0.5rem auto 2rem;
        width: 150px;
        height: 150px;
        overflow: hidden;
        border-radius: 50%;
        position: relative;
        box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.25);
        border: 2px solid #fff;
    }
</style>
