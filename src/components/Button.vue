<template>
  <button @mouseover="hover = true" @mouseleave="hover = false" class="text-white text-lg w-44 h-12 rounded-full flex items-center justify-center gap-2 md:gap-5" :style="{ backgroundColor: color }">
    <!-- Iconos -->
    <Favorito v-if="fav" class="w-8" fill="#fff" />
    <Listado v-if="list" />
    {{ msg }}
  </button>
</template>
<script setup>
import Favorito from './svg/Favorito.vue';
import Listado from './svg/Listado.vue';
import { ref, computed } from 'vue';

const props = defineProps({
  msg: String,
  fav: Boolean,
  list: Boolean,
  active: Boolean,
})

const hover = ref(false);

const color = computed(() => {
    let _color

    if(props.active && hover.value){
      _color = '#C00F1F'
    }else if(props.active && !hover.value){
      _color = '#f22639'
    }else if(!props.active && !hover.value){
      _color = '#bfbfbf'
    }else{
      _color = '#a6a6a6'
    }

    return _color;
});

</script>

