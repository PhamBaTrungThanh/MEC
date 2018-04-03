<template>
    <div class="my-task-container">
        <nav class="nav flow-padding level">
            <div class="level-left">
                <router-link class="header-item title all-workgroup" :to="{name: 'task.user', query: {all: true}, params: {user_id: user.id}}">Tất cả</router-link>
                <!--
                <router-link 
                    v-for="workgroup in workgroups" 
                    :key="workgroup.id" 
                    :class="{'header-item': true, 'title': true, 'sub-workgroup': true, 'is-active': checkActive(workgroup.id)}"
                    :to="{name: 'task.user', params: {user_id: user.id}, query: {workgroups: [workgroup.id]}}"
                    >
                    {{workgroup.name}}
                </router-link>
                -->
            </div>
            <div class="level-right" v-if="false">
                <div class="dropdown">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu2">
                            <span>Content</span>
                            <span class="icon is-small">
                                <i class="mdi mdi-chevron-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <header class="header flow-padding level">
            <div class="level-left">
                <img :src="user.avatar" :alt="user.name" class="avatar level-item">
                <a :class="{'level-item':true, 'view-type': true, 'is-active': viewType === 'list'}" @click="switchViewType('list')">
                    <span class="icon">
                        <i class="mdi mdi-format-list-bulleted"></i>
                    </span>
                    <span>Danh sách</span>
                </a>
                <a :class="{'level-item':true, 'view-type': true, 'is-active': viewType === 'calendar'}" @click="switchViewType('calendar')">
                    <span class="icon">
                        <i class="mdi mdi-calendar"></i>
                    </span>
                    <span>Lịch</span>
                </a>
            </div>
        </header>
        <div class="body flow-padding">
            
        </div>
    </div>
</template>

<script>
export default {
    name: `for-user`,
    computed: {
        user () {
            const userId = this.$route.params.user_id || this.$store.getters.currentUser.id
            return this.$store.getters.userById(userId)
        },
        workgroupIds () {
            return this.$route.query.workgroups
        },
        workgroups () {
            if (this.user) {
                return this.$store.getters.workgroupsForUser(this.user.id)
            }
            return false
        },
        viewAll () {
            return this.$route.query.all
        },
        activeWorkgroups () {
            if (this.workgroups) {
                if (this.viewAll) {
                    return this.workgroups
                }
                return this.workgroups.reduce((workgroups, workgroup) => {
                    if (this.workgroupIds.indexOf(workgroup.id)) {
                        workgroups.push(workgroup)
                    }
                    return workgroups
                }, [])
            }
            return false
        },
    },
    data () {
        return {
            viewType: `list`,
        }
    },
    methods: {
        checkActive (id) {
            if (this.workgroupIds) {
                return this.workgroupIds.indexOf(id) !== -1
            }
            return false
        },
        switchViewType (type) {
            this.viewType = type
        },
    },
}
</script>

<style lang="scss">
    .my-task-container {
        & > .nav {
            background: #ffffff;
            margin-bottom: 0;
            a.header-item {
                padding: 10px 12px;
                position: relative;
                color: #363636;
                text-transform: uppercase;
                font-size: 0.95rem;
                // margin-bottom: 0;
            }
            a.header-item:hover {
                color: #3273dc;
            }
            a.header-item.sub-workgroup {
                font-size: 0.85rem;
                &:before {
                    top: -0.15rem;
                }
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
            .header-item.is-active:before, .header-item.router-link-exact-active:before {
                transform: scaleX(0.4);
            }
            .header-item:hover:before {
                transform: scaleX(0.8);
                background: #3273dc;
            }
        }
        & > .header {
            background: #ffffff;
            margin-bottom: 0;
            border-bottom: 1px solid #eee;
            box-shadow: inset 0 2px 2px -1px rgba(0,0,0,0.2);
            padding-top: 1rem;
            padding-bottom: 1rem;
            img.avatar {
                width: 40px;
                height: 40px;
                display: block;
                border-radius: 50%;
                transition: border-radius 0.15s ease 0s;
                object-fit: cover;
                margin-right: 30px;
            }
            .view-type {
                color: #999999;
            }
            .view-type:hover {
                color: #4a4a4a;
            }
            .view-type.is-active {
                color: #3273dc;
            }
            &:hover {
                img.avatar {
                    border-radius: 0;
                }
            }

        }
        .body {

        }
    }
</style>
