<script setup lang="ts">
const store = useMainStore();
const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <el-config-provider>
    <main
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      "
    >
      <div style="display: flex; flex-direction: column; align-items: center">
        <h1>Electron Quick Start Vue</h1>
        <h4 style="text-align: center">
          Global count: {{ store.globalCount }}
        </h4>
        <h5 style="text-align: center">Variant: Element Plus</h5>
        <el-switch
          :model-value="isDark"
          @change="toggleDark()"
          active-text="Dark"
          inactive-text="Light"
        ></el-switch>
      </div>
      <el-button-group>
        <el-button
          :type="
            $router.currentRoute.value.name === 'versions'
              ? 'primary'
              : 'default'
          "
          @click="$router.replace({ name: 'versions' })"
          >Versions Page</el-button
        >
        <el-button
          :type="
            $router.currentRoute.value.name === 'database'
              ? 'primary'
              : 'default'
          "
          @click="$router.replace({ name: 'database' })"
          >Database Page</el-button
        >
        <el-button
          :type="
            $router.currentRoute.value.name === 'dependencies'
              ? 'primary'
              : 'default'
          "
          @click="$router.replace({ name: 'dependencies' })"
          >Dependencies Page</el-button
        >
      </el-button-group>
      <router-view></router-view>
    </main>
  </el-config-provider>
</template>
