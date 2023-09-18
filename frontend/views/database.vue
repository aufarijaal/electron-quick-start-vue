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
    <h5 style="text-align: center;">Database file located in $HOME/$APP_NAME/file</h5>
    <div style="display: flex; gap: 10px">
      <el-button plain type="primary" @click="store.incrementGlobalCount">
        Increment global count
      </el-button>
      <el-button plain type="primary" @click="count++">
        Local count (clicked {{ count }} times)
      </el-button>
    </div>

    <div class="task-input-container">
      <el-input
        class="task-input"
        type="text"
        placeholder="Type here..."
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <el-button plain type="success" @click="addTask">Add</el-button>
    </div>

    <div class="task-list">
      <div style="display: flex; align-items: center;" v-for="task in tasks" :key="task.id">
        <el-button @click="deleteTask(task.id)" circle size="large" plain type="danger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </el-button>
        <div style="flex-grow: 1; padding-left: 5px; padding-right: 5px;" class="task-description">{{ task.description }}</div>
        <el-button
          @click="toggleTask(task.id, task.completed)"
          circle plain size="large" :type="task.completed ? 'success': 'default'"
        >
          &check;
        </el-button>
      </div>
    </div>
  </div>
</template>
