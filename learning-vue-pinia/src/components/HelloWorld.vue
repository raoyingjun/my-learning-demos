<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Use store with Composition API</h2>
    <label for="count">
      Input count:
      <input
        type="number"
        @input="counterStore.update(Number($event.target.value))"
        id="count"
        :value="counterStore.count">
    </label>
    <p>
      Expression is
      {{ counterStore.count }} * {{ counterStore.base }} = {{ counterStore.result }}</p>
    <hr>
    <h2>Use store with Option API</h2>
    <label for="name">
      Input last name:
      <input type="text" v-model="userStore.lastName" id="name">
    </label>
    <p>
      Full name is
      {{ userStore.fullName }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useCounterStore, useUserStore } from '@/store';

defineProps({
  msg: String,
});
const userStore = useUserStore();
const counterStore = useCounterStore();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
