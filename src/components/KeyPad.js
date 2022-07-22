import React, { useEffect, useState } from 'react'

export default function KeyPad({ usedKyes }) {
    const [letters, setLetters] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/letters')
            .then(res => res.json())
            .then(json => {
                setLetters(json)
            })
    }, [])
    return (
        <div className="keypad">
            {letters && letters.map((l) => {
                const color = usedKyes[l.key]
                return (
                    <div key={l.key} className={color}>{l.key}</div>
                )
            })}
        </div>
    )
}
