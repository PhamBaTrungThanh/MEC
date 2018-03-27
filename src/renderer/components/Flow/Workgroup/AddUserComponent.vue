<template>
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content" style="overflow: unset">
            <transition name="appear" appear>
                <div class="box">
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <a class="delete" @click="$emit('close')"></a>
                            </div>
                        </div>
                        <div class="level-item">
                            <figure class="image" style="width: 180px">
                                <img src="~@/assets/images/illustration-invite-people.svg">
                            </figure>   
                        </div>
                    </div>
                    <div class="content">
                        <div class="level">
                            <div class="level-item">
                                <p class="title is-3">Thêm người vào {{workgroup.name}}</p>
                            </div>
                        </div>
                        <p class="is-size-6">
                            Người được thêm sẽ xem được những công việc mà nhóm đang thực hiện.
                        </p>
                        <div v-if="selectedUsers" class="field is-grouped is-grouped-multiline is-size-7">
                            <div class="control" v-for="userId in selectedUsers" :key="userId">
                                <div class="tags has-addons">
                                    <a class="tag is-delete" @click="removeUser(userId)"></a>
                                    <span class="tag is-info">{{user(userId).name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <input type="text" class="input is-info" v-focus v-model="username" ref="inputer">
                                <div class="add-user-panel" v-if="username">
                                    <div v-for="user in chooseUsers" :key="user.id" class="add-user-item" @click="manualAddUser(user.id)">
                                        <span class="icon">
                                            <i class="mdi mdi-plus"></i>
                                        </span>
                                        <span v-html="user.markup"></span>
                                    </div>
                                    <div class="add-user-item not-found" v-if="chooseUsers.length === 0">
                                        <span class="icon">
                                            <i class="mdi mdi-alert-circle-outline"></i>
                                        </span>
                                        <span>Không tìm thấy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="level">
                            <div class="level-left">
                                <p class="level-item">
                                    <button class="button is-light" :disabled="onSubmit" @click="$emit('close')">Hủy bỏ</button>
                                </p>
                            </div>
                            <div class="level-right">
                                <p class="level-item">
                                    <button :class="{'button': true, 'is-info': true, 'is-loading': onSubmit}" @click="submit">Lưu</button>
                                </p>
                            </div>
                        </div>    
                    </div>
                </div>
            </transition>
        <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
        </div>
        
    </div>
</template>

<script>
export default {
    name: `add-user`,
    props: {
        workgroupId: {
            type: Number,
        },
    },
    computed: {
        workgroup () {
            return this.$store.getters.workgroupById(this.workgroupId)
        },
        usersList () {
            const ignoredUsers = this.workgroup.users.map(user => {
                return user.id
            })
            ignoredUsers.push(...this.selectedUsers)
            const list = this.$store.getters.usersSortByName.reduce((users, user) => {
                if (ignoredUsers.indexOf(user.id) === -1) {
                    users.push({
                        id: user.id,
                        name: user.name,
                    })
                }
                return users
            }, [])
            return list
        },
        chooseUsers () {
            const length = this.username.length
            if (length > 0) {
                return this.usersList.reduce((users, user) => {
                    const needle = this.username.toLowerCase().trim()
                    const haystack = user.name.toLowerCase()
                    const index = haystack.indexOf(needle)
                    if (index !== -1) {
                        users.push({
                            id: user.id,
                            name: user.name,
                            markup: user.name.substr(0, index) + `<b>` + user.name.substr(index, length) + `</b>` + user.name.substr(index + length),
                        })
                    }
                    return users
                }, [])
            } else {
                return []
            }
        },
    },
    directives: {
        focus: {
            inserted (el) {
                el.focus()
            },
        },
    },
    data () {
        return {
            selectedUsers: [],
            onSubmit: false,
            resetTreeSelect: true,
            username: ``,
            inputError: false,
        }
    },
    methods: {
        buildUsersList (callback) {
            callback(null, this.usersList)
        },
        user (id) {
            return this.$store.getters.userById(id)
        },
        selectUser (value) {
            this.resetTreeSelect = false
            this.selectedUsers.push(value)
            this.resetTreeSelect = true
        },
        removeUser (id) {
            const index = this.selectedUsers.indexOf(id)
            if (index !== -1) {
                this.selectedUsers.splice(index, 1)
            }
        },
        manualAddUser (id) {
            this.selectedUsers.push(id)
            this.username = ``
            this.$refs.inputer.focus()
        },
        submit () {
            this.$store.dispatch(`addUsersToWorkgroup`, {
                selectedUsers: this.selectedUsers,
                workgroupId: this.workgroup.id,
            }).then(result => {
                if (result) {
                    this.$emit(`close`)
                }
            })
        },
    },
}
</script>

<style>
    .add-user-panel {
        background: #ffffff;
        border: 1px solid rgba(200, 200, 200, 0.5);
        position: absolute;
        left: 0;
        right: 0;
        max-height: 150px;
        transform: translateY(5px);
        border-radius: 2px;
        z-index: 999;
        overflow-y: auto;
        padding: 0.5rem 1rem;
    }
    .add-user-item {
        padding: 2px 3px;
        cursor: pointer;
        margin: 2px 0;
    }
    .add-user-item:not(.not-found):hover {
        background: rgba(200, 200, 200, 0.5);
    }
</style>
