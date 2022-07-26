<template>
  <ul>
    <li>Home</li>
    <li>About</li>
    <li>Me</li>
  </ul>
</template>
<script lang="ts">

export default {
  name: 'Nav',
  methods: {
    show (name: string, age: 18) {
      console.log(name, age)
    }
  }
}

</script>
<style scoped>
ul {
  overflow: hidden;
  background-color: yellow;
  list-style-type: none;
}

li {
  float: left;
}
</style>
