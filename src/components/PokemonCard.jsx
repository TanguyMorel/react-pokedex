import React, { useEffect, useState } from 'react'

const PokemonCard = ({ name, i }) => {
  const [hp, setHp] = useState(null)
  const [type, setType] = useState(null)
  const APIURL = `https://pokeapi.co/api/v2/pokemon/${i}`

  useEffect(() => {
    async function fetchDetails() {
      try {
         const res = await fetch(APIURL)
      const data = await res.json()

      const hpObj = data.stats.find(stat => stat.stat.name === "hp")
      const hpStat = hpObj.base_stat 
      setHp(hpStat)

      const typeNames = data.types.map(type => type.type.name)
      setType(typeNames)

      } catch (e) {
        console.error(e)
      }
    }
    fetchDetails()
  }, [i])


  return (
    <div className="pokemon-card">
      <h2>{name}</h2>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`}
        alt={`Image de ${name}`}
      />
      <p>PV : {hp}</p>
      <p>Types : {type}</p>
    </div>
  )
}

export default PokemonCard