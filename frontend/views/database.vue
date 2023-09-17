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
  <div id="database-page" class="d-flex flex-column align-center" style="gap: 20px;">
    <h5 style="text-align: center; margin-top: 10px">
      Database file located in $HOME/$APP_NAME/file
    </h5>
    <div style="display: flex; gap: 10px; justify-content: center">
      <v-btn color="success" @click="store.incrementGlobalCount">
        Increment global count
      </v-btn>
      <v-btn color="success" @click="count++">
        Local count (clicked {{ count }} times)
      </v-btn>
    </div>

    <v-card width="450" title="Database demo Todo List">
      <v-card-text>
        <div>
          <v-text-field
            variant="solo-filled"
            density="compact"
            @keyup.enter="addTask"
            v-model="newTask"
            placeholder="Type here..."
            autofocus
          >
          <template #append>
            <v-btn @click="addTask" color="info">Add</v-btn>
          </template>
        </v-text-field>
        </div>

        <v-list>
          <v-list-item v-for="task in tasks" :key="task.id">
            <template #prepend>
              <v-btn @click="deleteTask(task.id)" size="small" color="error" icon="mdi-delete"></v-btn>
            </template>
            
            <div class="pl-2">{{ task.description }}</div>

            <template #append>
              <v-btn @click="toggleTask(task.id, task.completed)" size="small" :color="task.completed ? 'success' : 'grey'" icon="mdi-check"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>
