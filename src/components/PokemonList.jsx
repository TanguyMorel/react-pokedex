import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";
import '../styles/PokemonList.css';
import SearchBar from "./SearchBar";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(50);

  const filteredPokemon = pokemonList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIdFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 2];
  };

  const fetchPokemons = async () => {
    const APIURL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const response = await fetch(APIURL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();

      const detailed = await Promise.all(json.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const data = await res.json();
        const types = data.types.map(t => t.type.name);
        return {
          name: pokemon.name,
          url: pokemon.url,
          types: types,
        };
      }));

      setPokemonList(prev => [...prev, ...detailed]);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  return (
    <div className="container">
      <SearchBar onSearchChange={setSearchTerm} />
      <ul>
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            i={getIdFromUrl(pokemon.url)}
          />
        ))}
      </ul>
      <button onClick={() => setOffset(prev => prev + limit)}>
        Voir plus
      </button>
    </div>
  );
};

export default PokemonList;
