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
      <button class="cyan-button" @click="store.incrementGlobalCount">
        Increment global count
      </button>
      <button class="cyan-button" @click="count++">
        Local count (clicked {{ count }} times)
      </button>
    </div>

    <div class="task-input-container">
      <input
        class="task-input"
        type="text"
        placeholder="Type here..."
        v-model="newTask"
        @keyup.enter="addTask"
      />
      <button class="black-button" @click="addTask">Add</button>
    </div>

    <div class="task-list">
      <div class="task-item" v-for="task in tasks" :key="task.id">
        <button class="btn-delete-task" @click="deleteTask(task.id)">
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
        </button>
        <div class="task-description">{{ task.description }}</div>
        <button
          :class="[
            'btn-toggle-task',
            task.completed ? 'btn-toggle-task__completed' : '',
          ]"
          @click="toggleTask(task.id, task.completed)"
        >
          &check;
        </button>
      </div>
    </div>
  </div>
</template>
