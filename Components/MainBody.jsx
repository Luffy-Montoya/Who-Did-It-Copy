import React, { useState, useEffect, useRef } from "react"
import { characters } from "../characters"
import { shuffleCharacters } from "../Functions/shuffleCharacters"

export default function MainBody() {
const [shuffled, setShuffled] = useState([])
const [charactersLeft, setCharactersLeft] = useState([])
const [active, setActive] = useState({})

// refs to prevent repeat rearrangements
const stageRef = useRef(0)

// initial shuffle
useEffect(() => {
const shuffledChars = shuffleCharacters(characters)
setShuffled(shuffledChars)
setCharactersLeft(shuffledChars)
}, [])

// handle rearrangements based on length
useEffect(() => {
const len = charactersLeft.length
if (len === 0) return


let newRows = []
if (len > 15) {
  newRows = [
    charactersLeft.slice(0, 6),
    charactersLeft.slice(6, 12),
    charactersLeft.slice(12, 18),
    charactersLeft.slice(18),
  ]
} else if (len > 9) {
  newRows = [
    charactersLeft.slice(0, 5),
    charactersLeft.slice(5, 10),
    charactersLeft.slice(10),
  ]
} else if (len > 6) {
  newRows = [charactersLeft.slice(0, 4), charactersLeft.slice(4)]
} else if (len > 4) {
  newRows = [charactersLeft.slice(0, 3), charactersLeft.slice(3)]
} else if (len > 2) {
  newRows = [charactersLeft.slice(0, 2), charactersLeft.slice(2)]
} else {
  newRows = [charactersLeft]
}

setRows(newRows)


}, [charactersLeft])

// store rows in state
const [rows, setRows] = useState([])

// helper: size classes
function getCharacterSize(len) {
if (len > 15 && len < 25) return "char-size-1"
if (len > 9 && len <= 15) return "char-size-2"
if (len > 5 && len <= 9) return "char-size-3"
if (len > 2 && len <= 5) return "char-size-4"
if (len === 2) return "char-size-5"
if (len === 1) return "char-size-6"
return "default"
}

function getContainerSize(len) {
if (len > 15 && len < 25) return "cont-size-1"
if (len > 9 && len <= 15) return "cont-size-2"
if (len > 5 && len <= 9) return "cont-size-3"
if (len > 2 && len <= 5) return "cont-size-4"
if (len === 2) return "cont-size-5"
if (len === 1) return "cont-size-6"
return "default"
}

const characterSize = getCharacterSize(charactersLeft.length)
const containerSize = getContainerSize(charactersLeft.length)

// click handler
const selectCharacter = (charName) => {
setActive((prev) => ({ ...prev, [charName]: true }))
setTimeout(() => {
setCharactersLeft((prev) => prev.filter((c) => c.name !== charName))
}, 700) // matches CSS transition
}

return ( <div className="main-body">
{rows.map((row, i) => (
<div
key={i}
className={`image-container ${
            row.length < 1 ? "empty" : ""
          } ${containerSize}`}
>
{row.map((character) => (
<div
key={character.name}
className={`character-container ${
                active[character.name] ? "active" : ""
              } ${characterSize}`}
onClick={() => selectCharacter(character.name)}
> <img className="characters" src={character.image} /> <p className="character-name">{character.name}</p> </div>
))} </div>
))}
<button onClick={() => console.log(charactersLeft)}>Left</button> </div>
)
}
