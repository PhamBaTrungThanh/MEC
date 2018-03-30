<template>
    <div class="personal-info-container">
        <div class="table-div">
            <div class="table-row" v-for="(field, index) in userData" :key="index">
                <div class="table-cell">{{field.label}}</div>
                <div class="table-cell">
                    <editable-text :text="user[field.computerName]" :type="field.type" @edited="edited($event, field.computerName)" :ref="`edit_${index}`" @move-up="move(index - 1)" @move-down="move(index + 1)"></editable-text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EditableText from '@/components/Components/EditableText'
export default {
    name: `personal-info`,
    components: {
        EditableText,
    },
    props: {
        user: {
            type: Object,
        },
    },
    data () {
        return {
            onSubmit: false,
            userData: [
                {
                    label: `Mã Nhân Viên`,
                    computerName: `UID`,
                },
                {
                    label: `Số CMT`,
                    computerName: `id_number`,
                },
                {
                    label: `Ngày sinh`,
                    computerName: `birthday`,
                    type: `date`,
                },
                {
                    label: `Quê quán`,
                    computerName: `native_place`,
                },
                {
                    label: `SĐT`,
                    computerName: `phone_number`,
                },
                {
                    label: `Địa chỉ`,
                    computerName: `address`,
                },
                {
                    label: `Nơi làm việc`,
                    computerName: `workplace`,
                },
                {
                    label: `Ngày làm việc`,
                    computerName: `joined_at`,
                },
                {
                    label: `Công việc hiện tại`,
                    computerName: `current_job`,
                },
                {
                    label: `Nơi làm việc hiện tại`,
                    computerName: `current_workplace`,
                },
                {
                    label: `Tình trạng hôn nhân`,
                    computerName: `mariage_status`,
                },
                {
                    label: `Tình trạng gia đình`,
                    computerName: `family_status`,
                },
            ],
        }
    },
    methods: {
        edited ($event, computerName) {
            this.$store.dispatch(`updateUserInfo`, {
                computerName: computerName,
                id: this.user.id,
                value: $event,
            })
        },
    },
}
</script>

<style lang="scss">
    .personal-info-container {
        div.table-div {
            display: table;
            margin-bottom: 2rem;
            div.table-row {
                display: table-row;
                position: relative;

                &:not(:first-child):after {
                    display: block;
                    content: "";
                    background: rgba(100, 100, 100, 0.2);
                    position: absolute;
                    height: 1px;
                    left: 0.75rem;
                    right: 0.75rem;
                }

                div.table-cell {
                    display: table-cell;
                    padding: 0.70rem 0.75rem;

                    &:first-child {
                        width: 1px;
                        white-space: nowrap;
                    }
                    &:last-child {
                        width: 100%;
                        div.control.is-date {
                            span.tag {
                                position: absolute;
                                right: 0.5rem;
                                top: 50%;
                                transform:  perspective(1px) translateY(-50%);
                                opacity: 0;
                                transition: opacity 0.15s ease 0s;
                                cursor: pointer;
                                &:hover {
                                    text-decoration: underline;
                                }
                            }
                            input.input:focus + span.tag {
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
