// Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PokemonPreview from './PokemonPreview';
import './styles.css';

const PAGE_SIZE = 24; // Number of Pokémon to display per page

function Home() {
  const [pokemonData, setPokemonData] = useState([]);
  const [page, setPage] = useState(1); // Add state for the current page

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`)
      .then(response => response.json())
      .then(data => {
        const promises = data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()));
        Promise.all(promises)
          .then(pokemonData => setPokemonData(pokemonData))
          .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
  }, [page]); // Add page as a dependency

  return (
    <div className="container">
      <h1 className='title'>Pokedex :3</h1>
      <div className="pokemon-list">
        {pokemonData.map(pokemon => (
          <Link className="link" key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
            <PokemonPreview pokemon={pokemon} />
          </Link>
        ))}
      </div>
      <button className="button" onClick={() => setPage(page => Math.max(page - 1, 1))}>Previous</button>
<button className="button" onClick={() => setPage(page => page + 1)}>Next</button>
    </div>
  );
}

export default Home;