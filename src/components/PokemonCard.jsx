import React, { useEffect, useRef, useState } from 'react'
import '../styles/PokemonCard.css'

const PokemonCard = ({ name, i }) => {
  const [hp, setHp] = useState(null)
  const [type, setType] = useState([])
  const [attack, setAttack] = useState("")
  const [defense, setDefense] = useState("")
  const [speed, setSpeed] = useState("")
  const [weight, setWeight] = useState("")
  const APIURL = `https://pokeapi.co/api/v2/pokemon/${i}`


  const mainType = type[0]

  const typeGradients = {
    grass: 'linear-gradient(135deg, #9bcc50, #4CAF50)',
    fire: 'linear-gradient(135deg, #ff9a00, #ff3d00)',
    water: 'linear-gradient(135deg, #2196F3, #03A9F4)',
    electric: 'linear-gradient(135deg, #fceabb, #f8b500)',
    bug: 'linear-gradient(135deg, #a8b820, #6e7f0e)',
    normal: 'linear-gradient(135deg, #dcdcdc, #a8a878)',
    poison: 'linear-gradient(135deg, #a040a0, #6a1b9a)',
    ground: 'linear-gradient(135deg, #e0c068, #b89452)',
    fairy: 'linear-gradient(135deg, #fce4ec, #f06292)',
    fighting: 'linear-gradient(135deg, #d32f2f, #ef5350)',
    psychic: 'linear-gradient(135deg, #ff80ab, #ea80fc)',
    rock: 'linear-gradient(135deg, #b8a038, #827717)',
    ghost: 'linear-gradient(135deg, #7b62a3, #4a148c)',
    ice: 'linear-gradient(135deg, #b2ebf2, #4dd0e1)',
    dragon: 'linear-gradient(135deg, #6f35fc, #0d47a1)',
    dark: 'linear-gradient(135deg, #5d4037, #212121)',
    steel: 'linear-gradient(135deg, #b0bec5, #607d8b)',
    flying: 'linear-gradient(135deg, #a890f0, #81d4fa)'
  }

  const bgColor = typeGradients[mainType] || 'linear-gradient(135deg, #e0e0e0, #bdbdbd)'

  const typeColors = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    bug: '#A8B820',
    normal: '#A8A878',
    poison: '#A040A0',
    ground: '#E0C068',
    fairy: '#EE99AC',
    fighting: '#C03028',
    psychic: '#F85888',
    rock: '#B8A038',
    ghost: '#705898',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    flying: '#A890F0'
  }

  const bgColorType = typeColors[mainType] || '#ddd'



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

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

   const cardRef = useRef(null)
  const artworkRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const artwork = artworkRef.current

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      artwork.style.opacity = 1
    }

    const handleMouseLeave = () => {
      artwork.style.opacity = 0
    }

    const update = () => {
      currentX += (mouseX - currentX) * 0.1
      currentY += (mouseY - currentY) * 0.1

      artwork.style.transform = `translate(${currentX}px, ${currentY}px)`
      requestAnimationFrame(update)
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    requestAnimationFrame(update)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])


  return (
    <li className="pokemon-card" ref={cardRef} style={{ background: bgColor }}>
      <div className="head-card">
        <div className="top-head-card">
          <h2>{capitalizedName}</h2>
          <div className="floating-artwork" ref={artworkRef}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${i}.gif
`}
              alt={`Artwork de ${name}`}
            />
          </div>

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
        {type.map((typeName, index) => (
          <span
            key={index}
            className="type-badge"
            style={{
              backgroundColor: typeColors[typeName] || "#ccc",
              color: "white",
              padding: "4px 10px",
              borderRadius: "999px",
              fontWeight: "bold",
              fontSize: "0.9rem",
              textTransform: "capitalize"
            }}
          >
            {typeName}
          </span>
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