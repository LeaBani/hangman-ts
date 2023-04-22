import styles from './Keyboard.module.css';

const KEYS = ["a", "b","c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m","n", "o","p","q","r","s","t","u","v","x","y","z"]

type KeyboardProps = {
    activeLetters: string[]
    inactiveLetters: string[]
    addGuessedLetter: (letter: string) => void // ne retourne rien
}
export function Keyboard({
    activeLetters, 
    inactiveLetters, 
    addGuessedLetter
} : KeyboardProps ) {
    
    return (
    
    <div style={{ display:"grid", gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", gap: ".5rem"}}>

        {KEYS.map(key => {
            // gestion des classes
            const isActive = activeLetters.includes(key);
            const isInactive = inactiveLetters.includes(key);
            return (
                <button 
                onClick={() => addGuessedLetter(key)}
                className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`} 
                disabled={isInactive ||isActive}
                key={key}
                >
                    {key}
                </button>
            )
        })}
    </div>
    )
}