<template>
    <p>
        <span class="undo" :class="{done:todo.completed}" @dblclick="edit=true;" v-if="!edit">{{
            todo.text
            }}</span>
        <input type="text" v-model="text" v-else @blur="edit=false">
        <button @click="$emit('updateState', index)" style="margin-left: 10px">{{ todo.completed ? '重做' : '完成' }}</button>
        <button @click="$emit('removeItem', index)" style="margin-left: 5px">删除</button>
    </p>
</template>

<script setup lang="ts">
import type {TodoItem} from "@/types";
import {computed, ref} from "vue";

interface Props {
    todo: TodoItem,
    index: number,
}

const emit = defineEmits(['removeItem', 'updateText', 'updateState'])
const props = defineProps<Props>()
const edit = ref(false)
const text = computed<string>({
    get() {
        return props.todo.text
    },
    set(val) {
        const payload = {
            index: props.index,
            text: val
        }
        emit('updateText', payload)
    }
})
</script>

<style scoped>
.undo::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
    background: darkred;
}
.done::before {
    background: darkgreen;
}
</style>