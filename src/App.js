
import './App.css';
import React, { useEffect, useState } from 'react'
import SinglePokemon from './components/SinglePokemon'
import LostBanner from './components/LostBanner'

function App() {
  const [pokemon, setPokemon] = useState([])
  //const [loading, setLoading] = useState(true)
  const [clickedPokemon, setClickedPokemon] = useState([])
  const [scoreCount, setScoreCount] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  //const [gameOver, setGameOver] = useState(false)
  const [lostBanner, setLostBanner] = useState(false)

  function genGameboardCards(data, num) {
    return data.sort(() => Math.random() - Math.random()).slice(0, num)
  }


  function addToClicked(pokemon) {
    const hasBeenClicked = clickedPokemon.some(id => id === pokemon.id)
    if (hasBeenClicked) {
      if (scoreCount > bestScore) {
        setBestScore(scoreCount)
      }
      //setGameOver(true)
      setClickedPokemon([])
      setLostBanner(true)
      fetchPokemon()
      return
    }
    setClickedPokemon(prevPokemon => [...prevPokemon, pokemon.id])
    setScoreCount(prevCount => prevCount + 1)
  }

  function shufflePokemon(e) {
    const hasBeenClicked = clickedPokemon.some(id => id === e.currentTarget.id)
    if (!hasBeenClicked) {
      const shuffledPokemon = pokemon.sort(() => Math.random() - Math.random()).slice(0, pokemon.length)

      setPokemon(shuffledPokemon)
    }
    addToClicked(e.currentTarget)
  }

  const fetchPokemon = async () => {
    //setLoading(true)
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
    const shuffledPokemon = genGameboardCards(allPokeData, 25)

    setPokemon(shuffledPokemon)
    // setLoading(false)

    // setGameOver(false)

  }
  useEffect(() => {
    console.log('fetching new pokemon...')

    fetchPokemon()
  }, [])

  const displayBanner = (
    <div className="lostBanner">
      <h3>Oops, you clicked the same Pokemon twice...you lose!</h3>
      <p>Score: {scoreCount}</p>
      <p>Try again with new pokemon...</p>
      <button onClick={() => {
        setLostBanner(false)
        setScoreCount(0)
      }}>Play Again</button>
    </div>
  )
  return (
    <div className="content-container">

      <h1> Pokemon Memory Game</h1>
      <div className='score-container'>
        <p>Score: {scoreCount}</p>
        <p>High Score: {bestScore}</p>
      </div>

      {
        <div className='pokemon-container'>
          {lostBanner ? displayBanner : ''}
          {pokemon.map(poke => {
            return (
              <SinglePokemon
                addToClicked={addToClicked}
                shufflePokemon={shufflePokemon}
                poke={poke}
                lostBanner={lostBanner}
              />
            )
          })}
        </div>
      }
    </div>

  );
}

export default App;
