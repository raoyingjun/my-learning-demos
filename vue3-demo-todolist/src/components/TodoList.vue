<template>
    <p>添加</p>
    <TodoInput @addItem="addItem"/>
    <p>我的待办事项</p>
    <TodoItem
            v-for="(todo, index) in todos"
            @removeItem="removeItem"
            @updateState="updateState"
            @updateText="updateText"
            :todo="todo" :index="index"/>
    <Dialog title="删除提醒" content="确认删除吗？" @confirm="removeItem(delIndex, true)" v-model="visible.delWarning"/>
    <Dialog title="警告" content="请填写待办事项！" v-model="visible.emptyWarning" :cancelVisible="false"/>
</template>
<script setup lang="ts">
import TodoInput from "@/components/TodoInput.vue";
import TodoItem from "@/components/TodoItem.vue";
import Dialog from "@/components/dialog/index.vue"
import {reactive, ref} from "vue";
import type {TodoItem as Item} from "@/types";

interface Payload {
    text: string,
    index: number
}

const todos = ref<Item[]>([])
const visible = reactive({
    delWarning: false,
    emptyWarning: false
})
const addItem = (txt: string) => {
    if (!txt) {
        visible.emptyWarning = true
        return
    }
    const data: Item = {
        text: txt,
        completed: false
    }
    todos.value.push(data)
}
const updateState = (index: number) => {
    todos.value[index].completed = !todos.value[index].completed
}

const updateText = ({index, text}: Payload) => {
    if (text) {
        todos.value[index].text = text
    } else {
        todos.value.splice(index, 1)
    }

}
const delIndex = ref(-1);
const removeItem = (index: number, done?: boolean) => {
    delIndex.value = index
    visible.delWarning = true
    if (done) {
        todos.value.splice(index, 1);
    }
}
</script>
