<script setup lang="ts">
const store = useMainStore();
</script>
<template>
  <main
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 30px;
    "
  >
    <div>
      <h1>Electron Quick Start Vue</h1>
      <h4 style="text-align: center">Global count: {{ store.globalCount }}</h4>
      <h5 style="text-align: center">Variant: Vanilla Vue. No UI Library.</h5>
    </div>
    <div class="router-link-container">
      <router-link
        class="router-link"
        active-class="router-link-active"
        :to="{ name: 'versions' }"
        >Versions Page</router-link
      >
      <router-link
        class="router-link"
        active-class="router-link-active"
        :to="{ name: 'database' }"
        >Database Page</router-link
      >
      <router-link
        class="router-link"
        active-class="router-link-active"
        :to="{ name: 'dependencies' }"
        >Dependencies Page</router-link
      >
    </div>
    <router-view></router-view>
  </main>
</template>
