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
  <div id="versions-page" class="d-flex justify-center align-center flex-column" style="gap: 50px; margin-top: 10px;">
    <div class="d-flex" style="gap: 5px;">
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
  
    <div class="d-flex flex-column align-center" style="gap: 5px;">
      <v-btn color="info" @click="getVersions">Get versions</v-btn>
      <v-btn color="success" @click="count++">
        Local count (clicked {{ count }} times)
      </v-btn>
      <v-btn color="success" @click="store.incrementGlobalCount">
        Increment global count
      </v-btn>
    </div>
  </div>
</template>
