<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { ref, onMounted, computed } from "vue";

const pokemonList = ref([]);
onMounted(async () => {
  const pokeData = await fetch("https://pokeapi.co/api/v2/pokedex/2/").then(
    (response) => response.json()
  );

  pokemonList.value = pokeData.pokemon_entries;
});

const filterText = ref("");
const filteredPokemon = computed(() => {
  return pokemonList.value.filter((pokemon) => {
    return pokemon.pokemon_species.name
      .toLowerCase()
      .includes(filterText.value.toLowerCase());
  });
});
</script>

<template>
  <input type="text" v-model="filterText" />
  <ul>
    <li
      v-for="pokemon in filteredPokemon"
      :key="`poke-${pokemon.entry_number}`"
    >
      #{{ pokemon.entry_number }} - {{ pokemon.pokemon_species.name }}
    </li>
  </ul>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
