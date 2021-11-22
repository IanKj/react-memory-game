import React from 'react'
import '../App.css'

function SinglePokemon({ poke, shufflePokemon }) {
    return (
        <div id={poke.id} className='card-container' onClick={(e) => shufflePokemon(e)}>
            <div className='card-wrapper'>
                <img alt="pokemon artwork" src={poke.image} />
                <p key={poke.id}>{poke.name}</p>
            </div>
        </div>
    )
}

export default SinglePokemon