<script setup lang="ts">
import backendCall from "../utils/backend-call";

const store = useMainStore();
const dependencies = ref<string[]>();
const devDependencies = ref<string[]>();
const count = ref(0);

async function getDependencies() {
  try {
    const result = await backendCall("/dependencies");

    dependencies.value = result.dependencies;
    devDependencies.value = result.devDependencies;
  } catch (error: any) {
    alert(error.message);
  }
}
</script>

<template>
  <div
    id="dependencies-page"
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin-top: 10px;
    "
  >
    <v-btn color="info" @click="store.incrementGlobalCount">
      Increment global count
    </v-btn>
    <v-btn color="info" @click="count++">
      Local count (clicked {{ count }} times)
    </v-btn>
    <v-btn color="success" @click="async () => await getDependencies()">
      Show dependencies
    </v-btn>

    <div style="display: flex; gap: 10px">
      <v-card title="Dependencies">
        <v-list density="compact">
          <v-list-item v-for="dependency in dependencies" :key="dependency">{{ dependency }}</v-list-item>
        </v-list>
      </v-card>
      <v-card title="Dev Dependencies">
        <v-list density="compact">
          <v-list-item v-for="dependency in devDependencies" :key="dependency">{{ dependency }}</v-list-item>
        </v-list>
      </v-card>
    </div>
  </div>
</template>
