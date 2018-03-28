<template>
    <div class="workgroup--wrapper">
        <div class="hero is-dark">
            <div class="hero-body">
                <p class="title has-text-centered">Danh sách phòng / nhóm</p>    
            </div>
        </div>
        <div class="workgroup--content">
            <div class="container is-fluid">
                <div v-for="workgroup in workgroups" :key="workgroup.id" class="group">
                    <header class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <p class="title is-4">
                                    <span class="icon">
                                        <i class="mdi mdi-chevron-down"></i>
                                    </span>
                                    <span>{{workgroup.name}}</span>
                                </p>
                            </div>
                            <div class="level-item dropdown-container">
                                <div class="dropdown is-hoverable">
                                    <div class="dropdown-trigger">
                                        <button class="button is-small" aria-haspopup="true" aria-controls="dropdown-menu">
                                            <span class="icon is-small">
                                                <i class="mdi mdi-dots-horizontal" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                                        <div class="dropdown-content">
                                            <a href="#" class="dropdown-item" @click="addUsersTo(workgroup.id)">
                                                Thêm người vào nhóm
                                            </a>
                                            <a class="dropdown-item" @click="editWorkgroup(workgroup.id)">
                                                Sửa nhóm
                                            </a>
                                            <hr class="dropdown-divider">
                                            <a href="#" class="dropdown-item has-text-danger">
                                                Rời nhóm
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <article class="workgroup-users">
                        <div v-for="user in workgroup.users" :key="user.id" class="user-card" @click="showPersonDetail(user.id)">
                            <div :class="{'user-header': true, 'is-leader': user.role === 'leader'}"></div>
                            <div class="user-content">
                                <span>{{user.name}}</span>
                            </div>
                            <div class="user-avatar">
                                <img :src="user.avatar">
                            </div>
                        </div>
                    </article>
                </div>
                <div class="add-new-workgroup" v-if="user.can_create_workgroup">
                    <p class="has-text-centered is-size-5">
                        <router-link tag="button" class="button is-outlined" :to="{name: 'workgroup.create'}">
                            <span class="icon">
                                <i class="mdi mdi-plus"></i>
                            </span>
                            <span>Thêm nhóm mới</span>
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
        <div class="modals-container">
            <add-user @close="closeModal" v-if="addUserModal === true" :workgroupId="activeWorkgroupId"></add-user>
            <edit-workgroup @close="closeModal" v-if="editWorkgroupModal === true" :workgroupId="activeWorkgroupId"></edit-workgroup>
        </div>
    </div>    
</template>

<script>
import { mapGetters } from 'vuex'
import AddUserComponent from './AddUserComponent'
import EditWorkgroupComponent from './EditWorkgroupComponent'
export default {
    name: `workgroup-index`,
    components: {
        AddUser: AddUserComponent,
        EditWorkgroup: EditWorkgroupComponent,
    },
    computed: {
        ...mapGetters({
            user: `currentUser`,
            workgroups: `workgroups`,
        }),
    },
    data () {
        return {
            addUserModal: false,
            editWorkgroupModal: false,
            activeWorkgroupId: 0,
        }
    },
    methods: {
        addUsersTo (workgroupId) {
            this.activeWorkgroupId = workgroupId
            this.addUserModal = true
            const escKey = window.document.addEventListener(`keyup`, event => {
                if (event.key === `Escape` || event.keyCode === 27) {
                    this.closeModal()
                    window.document.removeEventListener(`keyup`, escKey, false)
                }
            })
        },
        editWorkgroup (workgroupId) {
            this.activeWorkgroupId = workgroupId
            this.editWorkgroupModal = true
            const escKey = window.document.addEventListener(`keyup`, event => {
                if (event.key === `Escape` || event.keyCode === 27) {
                    this.closeModal()
                    window.document.removeEventListener(`keyup`, escKey, false)
                }
            })
        },
        closeModal () {
            this.activeWorkgroupId = 0
            this.addUserModal = false
            this.editWorkgroupModal = false
        },
        showPersonDetail (id) {
            this.$store.dispatch(`sideComponent`, {
                componentName: `person-detail`,
                props: {
                    user: {
                        id: id,
                    },
                },
            })
        },
    },
}
</script>

<style lang="scss">
    .workgroup--content {
        padding: 2rem 0; 
        .add-new-workgroup {
            margin-top: 2rem;
        }
        .group {
            border-bottom: 1px solid rgba(68, 68, 68, 0.1);
            padding-bottom: 2rem;
            padding-top: 1rem;

            .dropdown-container {
                display: none;
            }
            &:hover .dropdown-container {
                display: block;
            }
        }
    }
    .workgroup-users {
        display: flex;
    }
    .user-card {
        width: 110px;
        height: 130px;
        padding: 15px 8px;
        margin: 0 6px 11px 6px;
        box-shadow: 0px 1px 2px 0 rgba(0,0,0,0.15);       
        background: #ffffff;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
        user-select: none; /* Standard */
        &:hover {
            box-shadow: 0px 4px 6px 0 rgba(0,0,0,0.15);
        }

        .user-header {
            height: 25px;
            background: hsl(204, 86%, 53%);
            margin: -15px -8px 0;
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;
            cursor: move;
        }
        .user-header.is-leader {
            background: hsl(271, 100%, 71%);
        }
        .user-content {
            padding-top: 55px;
            text-align: center;
            font-size: 0.82rem;
        }
        .user-avatar {
            position: absolute;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            top: 13px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(255, 255, 255, 1);
            border: 2px solid #ffffff;
            box-shadow: 0px 0px 0px 1px rgba(85, 85, 85, 0.2);
            overflow: hidden;
        }
    }

</style>
