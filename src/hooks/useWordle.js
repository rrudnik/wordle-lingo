import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([])
    const [history, setHistory] = useState(['hello','ninja'])
    const [isCorrect, setIsCorrect] = useState(false)

    const formatGuess = () => {
        console.log('formatting guess'- {currentGuess})
    }

    const addNewGuess = () => {

    }

    const handleKeyUp = ({ key }) => {
        if(key === 'Enter'){
            // only add if turn is less then 5
            if (turn > 5){
                console.log('you used all of your guesses')
                return
            }
            // do not allow duplicates
            if (history.includes(currentGuess)){
                console.log('this word was already used')
                return
            }
            // check word is 5 chars long
            if (currentGuess.length !==5){
                console.log('your guess need to be 5 char long')
                return
            }
            formatGuess()
        }

        if(key ==='Backspace'){
            setCurrentGuess((prev) => {
                return prev.slice(0,-1)
            })
            return 
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => {
                    return prev + key
                })
            }
        }
    }

    return { turn, currentGuess, guesses, isCorrect, handleKeyUp }

}

export default useWordle