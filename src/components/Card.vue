<template>
    <div class=" bg-white h-16 p-2 rounded-md border-1 border-gray-400 shadow-sm flex items-center justify-between my-3">
        <!-- Pokemon -->
        <div class="pl-5 text-xl w-full" >
            <button class="w-1/2 text-left" @click="openModal">
                {{ primeraLetraMayus(pokemon.name) }}
            </button>
        </div>
        <!-- Boton Favorito -->
        <div class="rounded-full h-12 w-12 mx-3" style="background-color: #f5f5f5">
            <button class="w-12" @click="toggleFavorite(pokemon.name)">
                 <Favorito :fav="fav" fill="#bfbfbf"/>
            </button>
        </div>
    </div>
    <Modal :pokemon="_pokemon" :open="open_modal" @close="closeModal" @toggle="toggleFavorite" :fav="fav"/>
</template>
<script setup>
import { ref, computed } from 'vue';
import { storePokemons } from '../store/storePokemons';
import Favorito from './svg/Favorito.vue';
import Modal from './Modal.vue';

const props = defineProps({
  pokemon: String,
})

const pokemonsStore = storePokemons();

const favorito = ref(false);
const open_modal = ref(false);
const _pokemon = ref();

const fav = computed(() => {
    let find = pokemonsStore.favorites.find(fav => fav == props.pokemon.name);

    if(find) return favorito.value = true
})

const toggleFavorite = (pokemon) => {
    if(favorito.value == false && !pokemonsStore.favorites.find(fav => fav == pokemon)){
        favorito.value = true;
        pokemonsStore.favorites.push(pokemon)
    }else if(favorito.value == true){
        favorito.value = false;
        pokemonsStore.favorites = pokemonsStore.favorites.filter(fav => fav != pokemon)
    }
}

const openModal = async () => {
    open_modal.value = true;

    await pokemonsStore.fetchPokemon(props.pokemon.name).then(() => {
        _pokemon.value = pokemonsStore.getPokemon;
    })
}

const closeModal = () => {
    open_modal.value = false;
}

const primeraLetraMayus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

</script>

