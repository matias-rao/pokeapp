<template>
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-screen">
        <img class="w-48 animate-spin" src="./../assets/pokebola.png" alt="loading">
    </div>
    <div v-else class="flex flex-col h-screen items-center py-10 w-11/12 md:w-9/12 lg:w-6/12 m-auto ">
        <!-- Buscador -->
        <div class="w-full">
            <Buscador @search="searchPokemon"/>
        </div>

        <!-- Listado Pokemons -->
        <div class="w-full pt-10 pb-32">
            <Card v-for="(pokemon, index) in listPokemons" :key="index" :pokemon="pokemon"/>

            <div v-if="listPokemons < 1 && search">
                <ListadoVacio @clean="cleanSearch" />
            </div>

            <div v-if="listPokemons < 1 && !search && active_favs ">
                <div class="flex flex-col justify-center items-center mt-5">
                    <div class="text-center text-3xl font-medium">Empty List</div>
                    <img class="w-48 my-5" src="./../assets/sad.png" alt="loading">
                </div>    
            </div>
        </div>

        <!-- Botonera All Pokemons y Favoritos -->
        <div v-if="!search" class="w-full h-20 fixed bg-white bottom-0 flex items-center" style="box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1);">
            <div class="flex w-11/12 md:w-9/12 lg:w-6/12 m-auto" >
                <Button class="w-1/2 p-1 m-1" msg="All" list="true" :active="active_all" @click="toggleActive(1)"/>
                <Button class="w-1/2 p-1 m-1" msg="Favorites" fav="true" :active="active_favs" @click="toggleActive(2)"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import Buscador from '../components/Buscador.vue';
import Card from '../components/Card.vue';
import Button from '../components/Button.vue';
import ListadoVacio from '../components/ListadoVacio.vue';
import { ref, onMounted, computed } from 'vue';
import { storePokemons } from '../store/storePokemons';

const pokemonsStore = storePokemons();

const pokemons = ref();
const active_all = ref(true);
const active_favs = ref(false);
const search = ref();
const loading = ref(true)

onMounted(async () => {
    if(!pokemonsStore.pokemons){
        await pokemonsStore.fetchPokemons()
            .then(() => {
                pokemons.value = pokemonsStore.getPokemons; 
            })
    }

    pokemons.value = pokemonsStore.getPokemons;
    loading.value = false;
});

const searchPokemon = (query) => {
    search.value = query;
}

const cleanSearch = () => {
    search.value = null;
    toggleActive(1)
}

const listPokemons = computed(() => {
    let filterPokemons;

    if(pokemons.value){
        filterPokemons = pokemonsStore.pokemons.filter(fav => pokemonsStore.favorites.includes(fav.name))
    }
    
    if(search.value){
        filterPokemons = pokemonsStore.pokemons.filter((pokemon) => pokemon.name.toLowerCase().startsWith(search.value.toLowerCase()))
    }

    if(active_all.value == true && !search.value){
        return pokemons.value;
    }

    return filterPokemons;
});


const toggleActive = (act) => {
    if(act == 1) {
        active_all.value = true;
        active_favs.value = false;
    }else{
        active_all.value = false;
        active_favs.value = true;
    }
}

</script>