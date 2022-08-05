import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const useUserStore = defineStore('user', () => {
  const firstName = ref('Rao');
  const lastName = ref('YingJun');
  const fullName = computed(() => firstName.value + lastName.value);
  return {
    lastName,
    fullName,
    firstName,
  };
});
export default useUserStore;
