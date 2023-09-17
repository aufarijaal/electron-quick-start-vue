<script setup lang="ts">
defineProps<{logo: string, alt?: string}>();
</script>
<template>
    <div class="version">
      <img class="version-image" :src="logo" :alt="alt" />
      <div class="version-label">
        <slot></slot>
      </div>
    </div>
</template>
