<template>
    <div :class="{'is-editable-text': true, 'on-edit': onEdit, 'on-submit': isProcessing, 'is-date': isDate, 'on-error': isError}" @click="toogleEdit">
        <span :class="{'display-text': true, 'no-info': displayText.noInfo}">{{displayText.value}}</span>
        <div :class="{'editor-control': true, 'control': true, 'is-loading': isProcessing}">
            <input 
                v-if="!isDate"
                type="text"
                class="editor"
                ref="editor"
                v-model="editValue"
                @keyup="onKeyUp($event)" 
                @blur="onBlur"/>
            <cleave 
                v-else
                class="editor"
                ref="editor"
                v-model="editValue"
                :options="cleaveOptions"
                :value="text"
                :raw="false"
            ></cleave>
            <span class="editor-mark"></span>
            <v-date-picker
                class="date-picker-editor"
                mode="single"
                show-caps
                is-inline
                v-model="dateValue"
                :formats="formats"
                v-if="isDate && !onSubmit"
                titleTransition="none"
                weeksTransition="none"
                datePickerShowDayPopover="none"
                >
            </v-date-picker>

        </div>
        <span class="icons-holder">
            <span class="tag is-info tag-button" v-if="isDate && isDirty && !isError && onEdit" @click.prevent.stop="processing">Lưu</span>
            <span class="tag is-light tag-button" v-if="isDate && onEdit" @click="exitEditor">Hủy</span>
            <span class="icon">
                <i class="mdi mdi-pencil"></i>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: `editable-text`,
    props: {
        text: {
            type: String,
            default: ``,
        },
        type: {
            type: String,
            default: `string`,
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        displayText () {
            if (this.text) {
                return {
                    value: this.text,
                    noInfo: false,
                }
            } else {
                return {
                    value: `Chưa cập nhật`,
                    noInfo: true,
                }
            }
        },
        cleaveOptions () {
            return this.$store.getters.cleaveOptions.date
        },
        isDate () {
            return this.type === `date`
        },
        isError () {
            if (this.isDate) {
                if (!/\d{2}\/\d{2}\/\d{4}/g.test(this.editValue)) {
                    return true
                }
            }
            if (this.required) {
                if (!this.editValue) {
                    return true
                }
            }
            return false
        },
        dateValue: {
            get () {
                if (!this.type === `date`) {
                    return false
                }
                const parts = this.editValue.split(`/`).map(t => parseInt(t))
                return new Date(parts[2], parts[1] - 1, parts[0])
            },
            set (date) {
                const day = (date.getDate() <= 9) ? `0${date.getDate()}` : date.getDate()
                const month = (date.getMonth() <= 8) ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1
                this.editValue = `${day}/${month}/${date.getFullYear()}`
            },
        },
        isDirty () {
            const value = (this.editValue) ? this.editValue.trim() : null
            if (value === this.text) {
                return false
            }
            return true
        },
        isProcessing () {
            if (this.onSubmit) {
                if (this.text !== this.innerValue) {
                    // change happened
                    this.innerValue = this.text
                    this.onSubmit = false
                    this.onEdit = false
                    return false
                }
                return true
            }
            return false
        },
    },
    data () {
        return {
            onEdit: false,
            editValue: ``,
            onSubmit: false,
            innerValue: ``,
            formats: {
                title: `MM / YYYY`,
                input: [`DD/MM/YYYY`],
                navMonths: `MM`,
                dayPopover: `DD/MM/YYYY`,
            },
        }
    },
    methods: {
        toogleEdit () {
            if (this.onEdit) {
                return false
            }
            this.onEdit = true
            this.$nextTick(() => {
                if (this.isDate) {
                    this.$refs.editor.$el.focus()
                } else {
                    this.$refs.editor.focus()
                }
            })
        },
        exitEditor ($event) {
            this.onEdit = false
            this.editValue = this.text
            $event.preventDefault()
            $event.stopPropagation()
            return false
        },
        onBlur () {
            if (!this.isDirty) {
                this.onEdit = false
                return false
            }
            this.processing()
        },
        processing () {
            if ((this.text === ``) && (this.text === this.editValue)) {
                this.onEdit = false
                return false
            }
            if (this.isError) {
                return false
            }
            this.onSubmit = true
            this.$emit(`edited`, this.editValue)
        },
        onKeyUp ($event) {
            if ($event.key === `Escape`) {
                // Exit editor
                this.editValue = this.text
                this.onEdit = false
                return false
            }
            if ($event.key === `Enter` || $event.key === `ArrowUp` || $event.key === `ArrowDown`) {
                if (!this.isDirty) {
                    this.onEdit = false
                } else {
                    this.processing()
                }
                if ($event.key === `ArrowUp`) {
                    this.$emit(`move-up`)
                }
                if ($event.key === `ArrowDown`) {
                    this.$emit(`move-down`)
                }
                return false
            }
            return true
        },
    },
    created () {
        this.editValue = this.text
        this.innerValue = this.text
    },
}
</script>

<style lang="scss">
    .is-editable-text {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        font-size: 1em;
        cursor: text;
        .display-text {
            display: block;
            flex: 1 1 0;
        }
        .display-text.no-info {
            font-style: italic;
            font-size: 0.9em;
            font-weight: 300;
        }
        .date-picker-editor {
            position: absolute;
            z-index: 9;
            top: calc(100% + 7px);
        }
        .editor-control {
            display: none;
            flex: 1 1 0;
        }
        .editor {
            display: block;
            width: 100%;
            font-size: 1em;
            border: none;
        }
        .editor-mark {
            display: block;
            content: "";
            height: 2px;
            left: 0;
            width: calc(100% + 1.5rem);
            bottom: -5px;
            background: hsl(204, 86%, 53%);
            position: absolute;
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform 150ms ease 0s, background 150ms ease 0s;
        }
        .editor:focus {
            border: none;
            outline: none;
        }
        .editor:focus + .editor-mark {
            transform: scaleX(1);
        }
        .icons-holder {
            opacity: 0;
            transition: opacity 150ms ease 0s;
            .tag-button {
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
            
        }
    }
    .is-editable-text:hover {
        .icons-holder {
            opacity: 1;
        }
    }
    .is-editable-text.on-edit {
        .display-text {
            display: none;
        }
        .editor-control {
            display: block;
        }
        .icons-holder {
            opacity: 1;
        }        
    }
    .is-editable-text.on-submit {
        .display-text {
            display: none;
        }
        .editor-control {
            display: block;
        }
        .editor-control:after {
            top: 0.125em;
        }
        .icons-holder {
            display: none;
        }       
        .editor-mark {
            visibility: hidden;
        }
    }
    .is-editable-text.on-error {
        .editor-mark {
            background: hsl(14, 100%, 53%);
            transform: scaleX(1);
        }
    }
</style>
