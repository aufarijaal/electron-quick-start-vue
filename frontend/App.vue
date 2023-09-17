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
      <div class="va-h2">Electron Quick Start Vue</div>
      <div class="va-h6" style="text-align: center">Global count: {{ store.globalCount }}</div>
      <div class="va-h6" style="text-align: center">Variant: Vuestic UI</div>
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
