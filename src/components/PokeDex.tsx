import '../style.css';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Pokemon } from '../model/Pokemon';
import { Species } from '../model/Species';
import { ButtonWithLimit } from '../components/ButtonWithLimit';
import BlinkingLight from '../components/BlinkingLight';
import { findPokemon, findSpecies } from '../service/PokemonService';
import Speakerphone from './Speakerphone';
import { RxHeight } from 'react-icons/rx';
import { TbWeight } from 'react-icons/tb';
import Speechbubble from './Speechbubble';

const PokeDex = (): JSX.Element => {
  const MIN_ID = 1;
  const MAX_ID = 151;
  const randomId: number = Math.floor(Math.random() * MAX_ID) + 1;
  const [pokemon, setPokemon] = useState<Pokemon>(null);
  const [species, setSpecies] = useState<Species>(null);
  const [id, setId] = useState<number>(1);

  async function fetchPokemon(id: number) {
    if (id < MIN_ID || id > MAX_ID) {
      return;
    }

    const pokemon: Pokemon = await findPokemon(id);
    const species: Species = await findSpecies(id);
    setPokemon(pokemon);
    setSpecies(species);
    setId(pokemon.id);
  }

  useEffect(() => {
    fetchPokemon(id);
  }, []);

  function randomFlavorText(species: Species) {
    const eligbleFlavorTextEntries = species.flavor_text_entries.filter(
      (e) => e.language.name === 'en'
    );
    const lengthOfEntries = eligbleFlavorTextEntries.length;
    const randomIndex = Math.floor(Math.random() * lengthOfEntries);

    return eligbleFlavorTextEntries.at(randomIndex).flavor_text;
  }

  return (
    <div id="pokedex">
      <BlinkingLight />
      {pokemon ? (
        <div className="pokeInfo">
          <div id="pokeDisplay">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              width="200px"
            />
          </div>
          <p id="pkmnId">
            #{pokemon.id} {pokemon.name}
          </p>
          <div id="pkmnPhysical">
            <span>
              <RxHeight /> {pokemon.height / 10} m
            </span>
            <span>
              <TbWeight /> {pokemon.weight / 10} kg
            </span>
          </div>
        </div>
      ) : (
        <p>Click dem buttan</p>
      )}
      <p />
      <div id="buttonBar">
        <ButtonWithLimit
          id="prevButton"
          current={id}
          limit={MIN_ID}
          variant="contained"
          onClick={() => fetchPokemon(id - 1)}
        >
          Prev
        </ButtonWithLimit>
        <Button variant="contained" onClick={() => fetchPokemon(randomId)}>
          Random
        </Button>
        <ButtonWithLimit
          id="nextButton"
          current={id}
          limit={MAX_ID}
          variant="contained"
          onClick={() => fetchPokemon(id + 1)}
        >
          Next
        </ButtonWithLimit>
      </div>
      <Speakerphone />
      <Speechbubble>{species && randomFlavorText(species)}</Speechbubble>
    </div>
  );
};

export default PokeDex;
