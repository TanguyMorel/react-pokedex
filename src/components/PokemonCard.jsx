import React from 'react'

const PokemonCard = ({name, i}) => {
  return (
    <div className="pokemon-card">
        <h2>{name}</h2>
       <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i}.png`}
        alt={`Image de ${name}`}
      />
    </div>
  )
}

export default PokemonCard