<template>
    <div class="my-task-container">
        <header class="header flow-padding">
            <a class="header-item title active">Của tôi</a>
        </header>
    </div>
</template>

<script>
export default {
    name: `for-user`,
    computed: {
        user () {
            return this.$store.getters.userById(this.$route.params.user_id)
        },
        workgroupIds () {
            return this.$router.query.workgroups
        },
        workgroups () {
            if (this.user) {
                return this.$router.getters.workgroupsForUser(this.user.id)
            }
            return false
        },
    },
}
</script>

<style lang="scss">
    .my-task-container {
        .header {
            display: flex;
            align-items: center;
            background: #ffffff;
            a.header-item {
                padding: 10px 12px;
                position: relative;
                color: #363636;
                text-transform: uppercase;
                font-size: 0.95rem;
            }
            a.header-item:hover {
                color: #3273dc;
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
            .header-item.active:before {
                transform: scaleX(0.4);
            }
            .header-item:hover:before {
                transform: scaleX(0.8);
                background: #3273dc;
            }
        }
    }
</style>
