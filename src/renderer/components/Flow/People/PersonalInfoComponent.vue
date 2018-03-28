<template>
    <div class="personal-info-container">
        <div class="table-div">
            <div class="table-row" v-for="(field, index) in userData" :key="index">
                <div class="table-cell">{{field.label}}</div>
                <div class="table-cell" @click="editUserInfo(field, $event)">
                    <span v-show="!field.editing">{{user[field.computerName]}}</span>
                    <div :class="{'control': true, 'is-loading': field.onSubmit, 'is-date': field.isDate}" v-show="field.editing">
                        <input v-if="!field.isDate"
                            type="text"
                            class="input"
                            :data-name="field.computerName"
                            v-model="field.value"
                            @blur="edited(field, `blur`)"
                            @keyup.esc="cancelEdit(field)"
                            @keyup.enter="edited(field, `enter`)"
                            @keyup.up="edited(field, `up`)"
                            @keyup.down="edited(field, `down`)"
                        >
                        <cleave v-if="field.isDate" 
                            :data-name="field.computerName"
                            :options="options.date"
                            v-model="field.value"
                            :class="{'input': true, 'is-danger': errors.has('user_birthday')}"
                            name="user_birthday"
                            v-validate.initial="'date_format:DD/MM/YYYY'"
                            :raw="false"
                            :disabled="field.onSubmit"
                        ></cleave>
                        <span v-if="field.isDate && !errors.has('user_birthday')" class="tag is-info" @click="edited(field, `click`)">Lưu</span>
                        <span v-if="field.isDate && errors.has('user_birthday')" class="tag is-light" @click="cancelEdit(field, true)">Hủy</span>
                    </div>
                    <span class="edit-holder" v-show="!field.editing">
                        <span class="icon">
                            <i class="mdi mdi-pencil"></i>
                        </span>
                    </span>
                </div>
            </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button class="button is-info" :disabled="true">Lưu</button>
            </div>
            <div class="control">
                <button class="button is-light" :disabled="true">Hủy</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: `personal-info`,
    props: {
        user: {
            type: Object,
        },
    },
    computed: {
        options () { return this.$store.getters.cleaveOptions },
    },
    data () {
        return {
            onSubmit: false,
            userData: [
                {
                    label: `Mã Nhân Viên`,
                    computerName: `UID`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Số CMT`,
                    computerName: `id_number`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Ngày sinh`,
                    computerName: `birthday`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                    isDate: true,
                },
                {
                    label: `Quê quán`,
                    computerName: `native_place`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `SĐT`,
                    computerName: `phone_number`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Địa chỉ`,
                    computerName: `address`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Nơi làm việc`,
                    computerName: `workplace`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Ngày làm việc`,
                    computerName: `joined_at`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Công việc hiện tại`,
                    computerName: `current_job`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Nơi làm việc hiện tại`,
                    computerName: `current_workplace`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Tình trạng hôn nhân`,
                    computerName: `mariage_status`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
                {
                    label: `Tình trạng gia đình`,
                    computerName: `family_status`,
                    editing: false,
                    value: ``,
                    originalValue: ``,
                    onSubmit: false,
                },
            ],
        }
    },
    methods: {
        editUserInfo (field, $event) {
            if (field.value === ``) {
                field.value = this.user[field.computerName]
                field.originalValue = field.value
            }
            field.editing = true
            this.$nextTick(() => {
                document.querySelector(`input[data-name=${field.computerName}]`).focus()
            })
        },
        edited (field, mode) {
            field.value = (field.value) ? field.value.trim() : ``
            if (this.cancelEdit(field)) {
                return false
            } else {
                if (field.value !== field.originalValue) {
                    field.onSubmit = true
                    this.$store.dispatch(`updateUserInfo`, {
                        computerName: field.computerName,
                        id: this.user.id,
                        value: field.value,
                    }).then(result => {
                        if (result) {
                            field.onSubmit = false
                            field.originalValue = field.value
                            field.editing = false
                        }
                    })
                }
            }
        },
        cancelEdit (field, force = false) {
            if (force) {
                console.log(force)
                field.value = field.originalValue
                field.editing = false
                return false
            }
            if (field.value.trim() === field.originalValue) {
                field.editing = false
                return true
            }
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
                        position: relative;

                        .edit-holder {
                            position: absolute;
                            right: 0.75rem;
                            opacity: 0;
                        }
                        &:hover > .edit-holder {
                            opacity: 1;
                        }
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
