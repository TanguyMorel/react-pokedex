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
        <h1>Liste des 100 premiers pokémons (en log)</h1>
    </div>
  )
}

export default PokemonList