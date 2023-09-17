<script setup lang="ts">
defineProps<{
  task: { id: number; description: string; completed: boolean };
}>();
defineEmits(["delete", "toggle"]);
</script>

<template>
  <va-list-item style="background-color: var(--va-background-element); margin-top: 3px;">
    <va-list-item-section icon>
        <va-button color="danger" @click="$emit('delete', task.id)">
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
        </va-button>
    </va-list-item-section>
    <va-list-item-section>
        <va-list-item-label>
          {{ task.description }}
        </va-list-item-label>
    </va-list-item-section>
    <va-list-item-section icon>
        <va-button :border-color="task.completed ? '' : 'primary'" :preset="task.completed ? '' : 'secondary'" @click="$emit('toggle', task.id, task.completed)">
          &check;
        </va-button>
    </va-list-item-section>
</va-list-item>
</template>
