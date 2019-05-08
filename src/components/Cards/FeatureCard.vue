<template>
    <v-card
        class="primary--text"
        style="max-height: 250px; overflow-y: hidden; cursor: pointer;"
        height="100%"
        v-ripple
    >
        <v-card-title :class="`primary white--text`" class="system-name">
            {{ feature.name }}
        </v-card-title>
        <v-card-text class="primary--text" style="overflow-y: hidden;">
            {{ feature.description }}
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: 'feature-card',
    props: { feature: { type: Object, required: true } }
}
</script>

<style>

</style>
