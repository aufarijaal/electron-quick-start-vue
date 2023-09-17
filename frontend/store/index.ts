export const useMainStore = defineStore("main", () => {
  const globalCount = ref(0);

  function incrementGlobalCount() {
    globalCount.value = globalCount.value + 1;
  }

  return {
    globalCount,
    incrementGlobalCount,
  };
});
