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
    <button class="cyan-button" @click="store.incrementGlobalCount">
      Increment global count
    </button>
    <button class="cyan-button" @click="count++">
      Local count (clicked {{ count }} times)
    </button>
    <button class="black-button" @click="async () => await getDependencies()">
      Show dependencies
    </button>

    <div style="display: flex; gap: 10px">
      <div class="dependency-list">
        <div>Dependencies</div>
        <ul v-for="(dependency, index) in dependencies" :key="index">
          <li>{{ dependency }}</li>
        </ul>
      </div>
      <div class="dependency-list">
        <div>Dev Dependencies</div>
        <ul v-for="(dependency, index) in devDependencies" :key="index">
          <li>{{ dependency }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
