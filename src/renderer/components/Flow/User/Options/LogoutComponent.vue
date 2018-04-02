<template>
    <div>
        <p class="title is-4">Đăng xuất</p>
        <hr />
        <p>

        </p>
        <p class="title is-4 has-text-centered">
            Bạn có muốn đăng xuất khỏi ca làm việc hiện tại?
        </p>
        <p class="has-text-centered">
            <button class="is-danger button" @click="$store.dispatch('appLogout')">
                <span class="icon">
                    <i class="mdi mdi-logout"></i>
                </span>
                <span>Đăng xuất</span>
            </button>
        </p>
    </div>
</template>

<script>
export default {
    name: `logout`,
}
</script>
