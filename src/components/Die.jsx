export default function Die({value, isHeld, hold }) {
    return (
      <button 
        onClick={hold}
        style={{backgroundColor: isHeld ?  '#59E391' : 'white'}}
        aria-pressed={isHeld}
        aria-label={`Die with value ${value}, ${isHeld ? "held" : "not held"}`}
        className="die">
        {value}
      </button>
    )
}