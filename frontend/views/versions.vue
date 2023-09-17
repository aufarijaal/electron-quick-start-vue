<script setup lang="ts">
import backendCall from "../utils/backend-call";
import electronLogo from "/electron.svg";
import chromiumLogo from "../assets/chromium-svgrepo-com.svg";
import nodejsLogo from "../assets/nodejs-icon-logo-svgrepo-com.svg";

const count = ref(0);
const store = useMainStore();
const versions = ref({
  nodejs: undefined,
  electron: undefined,
  chromium: undefined,
});

async function getVersions() {
  try {
    versions.value = await backendCall("/versions");
  } catch (error: any) {
    alert(error.message);
  }
}
</script>

<template>
  <div class="versions-container">
    <version-info :logo="chromiumLogo" alt="Chromium version">
      Chromium version: {{ versions.chromium }}
    </version-info>
    <version-info :logo="electronLogo" alt="Electron version">
      Electron version: {{ versions.electron }}
    </version-info>
    <version-info :logo="nodejsLogo" alt="Node JS version">
      Node JS version: {{ versions.nodejs }}
    </version-info>
  </div>
  <va-button preset="primary" @click="getVersions">Get versions</va-button>
  <va-button @click="count++">
    Local count (clicked {{ count }} times)
  </va-button>
  <va-button @click="store.incrementGlobalCount">
    Increment global count
  </va-button>
</template>
