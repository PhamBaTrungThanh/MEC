<template>
    <content-sidebar v-scroll-spy="{selector: '.scroll-spy-holder', linksSelector: '.scroll-spy-links a'}">
        <aside class="menu" slot="sidebar">
            <p class="menu-label">Tùy chọn</p>
            <ul class="menu-list scroll-spy-links">
                <li>
                    <a ref="change_password">Đổi mật khẩu</a>
                </li>
                <li>
                    <a ref="logout">Đăng xuất</a>
                </li>
            </ul>   
        </aside>
        <div class="scroll-spy-holder">
            <change-password class="sector"/>
            <logout class="sector" />
        </div>
    </content-sidebar>
</template>

<script>
import ContentSidebar from '@/components/Layouts/ContentSidebar'
import Logout from './Logout'
import ChangePassword from './ChangePassword'
export default {
    name: `options`,
    components: {
        ContentSidebar,
        ChangePassword,
        Logout,
    },
    mounted () {
        if (this.$router.query) {
            if (this.$router.query.goto) {
                switch (this.$router.query.goto) {
                case `change_password`:
                    this.$refs.change_password.click()
                    break
                case `logout`:
                    this.$refs.logout.click()
                    break
                default:
                    break
                }
            }
        }
    },
}
</script>
