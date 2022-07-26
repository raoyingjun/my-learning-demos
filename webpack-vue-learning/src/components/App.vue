<template>
  <div>
    <Nav/>
    <p>Message：{{ msg }}</p>
    <img src="/favicon.ico" alt="">
    <input type="text" placeholder="Input your name">
    <button @click="loadScript">加载脚本</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'Hello World'
    }
  },
  methods: {
    loadScript () {
      import('../js/a.js')
    }
  },
  components: {
    Nav: () => import(/* webpackChunkName: "nav" */'./Nav.vue')
  }
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  transition: all 400ms;
  animation: anim 2s;
  background: {
    color: #e7e7e7;
  }
}

div:focus-within {
  background-color: #000000;
}

input:not(:placeholder-shown) {
  background-color: green;
}

::placeholder {
  background-color: yellow;
}
</style>
