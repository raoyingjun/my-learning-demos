import { defineStore } from 'pinia';

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    base: 5,
  }),
  actions: {
    update(count: number) {
      this.count = count;
    },
  },
  getters: {
    result(): number {
      return this.count * this.base;
    },
  },
});
export default useCounterStore;
