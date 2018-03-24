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
                        <div class="field">
                            <treeselect :load-root-options="buildUsersList" :closeOnSelect="true" :limit="3" placeholder="Nhập tên" v-validate="'required'" name="user_list" @close="selectUser"></treeselect>
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
    },
    data () {
        return {
            selectedUsers: [],
        }
    },
    methods: {
        buildUsersList (callback) {
            const ignoredUsers = this.workgroup.users.map(user => {
                return user.id
            })
            ignoredUsers.push(...this.selectedUsers)
            console.log(ignoredUsers)
            const users = this.$store.getters.usersSortByName
            const list = users.map(user => {
                return {
                    id: user.id,
                    label: user.name,
                    isDisabled: (ignoredUsers.indexOf(user.id) !== -1),
                }
            })
            callback(null, list)
        },
        selectUser (value) {
            this.selectedUsers.push(value)
        },
    },
}
</script>

<style>

</style>
