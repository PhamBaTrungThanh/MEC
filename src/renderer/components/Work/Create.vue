<template>
    <div class="create_work--wrapper">
        <hero-header :page="pageMeta" />
        <div class="navbar has-shadow">
            <div class="container">
                <div class="navbar-tabs">
                    <router-link :to="{'name': 'work.index'}" class="navbar-item is-tab">
                        <span class="icon">
                            <i class="mdi mdi-chevron-left"></i>
                        </span>
                        <span>Quay lại</span>
                    </router-link>
                </div>
            </div>
        </div>
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2 box">
                        <div class="content">
                            <p class="title is-3">Tạo công trình mới</p>
                            <hr>
                            <div class="field">
                                <label for="" class="label">Tên công trình</label>
                                <div class="control">
                                    <input type="text" :class="{'input': true, 'is-danger': errors.has('work_name')}" name="work_name" v-model="work_name" v-validate="'required'" :disabled="onSubmit">
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Chủ đầu tư</label>
                                <div class="control">
                                    <input type="text" :class="{'input': true, 'is-danger': errors.has('work_client')}" name="work_client" v-model="work_client" v-validate="'required'" :disabled="onSubmit">
                                </div>
                            </div>

                            <div class="field">
                                <label for="" class="label">Ngày khỏi công</label>
                                <p class="control">
                                    <cleave :options="options.date" v-model="work_started_at" :class="{'input': true, 'is-danger': errors.has('work_date')}" name="work_date" v-validate.initial="'required|date_format:DD/MM/YYYY'" :raw="false" :disabled="onSubmit"></cleave>
                                </p>
                                <p class="help is-danger" v-show="errors.firstByRule('work_date', 'required')">
                                    Ngày không được để trống.
                                </p>   
                                <p class="help is-danger" v-show="errors.firstByRule('work_date', 'date_format')">
                                    Ngày không hợp lệ. Nhập ngày theo dạng DD/MM/YYYY
                                </p>   
                            </div>
                            <div class="field">
                                <label for="" class="label">Mô tả</label>
                                <div class="control">
                                    <textarea class="textarea" v-model="work_description" :disabled="onSubmit"></textarea>
                                </div>
                            </div>
                            <div class="field is-grouped is-grouped-centered">
                                <div class="control">
                                    <button class="button is-success" :disabled="onSubmit" @click="submit">Lưu</button>
                                </div>
                                <div class="control">
                                    <router-link :to="{'name': 'work.index'}" class="button is-outlined">Hủy</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data: () => ({
        work_name: ``,
        work_description: ``,
        work_client: ``,
        work_started_at: ``,
        options: {
            date: {
                date: true,
                datePattern: [`d`, `m`, `Y`],
            },
        },
        onSubmit: false,
    }),
    methods: {
        submit () {
            if (!this.onSubmit) {
                this.onSubmit = true
                this.$store.dispatch(`work/store`, {
                    name: this.work_name,
                    description: this.work_description,
                    client: this.work_client,
                    started_at: this.work_started_at,
                }).then(result => {
                    this.$router.push({
                        name: `work.index`,
                    })
                })
            }
        },
    },
}
</script>

<style>

</style>
