<template>
    <div id="login-form" class="hero is-fullheight" v-if="$store.state.App.requestLogin">
        <div class="hero-body">
            <div class="container">
                <p class="subtitle has-text-centered is-3">
                    <span>Đăng nhập</span>
                </p>
                <p class="avatar">

                </p>
                <div class="content">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control has-icons-left">
                            <input type="text" :class="{'input': true, 'is-danger': (errors.has('email') || invalidCredentials) ? true : false}" v-model="username" :disabled="onSubmit" @keyup.enter="submit" v-validate="'required'" name="email" />
                            <span class="icon is-left">
                                <i class="mdi mdi-account"></i>
                            </span>
                        </div>
                        <p class="help has-text-danger">
                            <span v-if="errors.firstByRule('email', 'required')">Email không được để trống</span>
                            <span v-if="errors.firstByRule('email', 'email')">Email không hợp lệ</span>
                            <span v-if="invalidCredentials">Email hoặc mật khẩu không đúng.</span>
                        </p>
                    </div>
                    <div class="field">
                        <label class="label">Mật khẩu</label>
                        <div class="control has-icons-left">
                            <input type="password" :class="{'input': true, 'is-danger': (errors.has('password') || invalidCredentials) ? true : false}" v-model="password" :disabled="onSubmit" @keyup.enter="submit" name="password" v-validate="'required'"/>
                            <span class="icon is-left">
                                <i class="mdi mdi-lock"></i>
                            </span>
                        </div>
                        
                    </div>
                </div>
                <p class="content has-text-centered">
                    <button :class="{'button': true, 'is-primary': true, 'is-loading': onSubmit}" @click="submit">
                        <span class="icon">
                            <i class="mdi mdi-login"></i>
                        </span>
                        <span>Đăng nhập</span>
                    </button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: `login-form`,
    data () {
        return {
            username: ``,
            password: ``,
            onSubmit: false,
            invalidCredentials: false,
        }
    },
    methods: {
        submit () {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.onSubmit = true
                    this.$store.dispatch(`appLogin`, {
                        username: this.username,
                        password: this.password,
                    }).then(result => {
                        if (result.status === 401) {
                            this.invalidCredentials = true
                            this.onSubmit = false
                            this.password = ``
                        } else {
                            this.$store.dispatch(`fetchAllResources`)
                            this.$router.push({
                                name: `work.index`,
                            })
                        }
                    })
                }
            })
        },
    },
}
</script>

