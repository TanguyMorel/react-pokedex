import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx"
import '../styles/PokemonList.css'

const PokemonList = () => {

    const [pokemonList, setPokemonList] = useState([])

    useEffect(() => {
        async function getPokemons() {
            const APIURL = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
            try {
                const response = await fetch(APIURL)
                if(!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                }
                const json = await response.json()
                setPokemonList(json.results)
                // console.log(json.results);
                
            } catch(e) {
                console.log(e.message);
            }
        }
        getPokemons()
    },[])
  return (
    <div className="container">
        {/* <h1>Liste des 100 premiers pokémons</h1> */}
         <ul>
          {pokemonList.map((pokemon, i) => (
           <PokemonCard name={pokemon.name} i={i+1}/>
          ))}
        </ul>
    </div>
  )
}

export default PokemonList