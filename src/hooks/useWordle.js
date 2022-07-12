import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0)
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)])
    const [history, setHistory] = useState(['ninja', 'doors'])
    const [isCorrect, setIsCorrect] = useState(false)

    const formatGuess = () => {
        console.log('formatting guess - ', { currentGuess })
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' }
        })

        //find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        //find any green letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })

        return formattedGuess
    }

    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }

        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })

        setHistory((prevHistory) => {
            return [...prevHistory, currentGuess]
        })
        
        setTurn((prevTurn) => {
            return prevTurn + 1
        })
        setCurrentGuess('')
    }

    const handleKeyUp = ({ key }) => {
        if (key === 'Enter') {
            // only add if turn is less then 5
            if (turn > 5) {
                console.log('you used all of your guesses')
                return
            }
            // do not allow duplicates
            if (history.includes(currentGuess)) {
                console.log('this word was already used')
                return
            }
            // check word is 5 chars long
            if (currentGuess.length !== 5) {
                console.log('your guess need to be 5 char long')
                return
            }
            const forrmated = formatGuess()
            addNewGuess(forrmated)
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => {
                return prev.slice(0, -1)
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