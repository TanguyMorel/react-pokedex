import { useEffect, useState } from "react"

const PokemonList = () => {

    const [pokemonList, setPokemonList] = useState([])

    useEffect(() => {
        async function getPokemons() {
            const APIURL = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0'
            try {
                const response = await fetch(APIURL)
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const json = await response.json()
                setPokemonList(json.results)
                console.log(json.results);
                
            } catch(e) {
                console.log(e.message);
            }
        }
        getPokemons()
    },[])
  return (
    <div>
        <h1>Liste des 100 premiers pokémons</h1>
         <ul>
          {pokemonList.map((pokemon, i) => (
            <li key={i}>{pokemon.name}
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`} alt={`Image de ${pokemon.name}`}/></li>
          ))}
        </ul>
    </div>
  )
}

export default PokemonList