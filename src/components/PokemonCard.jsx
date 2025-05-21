import React, { useEffect, useState } from 'react'

const PokemonCard = ({ name, i }) => {
  const [hp, setHp] = useState(null)
  const [type, setType] = useState([])
  const [attack, setAttack] = useState("")
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
        const attackObj = data.stats.find(stat => stat.stat.name === "attack")
        const attackStat = attackObj?.base_stat
        console.log(data.stats)
        setAttack(attackStat)

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
      <div className="types" style={{ display: "flex", gap: "10px" }}>
        {type.map((type, index) => (
          <span key={index} className="type-badge" style={{ padding: "4px 10px" }}>{type}</span>
        ))}
      </div>
      <div className="bottom-card">
        <p>Attaque : {attack}</p>
      </div>

    </div>
  )
}

export default PokemonCard