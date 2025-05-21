import React, { useEffect, useState } from 'react'
import '../styles/PokemonCard.css'

const PokemonCard = ({ name, i }) => {
  const [hp, setHp] = useState(null)
  const [type, setType] = useState([])
  const [attack, setAttack] = useState("")
  const [defense, setDefense] = useState("")
  const [speed, setSpeed] = useState("")
  const [weight, setWeight] = useState("")
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
        setAttack(attackStat)

        const defenseObj = data.stats.find(stat => stat.stat.name === "defense")
        const defenseStat = defenseObj?.base_stat
        setDefense(defenseStat)

        const speedObj = data.stats.find(stat => stat.stat.name === "speed")
        const speedStat = speedObj?.base_stat
        setSpeed(speedStat)

        const weight = data.weight
        setWeight(weight)

      } catch (e) {
        console.error(e)
      }
    }
    fetchDetails()
  }, [i])


  return (
    <li className="pokemon-card">
      <div className="head-card">
        <div className="top-head-card">
          <h2>{name}</h2>
          <p>PV : {hp}</p>
        </div>
          <div className="bottom-head-card">
            <p>#{i}</p>
          </div>
      </div>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`}
        alt={`Image de ${name}`}
      />
      <div className="types-container" style={{ display: "flex", gap: "10px" }}>
        {type.map((type, index) => (
          <span key={index} className="type-badge" style={{ padding: "4px 10px" }}>{type}</span>
        ))}
      </div>
      <div className="bottom-card">
        <div className="top">
          <p>Attaque: <span className='bold'>{attack} </span></p>
          <p>Défense: <span className='bold'>{defense} </span></p>
        </div>
        <div className="bottom">
          <p>Speed: <span className='bold'>{speed} </span></p>
          <p>weight: <span className='bold'>{weight / 10}kg </span></p>
        </div>
      </div>
    </li>
  )
}

export default PokemonCard