<template>
    <div>
        <p class="title is-4">Đổi mật khẩu</p>
        <hr />
        <div class="field">
            <label class="label">Nhập mật khẩu mới</label>
            <div class="control has-icons-left">
                <input type="password" :class="{'input': true, 'is-danger': errors.any()}" v-validate="{is: password}" name="password" ref="password"/>
                <span class="icon">
                    <i class="mdi mdi-lock"></i>
                </span>
                <p class="help is-danger" v-show="errors.firstByRule('password', 'is')">
                    Mật khẩu không khớp
                </p>   
            </div>
        </div>
        <div class="field">
            <label class="label">Nhập lại mật khẩu</label>
            <p class="control has-icons-left">
                <input type="password" :class="{'input': true, 'is-danger': errors.any()}" name="password_confirm" v-model="password" ref="password_confirm"/>
                <span class="icon">
                    <i class="mdi mdi-lock-outline"></i>
                </span>
            </p>
        </div>
        <div class="field is-grouped is-grouped-centered">
            <p class="control">
                <button :class="{'button': true, 'is-link': true, 'is-loading': onSubmit}" @click="submit">Xác nhận</button>
            </p>
            <p class="control">
                <button :class="{'button': true, 'is-outlined': true}" :disabled="onSubmit" @click="cancel">Hủy bỏ</button>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: `change-password`,
    data () {
        return {
            onSubmit: false,
            password: ``,
            password_confirm: ``,
        }
    },
    methods: {
        submit () {
            if (!this.errors.any() && this.password) {
                this.onSubmit = true
                this.axios.patch(`user/${this.$store.getters.currentUser.user_id}`, {
                    action: `change_password`,
                    password: this.password,
                }).then(response => {
                    if (response.status === 200) {
                        this.swal({
                            title: `Thành công`,
                            text: `Đã đổi mật khẩu`,
                            type: `success`,
                            timer: 3000,
                        })
                        this.cancel()
                    }
                })
            }
        },
        cancel () {
            this.onSubmit = false
            this.$refs.password.value = ``
            this.$refs.password_confirm.value = ``
            this.password = ``
            this.errors.clear()
        },
    },
}
</script>
