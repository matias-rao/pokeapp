<template>
    <div class="flex flex-col justify-center mt-5">
        <div class="text-center text-6xl font-medium">Uh-oh!</div>
        <div class="text-xl font-light text-center my-8" style="color: #5e5e5e;">You look lost on your journey!</div>

        <Button class="m-auto" msg="Go back Home" active="true" @click="cleanSearch" />
    </div>    
</template>
<script setup>
import Button from './Button.vue';

const emit = defineEmits(['cleanSearch']);

const cleanSearch = () => {
    emit('clean');
};
</script>
