// PokemonPreview.js
import React from 'react';
import { typeColor } from './pokemonTypes';

function PokemonPreview({ pokemon }) {

  const style = {
    backgroundColor: pokemon.types[0] ? typeColor[pokemon.types[0].type.name] : 'transparent',
  };

  return (
    <div className="pokemon-card" style={style}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
}

export default PokemonPreview;