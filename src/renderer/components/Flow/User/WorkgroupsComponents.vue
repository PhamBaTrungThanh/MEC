<template>
    <div class="user-workgroups-container">
        <p class="subtitle is-6 is-uppercase">
            <span v-if="workgroups">{{workgroups.length}} nhóm:</span>
            <span v-else>Không ở trong nhóm nào</span>
        </p>
        <div class="workgroup-bit" v-for="workgroup in workgroups" :key="workgroup.id">
            <div class="bit-content">
                <p class="lead title is-5">            
                    <input type="checkbox" class="checkbox-menu" :id="`checkbox_${workgroup.id}`">
                    <label :for="`checkbox_${workgroup.id}`">
                        <span>{{workgroup.name}}</span>
                        <span class="icon">
                            <i class="mdi mdi-chevron-down"></i>
                        </span>
                    </label>
                    <span class="menu">
                        <a class="has-text-danger" @click="leaveWorkgroup(workgroup.id)">
                            Xóa
                        </a>
                    </span>
                </p>
                <p class="subtitle is-6">
                    Đang thực hiện xx công việc
                </p>
            </div>
            <div class="view-task">
                <router-link class="is-link button" :to="{name: 'task.mytask', query: {workgroups: [workgroup.id]}}">Xem chi tiết</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: `workgroups`,
    props: {
        user: {
            type: Object,
        },
        workgroups: {
            type: Array,
            default: [],
        },
    },
    data () {
        return {
            show: false,
        }
    },
    methods: {
        leaveWorkgroup (workgroupId) {
            this.$store.dispatch(`sideComponent`, {
                componentName: `leave-workgroup`,
                props: {
                    user: {
                        id: this.user.id,
                    },
                    workgroup: {
                        id: workgroupId,
                    },
                },
            })
        },
    },
}
</script>

<style lang="scss">
    .user-workgroups-container {
        padding: 1rem 2rem;

        .workgroup-bit {
            background: rgba(200, 200, 200, 0.3);
            border-radius: 3px;
            display: flex;
            align-items: center;
            padding: 1.5rem 1.2rem;
            margin-bottom: 1.5rem;
            .bit-content {
                flex: 1 1 0;
            }
            .lead.title {
                position: relative;
                .checkbox-menu {
                    display: none;
                }
                .checkbox-menu + label {
                    cursor: pointer;
                }
                .checkbox-menu:checked + label span.icon {
                    color: hsl(204, 86%, 53%);
                }
                .checkbox-menu:checked + label + .menu {
                    opacity: 1;
                }
                .menu {
                    opacity: 0;
                    left: 0;
                    top: calc(100% + 5px);
                    position: absolute;
                    background: #ffffff;
                    z-index: 9;
                    padding: 0.75rem 1rem;
                    width: 75%;
                    border-radius: 2px;
                    border: 1px solid #ccc;
                    transition: opacity 120ms ease 0s;
                    a {
                        display: block;
                        width: 100%;
                        padding: 5px 3px;
                    }
                    a:hover {
                        background: rgba(200, 200, 200, 0.2)
                    }
                }
            }
        }
    }
</style>
