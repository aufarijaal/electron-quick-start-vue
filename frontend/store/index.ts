export const useMainStore = defineStore("main", () => {
  const globalCount = ref(0);
  const theme = ref<"dark" | "light">("light");
  
  function incrementGlobalCount() {
    globalCount.value = globalCount.value + 1;
  }

  return {
    globalCount,
    incrementGlobalCount,
    theme
  };
});
