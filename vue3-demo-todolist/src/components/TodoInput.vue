<template>
    <form @submit.prevent>
        <input type="text" v-model="text">
        <button @click="handleAdd">添加</button>
    </form>
</template>
<script setup lang="ts">
import {ref} from "vue"

const text = ref('')
const emit = defineEmits(['addItem'])
const handleAdd = ()=>{
    emit('addItem',text.value)
    text.value = ''
}
</script>
