<template>
    <tbody>
        <tr>
            <td colspan="15">
                <p class="has-text-left has-text-link is-6 subtitle">
                    <b>{{title}}</b>
                </p>
                
            </td>
        </tr>
        <tr v-for="(user, index) in users" :key="index">
            <td><b>{{index + 1}}</b></td>
            <td>{{user.name}}</td>
            <td>{{user.UID}}</td>
            <td><span class="is-size-7">{{user.id_number}}</span></td>
            <td class="is-size-7">{{user.birthday}}</td>
            <td class="is-size-7">{{user.native_place}}</td>
            <td class="is-size-7">{{user.phone_number}}</td>
            <td class="is-size-7">{{user.address}}</td>
            <td class="is-size-7">{{user.workplace}}</td>
            <td class="is-size-7">{{user.joined_at}}</td>
            <td class="is-size-7">{{user.current_job}}</td>
            <td class="is-size-7">{{user.current_workplace}}</td>
            <!--
            <td class="is-size-7">{{user.email}}</td>
            
            <td class="is-size-7">{{user.mariage_status}}</td>
            <td class="is-size-7">{{user.family_status}}</td>
            -->

        </tr>
    </tbody>
</template>

<script>
export default {
    props: [`users`, `title`],
}
</script>

<style>

</style>