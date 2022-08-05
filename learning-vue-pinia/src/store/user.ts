import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', () => {
  const firstName = ref('Rao');
  const lastName = ref('YingJun');
  const fullName = computed(() => `${lastName.value} ${firstName.value}`);
  return {
    lastName,
    fullName,
    firstName,
  };
});
export default useUserStore;
