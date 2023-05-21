import React, { useState, useEffect } from 'react';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Input para el término de búsqueda
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredData = pokemonList.filter(pokemon => {
    return (
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.number.toString().includes(searchTerm)
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
        const getDescription =  number => {
            return `https://pokeapi.co/api/v2/pokemon-species/${number}/`;
        }
        const pokemonData = data.results.map((pokemon, index) => ({
          name: pokemon.name,
          number: index + 1,
          image: getImage(index + 1),
          description: getDescription(index +1)
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
      {filteredData.map(pokemon => (
        <div key={pokemon.name}>
          <p>{pokemon.name}</p>
          <p>{pokemon.description}</p>
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
      ))}
    </div>
  );
};

export default App;
