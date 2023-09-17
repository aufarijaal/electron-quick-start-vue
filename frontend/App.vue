<script setup lang="ts">
const store = useMainStore();
const drawer = ref(false);
</script>
<template>
  <v-app :theme="store.theme">
    <v-app-bar density="comfortable" color="info">
      <template #prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title> Electron Quick Start Vue Vuetify </v-app-bar-title>

      <template #append>
        <div>Global count: {{ store.globalCount }}</div>
        <v-btn
          :icon="
            store.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          @click="store.theme = store.theme === 'light' ? 'dark' : 'light'"
        ></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list density="compact">
        <v-list-item :to="{ name: 'versions' }">Versions Page</v-list-item>
        <v-list-item :to="{ name: 'database' }">Database Page</v-list-item>
        <v-list-item :to="{ name: 'dependencies' }"
          >Dependencies Page</v-list-item
        >
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
