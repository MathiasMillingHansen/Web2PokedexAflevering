// Pokemon.js
import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import './styles.css';
import { typeColor } from './pokemonTypes';

function Pokemon() {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => setPokemonData(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!pokemonData) return <div>Loading...</div>;

  const style = {
    backgroundColor: pokemonData.types[0] ? typeColor[pokemonData.types[0].type.name] : 'transparent',
  };

  return (
      <div className="pokemon-details-card" style={style}>

      <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <h3>{pokemonData.name}</h3>
      <p>Height: {pokemonData.height}</p>
      <p>Weight: {pokemonData.weight}</p>
      <p>Base Experience: {pokemonData.base_experience}</p>
      <p>Order: {pokemonData.order}</p>
      <p>Abilities: {pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <p>Types: {pokemonData.types.map(type => type.type.name).join(', ')}</p>
      <h4>Stats:</h4>
      <ul>
        {pokemonData.stats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>
    </div>
  );
}

export default Pokemon;