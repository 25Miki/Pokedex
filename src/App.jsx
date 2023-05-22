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
      pokemon.number.toString() === (searchTerm)
    );
  });

  useEffect(() => {
    const fetchPokemonData = async () => {
      const apiURL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

      try {
        const response = await fetch(apiURL);
        const data = await response.json();

        const getImage = number => {
          return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
        };

        const pokemonData = await Promise.all(
          data.results.map(async (pokemon, index) => {
            const responsePokemon = await fetch(pokemon.url);
            const dataPokemon = await responsePokemon.json();
            const speciesResponse = await fetch(dataPokemon.species.url);
            const speciesData = await speciesResponse.json();
            const flavorText = speciesData.flavor_text_entries.find(
              entry => entry.language.name === 'en'
            ).flavor_text;

            return {
              name: pokemon.name,
              number: index + 1,
              image: getImage(index + 1),
              flavorText: flavorText
            };
          })
        );

        setPokemonList(pokemonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemonData();
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
              <p className='number'>{pokemon.number}</p>
              <p>{pokemon.flavorText}</p>
              <div className='screen'>
                <img className='sprite' src={pokemon.image} alt={pokemon.name} />
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default App;
