<template>
    <teleport to="body">
        <transition name="fade">
            <div class="mask" v-show="modelValue" @click.self="close('cancel')">
                <div class="body">
                    <h2>{{ title }}</h2>
                    <p>{{ content }}</p>
                    <p>
                        <button @click="close('confirm')" v-if="confirmVisible">确认</button>
                        <button @click="close('cancel')" v-if="cancelVisible">取消</button>
                    </p>
                </div>
            </div>
        </transition>
    </teleport>
</template>
<script setup lang="ts">
defineProps({
    title: String,
    content: String,
    modelValue: Boolean,
    confirmVisible: {
        type: Boolean,
        default: true
    },
    cancelVisible: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['confirm', 'cancel', 'update:modelValue'])
const confirm = () => emit('confirm');
const cancel = () => emit('cancel');
const close = (type: 'confirm' | 'cancel') => {
    switch (type) {
        case 'confirm':
            confirm();
            break;
        case  'cancel':
            cancel();
            break;
    }
    emit('update:modelValue', false);
}
</script>
<style scoped>
.mask {
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.body {
    padding: 50px 100px;
    background: white;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.fade-enter-from .body, .fade-leave-to .body{
    transform: scale(0);
}
.fade-enter-active, .fade-leave-active {
    transition: all 400ms;
}
.fade-enter-active .body, .fade-leave-active .body{
    transition: all 400ms;
}
</style>