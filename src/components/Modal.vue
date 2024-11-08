<template>
    <div v-if="open" class="bg-black bg-opacity-65 fixed inset-0 z-10 flex justify-center items-center">
        <div v-if="pokemon" class="h-4/6 w-11/12 md:w-9/12 lg:w-6/12 m-auto bg-white rounded-lg">
            <div class="relative w-full h-[45%]">
                <!-- Boton cerrar modal -->
                <div class="absolute top-4 right-5 z-10">
                    <button @click="closeModal" class="w-8" >
                        <Close />
                    </button>
                </div>

                <!-- Imagen Pokemon -->
                <div class="absolute flex justify-center h-full w-full items-center"> 
                    <img class="w-64" :src="pokemon.sprites.front_default" alt="pokemon">
                </div>

                <!-- Fondo -->
                <img src="./../assets/fondo.png" alt="fondo" class="rounded object-cover h-full w-full"/>
            </div>
            <div class="w-[90%] m-auto my-4 h-1/2 text-[#5e5e5e] text-lg flex flex-col justify-between">
                <div>
                    <label class="font-semibold"> Name: </label> {{ primeraLetraMayus(pokemon.name) }}
                </div>
                <hr class="my-2">
                <div>
                    <label class="font-semibold"> Weight: </label> {{ pokemon.weight }}
                </div>
                <hr class="my-2">
                <div>
                    <label class="font-semibold"> Height: </label> {{ pokemon.height }}
                </div>
                <hr class="my-2">
                <div>
                    <label class="font-semibold"> Types: </label> {{ listTypes(pokemon.types) }}
                </div>
                <hr class="my-2">

                <div class="flex justify-between my-5">
                    <!-- Boton compartir -->
                    <Button class="w-9/12 md:w-7/12 lg:w-5/12" msg="Share to my Friends" active="true" @click="copyClipboard(pokemon)"/>

                    <!-- Boton fav -->
                    <div class="rounded-full h-12 w-12 mx-3" style="background-color: #f5f5f5">
                        <button class="w-12" @click="toggleFavorite(pokemon.name)">
                            <Favorito :fav="fav" fill="#bfbfbf"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Close from './svg/Close.vue';
import Button from './Button.vue';
import Favorito from './svg/Favorito.vue';

const props = defineProps({
  pokemon: String,
  open: Boolean,
  fav: Boolean,
})

const emit = defineEmits(['closeModal', 'toggleFavorite']);

const closeModal = () => {
    emit('close');
};

const toggleFavorite = (pokemon) => {
    emit('toggle', pokemon)
}

const listTypes = (types) => {
    let _types = [];

    types.map(t => _types.push(primeraLetraMayus(t.type.name)))

    let string = _types.join(', ')

    return string;
}

const primeraLetraMayus = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const copyClipboard = (pokemon) => {
    let name = pokemon.name
    let abilities = pokemon.abilities.map(a => a.ability.name)

    let string = `Name: ${name}. Abilities: ${abilities.join(', ')}`

    navigator.clipboard.writeText(string)
}


</script>
