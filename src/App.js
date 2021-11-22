
import './App.css';
import React, { useEffect, useState } from 'react'
import SinglePokemon from './components/SinglePokemon'

function App() {
  const [pokemon, setPokemon] = useState([])
  const [loading, setLoading] = useState(true)
  const [clickedPokemon, setClickedPokemon] = useState([])

  function genGameboardCards(num) {
    const boardGameArr = []
    for (let i = 0; i < num; i++) {
      const ranNum = Math.floor(Math.random() * num)
      boardGameArr.push(pokemon.splice(ranNum, 1))
    }
    console.log(boardGameArr)
  }

  function addToClicked(pokemon) {
    console.log(pokemon)
  }

  function shufflePokemon(e) {
    console.log('shuffling pokemon')
    const shuffledPokemon = pokemon.sort(() => Math.random() - Math.random()).slice(0, pokemon.length)
    console.log(shuffledPokemon)
    addToClicked(e.currentTarget)
    setPokemon(shuffledPokemon)
  }
  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true)
      const first151Pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151')
        .then(resp => resp.json())
        .then(resp => resp.results)
      const pokeUrls = first151Pokemon.map(item => item.url)
      const allPokeData = await Promise.all(pokeUrls.map(url => fetch(url)))
        .then(responses =>
          Promise.all(responses.map(res => res.json()))
        )
      allPokeData.forEach(pokemon => {
        pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
      })
      const shuffledPokemon = allPokeData.sort(() => Math.random() - Math.random()).slice(0, 25)
      setPokemon(shuffledPokemon)
      setLoading(false)

    }
    fetchPokemon()

  }, [])

  console.log(pokemon)
  return (
    <div>
      <h1> Pokemon Memory Game</h1>
      {
        loading ? <h3>Loading...</h3> :
          <div className='pokemon-container'>
            {pokemon.map(poke => {
              return (
                <SinglePokemon
                  addToClicked={addToClicked}
                  shufflePokemon={shufflePokemon}
                  poke={poke} />
              )
            })}
          </div>
      }
    </div>

  );
}

export default App;
