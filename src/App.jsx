import React, { useState, useEffect } from 'react';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredData = pokemonList.filter(pokemon => {
    return (
      pokemon.name.toLowerCase() === (searchTerm.toLowerCase()) ||
      pokemon.number.toString() === searchTerm
    );
  });

  useEffect(() => {
    const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=251';

    fetch(apiURL)
      .then(response => response.json())
      .then(data => {
        const getImage = number => {
          return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
        };
        const pokemonData = data.results.map((pokemon, index) => ({
          name: pokemon.name,
          number: index + 1,
          image: getImage(index + 1)
        }));
        setPokemonList(pokemonData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className='pokedex'>
      {filteredData.map(pokemon => (
        <div key={pokemon.name}>
          <p className='name'>{pokemon.name}</p>
          <img className='sprite' src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default App;
