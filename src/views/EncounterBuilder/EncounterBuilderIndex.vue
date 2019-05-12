<template>
    <v-container class="v-container">
        <v-fade-transition mode="out-in">
            <router-view />
        </v-fade-transition>
    </v-container>
</template>


<style>
@media screen and (min-width: 960px) {
    .v-container {
        width: 70%;
    }
}
</style>
