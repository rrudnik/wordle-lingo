import React, { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import KeyPad from './KeyPad'

export default function Wordle({ solution }) {
  const { currentGuess, handleKeyUp, guesses, isCorrect, turn , usedKyes} = useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp)

    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [handleKeyUp])

useEffect(()=>{
//console.log( guesses, isCorrect, turn )
},[guesses, isCorrect, turn])

  return (
    <div>

      <div>current guess: {currentGuess}</div>

      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <KeyPad usedKyes={usedKyes}/>
    </div>
  )
}
