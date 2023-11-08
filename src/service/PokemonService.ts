import { Pokemon } from '../model/Pokemon';
import { Species } from '../model/Species';
import { findPokemonById, fetchSpecies } from '../api/PokemonApi';

let pokemonCache: Pokemon[] = [];
let speciesCache: Species[] = [];

async function findPokemon(id: number): Promise<Pokemon> {
  const maybePkmn: Pokemon | undefined = pokemonCache.find(
    (pkmn) => pkmn.id === id
  );

  if (maybePkmn !== undefined) {
    return maybePkmn;
  }

  const pokemon: Pokemon = await findPokemonById(id);

  pokemonCache.push(pokemon);
  return pokemon;
}

async function findSpecies(id: number): Promise<Species> {
  // If we have stored the species, fetch it.
  const maybeSpecies: Species | undefined = speciesCache.find(
    (species) => species.id === id
  );

  if (maybeSpecies !== undefined) {
    return maybeSpecies;
  }

  // If we have stored the pokemon, fetch it, then query for species.
  const maybePkmn: Pokemon | undefined = pokemonCache.find(
    (pkmn) => pkmn.id === id
  );

  if (maybePkmn !== undefined) {
    const species: Species = await fetchSpecies(maybePkmn.species.url);
    species.id = maybePkmn.id;
    speciesCache.push(species);
    return species;
  }

  const pokemon: Pokemon = await findPokemonById(id);
  const species: Species = await fetchSpecies(pokemon.species.url);
  species.id = pokemon.id;
  speciesCache.push(species);
  return species;
}
export { findPokemon, findSpecies };
