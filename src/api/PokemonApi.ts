import { Pokemon } from '../model/Pokemon';
import { Species } from '../model/Species';

export async function findPokemonById(id: number): Promise<Pokemon> {
  const response: Response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );

  return await response.json();
}

export async function fetchSpecies(url: string): Promise<Species> {
  const response: Response = await fetch(url);

  return await response.json();
}
