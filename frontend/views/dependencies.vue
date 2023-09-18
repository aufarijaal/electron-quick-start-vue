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
    <el-button plain type="primary" @click="store.incrementGlobalCount">
      Increment global count
    </el-button>
    <el-button plain type="primary" @click="count++">
      Local count (clicked {{ count }} times)
    </el-button>
    <el-button plain type="success" @click="async () => await getDependencies()">
      Show dependencies
    </el-button>

    <div style="display: flex; gap: 10px">
      <el-card class="dependency-list">
        <template #header>
          <div>Dependencies</div>
        </template>
        <ul v-for="(dependency, index) in dependencies" :key="index">
          <li>{{ dependency }}</li>
        </ul>
      </el-card>
      <el-card class="dependency-list">
        <template #header>
          <div>Dev Dependencies</div>
        </template>
        <ul v-for="(dependency, index) in devDependencies" :key="index">
          <li>{{ dependency }}</li>
        </ul>
      </el-card>
    </div>
  </div>
</template>
