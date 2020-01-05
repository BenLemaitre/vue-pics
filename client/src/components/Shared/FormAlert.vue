<template>
    <v-alert type="error" :value="true" class="transition-swing" transition="scale-transition" dismissible>
        <h3>{{message}}</h3>
    </v-alert>
</template>

<script>
export default {
    props: ['message']
}
</script>