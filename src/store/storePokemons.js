import { defineStore } from "pinia";
import axios from 'axios';

export const storePokemons = defineStore('pokemons', {
  state: () => ({
      pokemons: null,
      pokemon: null,
      favorites: [],
  }),
  getters: {
      getPokemons: (state) => state.pokemons,
      getPokemon: (state) => state.pokemon,
      getFavorites: (state) => state.favorites
  }, 
  actions: {
    async fetchPokemons(){
        await axios.get('https://pokeapi.co/api/v2/pokemon')
          .then((response) => {
            this.pokemons = response.data.results;
          }).catch((error) => {
            throw error
          }) 
    },

    async fetchPokemon(pokemon){
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
          .then((response) => {
            this.pokemon = response.data;
          }).catch((error) => {
            throw error
          }) 
    },
  },
  
  persist: true,

})