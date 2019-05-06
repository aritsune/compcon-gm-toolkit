<template>
  <v-app id="app">
    <v-toolbar color="primary" dark flat app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="font-weight-light">
        <v-fade-transition mode="out-in">
          <span :key="$route.name">
            {{ titles[$route.name] }}
          </span>
        </v-fade-transition>
      </v-toolbar-title>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      clipped
    >
      <v-list>
        <v-list-tile to="/" active-class="secondary--text">
          <v-list-tile-action class="pl-2">
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile to="/npc-designer" active-class="secondary--text">
          <v-list-tile-action class="pl-2">
            <v-icon>mdi-account-edit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>NPC Designer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/encounter-builder" active-class="secondary--text">
          <v-list-tile-action class="pl-2">
            <v-icon>mdi-account-multiple-plus</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Encounter Builder</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/encounter-runner" active-class="secondary--text">
          <v-list-tile-action class="pl-2">
            <v-icon>mdi-account-group</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Encounter Runner</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile to="/about" active-class="secondary--text">
          <v-list-tile-action class="pl-2">
            <v-icon>mdi-information</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-container bg fill-height grid-list-md text-xs-center>
        <v-layout row wrap justify-center>
            <v-flex>
                  <v-fade-transition mode="out-in">
                    <router-view class="py-5"/>
                  </v-fade-transition>
            </v-flex>
        </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: false,
        titles: {
            'home': 'NPC Toolkit',
            'npc-designer': 'NPC Designer',
            'home': 'NPC Toolkit',
        }
    })
}
</script>

<style>
.v-card {
  box-shadow: none;
  border: 1px solid !important;
}
</style>
