<template>
  <input type="text" v-model="filterText" />
  <ul>
    <li
      v-for="pokemon in pokemonStore.filteredList"
      :key="`poke-${pokemon.entry_number}`"
    >
      <router-link
        :to="{ name: 'Detail', params: { id: pokemon.entry_number } }"
      >
        #{{ pokemon.entry_number }} - {{ pokemon.pokemon_species.name }}
      </router-link>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from "vue";

onMounted(async () => {
  const pokeData = await fetch("https://pokeapi.co/api/v2/pokedex/2/").then(
    (response) => response.json()
  );
  pokemonStore.list = pokeData.pokemon_entries;
});

const filterText = ref("");
const pokemonStore = reactive({
  list: [],
  filteredList: computed(() => {
    return pokemonStore.list.filter((pokemon) => {
      return pokemon.pokemon_species.name
        .toLowerCase()
        .includes(filterText.value.toLowerCase());
    });
  }),
});
</script>

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
