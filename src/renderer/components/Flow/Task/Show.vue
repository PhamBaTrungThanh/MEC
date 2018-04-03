<template>

</template>

<script>
export default {
    name: `show-task`,
    beforeRouteEnter (to, from, next) {
        if (!to.params.user_id) {
            next(vm => {
                vm.$router.push({
                    name: `task.user`,
                    params: {
                        user_id: vm.$store.getters.currentUser,
                    },
                })
            })
        }
    },
}
</script>

<style>

</style>
