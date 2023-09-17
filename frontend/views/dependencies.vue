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
    "
  >
    <va-button @click="store.incrementGlobalCount">
      Increment global count
    </va-button>
    <va-button @click="count++">
      Local count (clicked {{ count }} times)
    </va-button>
    <va-button preset="primary" @click="async () => await getDependencies()">
      Show dependencies
    </va-button>

    <div style="display: flex; gap: 10px" v-if="dependencies && devDependencies">
      <va-card>
        <va-card-title>Dependencies</va-card-title>
        <va-card-content>
          <ul v-for="(dependency, index) in dependencies" :key="index">
            <li>{{ dependency }}</li>
          </ul>
        </va-card-content>
      </va-card>
      <va-card>
        <va-card-title>Dev Dependencies</va-card-title>
        <va-card-content>
          <ul v-for="(dependency, index) in devDependencies" :key="index">
            <li>{{ dependency }}</li>
          </ul>
        </va-card-content>
      </va-card>
    </div>
  </div>
</template>
