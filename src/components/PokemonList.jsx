import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx"
import '../styles/PokemonList.css'
import SearchBar from "./SearchBar"


const PokemonList = () => {

    const [pokemonList, setPokemonList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const filteredPokemon = pokemonList.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getIdFromUrl = (url) => {
        const parts = url.split("/");
        return parts[parts.length - 2];
    };



    useEffect(() => {
        async function getPokemons() {
            const APIURL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
            try {
                const response = await fetch(APIURL)
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const json = await response.json()
                setPokemonList(json.results)
                // console.log(json.results);

            } catch (e) {
                console.log(e.message);
            }
        }
        getPokemons()
    }, [])
    return (
        <div className="container">
            <SearchBar onSearchChange={setSearchTerm} />

            {/* <h1>Liste des 100 premiers pokémons</h1> */}
            <ul>
                {filteredPokemon.map((pokemon) => (
                    <PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                        i={getIdFromUrl(pokemon.url)}
                    />
                ))}

            </ul>
        </div>
    )
}

export default PokemonList