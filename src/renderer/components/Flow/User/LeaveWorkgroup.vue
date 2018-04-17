<template>
    <transition appear name="slide-left">
        <div class="leave-workgroup-container">
            <div class="body">
                <sweet-icon type="error"></sweet-icon>
                <p class="title has-text-centered is-4 is-spaced">
                    <span v-if="currentUser.id === user.id">Bạn có muốn rời khỏi <b>{{workgroup.name}}</b>?</span>
                    <span v-else>Bạn muốn xóa <b>{{user.name}}</b> khỏi <b>{{workgroup.name}}</b>?</span>
                </p>
                <p class="subtitle is-6 has-text-centered">
                    <span>(Hành động này không thể khôi phục)</span>
                </p>
            </div>
            <div class="foot">
                <p class="field">
                    <button class="button is-dark is-large is-expanded" @click="confirmDelete">Có, tôi chắc chắn!</button>
                </p>
                <p class="has-text-centered">
                    <button class="button is-light is-expanded" @click="backToUser">Bỏ qua</button>
                </p>
            </div>
            <div class="close">
                <back-link @click="backToUser">Quay lại</back-link>
            </div>
        </div>
    </transition>
</template>

<script>
import BackLink from '@/components/components/BackLink'
export default {
    name: `leave-workgroup`,
    components: {
        BackLink,
    },
    computed: {
        currentUser () {
            return this.$store.getters.currentUser
        },
        user () {
            return this.$store.getters.userById(this.props.user.id)
        },
        workgroup () {
            return this.$store.getters.workgroupById(this.props.workgroup.id)
        },
        props () {
            return this.$store.getters.secondaryProps
        },
    },
    methods: {
        backToUser () {
            this.$store.dispatch(`sideComponent`, {
                componentName: `person-detail`,
                props: {
                    user: {
                        id: this.user.id,
                    },
                },
            })
        },
        confirmDelete () {
            this.$store.dispatch(`removeUserFromWorkgroup`, {
                userId: this.user.id,
                workgroupId: this.workgroup.id,
            }).then(result => {
                if (result) {
                    const workgroups = this.$store.getters.workgroupsForUser(this.user.id)
                    if (workgroups.length > 0) {
                        this.backToUser()
                    } else {
                        this.$store.dispatch(`sideComponentOff`)
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss">
    .leave-workgroup-container {
        padding: 2rem 2.5rem;
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 0;
        top: 0;
        .body {
            flex: 1 1 0;
            padding: 2rem 0;
        }
        .close {
            position: absolute;
            top: 0;
            left: -1rem;
            right: -1rem;
            height: 3rem;
            background: #fff;
            display: flex;
            align-items: center;
            padding-left: 1rem;
        }
    }
</style>
