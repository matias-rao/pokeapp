<template>
    <div class="flex flex-row w-full h-14 bg-white rounded-md shadow-lg border-1 border-gray-400 ">
        <div class="flex items-center">
            <svg class="h-10 px-5 py-1 " fill="#bfbfbf" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
        </div>
        <div class="flex items-center w-full">
            <input class='w-11/12 h-full outline-none text-lg' type="text" v-model="search" @input="emitSearch" placeholder="Search">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  search: String,
})

const search = ref(props.search);

const emit = defineEmits(['emitSearch']);

const emitSearch = () => {
    emit('search', search.value);
};


</script>