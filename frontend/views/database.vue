<script setup lang="ts">
import backendCall from "../utils/backend-call";

const store = useMainStore();
const count = ref(0);
const tasks = ref<{ id: number; description: string; completed: boolean }[]>();
const newTask = ref("");

async function getTasks() {
  try {
    tasks.value = await backendCall("/tasks/get_all");
  } catch (error: any) {
    alert(error.message);
  }
}

async function addTask() {
  try {
    if (!newTask.value) return;

    await backendCall("/tasks/add", newTask.value);
    await getTasks();
  } catch (error: any) {
    alert(error.message);
  }
}

async function deleteTask(id: number) {
  try {
    await backendCall("/tasks/delete", id);
    await getTasks();
  } catch (error: any) {
    alert(error.message);
  }
}

async function toggleTask(id: number, completed: boolean) {
  try {
    await backendCall("/tasks/toggle_completed", id, !completed);
    await getTasks();
  } catch (error: any) {
    alert(error.message);
  }
}

onMounted(async () => {
  await getTasks();
});
</script>

<template>
  <div id="database-page">
    <h5 style="text-align: center">
      Database file located in $HOME/$APP_NAME/file
    </h5>
    <div style="display: flex; gap: 10px; margin-top: 10px">
      <va-button @click="store.incrementGlobalCount">
        Increment global count
      </va-button>
      <va-button @click="count++">
        Local count (clicked {{ count }} times)
      </va-button>
    </div>

    <div style="display: flex; width: 100%; gap: 10px; margin: 10px 0">
      <va-input
        style="flex-grow: 1"
        type="text"
        placeholder="Type here..."
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <va-button preset="primary" @click="addTask">Add</va-button>
    </div>

    <va-list>
      <task-item
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete="
          async (id) => {
            await deleteTask(id);
          }
        "
        @toggle="
          async (id, completed) => {
            await toggleTask(id, completed);
          }
        "
      ></task-item>
    </va-list>
  </div>
</template>
