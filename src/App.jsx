import { useState, useRef, useEffect } from "react"
import {nanoid} from "nanoid"
import Die from "./components/Die"
import Confetti from "react-confetti"

export default function App() {

  const [dice, setDice] = useState(() => generateDiceArray())

  const buttonRef = useRef(null)

  const gameWon = dice.every(die =>
    die.isHeld && die.value === dice[0].value
  );

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  if (gameWon) {
    console.log('Game Won!');
  } else {
    console.log('Keep Playing...');
  }


  function generateDiceArray() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  const generateDiceElements = dice.map((die, index) => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={() => hold(die.id)}
    />));



  function hold(id) {
    setDice(prevDice => 
      prevDice.map(die =>
        die.id === id
          ? { ...die, isHeld: !die.isHeld}
          : die
      )
    )
  }

  function rollDice() {
    !gameWon ? 
      setDice(prevDice =>
        prevDice.map((die) =>
          die.isHeld
            ? die
            : { 
                ...die,
                value: Math.ceil(Math.random() * 6)
              }
      )) :
      setDice(generateDiceArray())
  }


  return (
    <main>
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {generateDiceElements}
        </div>
        <button 
          ref={buttonRef}
          onClick={rollDice}
          className="roll-dice">
          {gameWon ? 'New Game' : 'Roll'}
        </button>
    </main>
  )
}