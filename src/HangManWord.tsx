type HangmanWordProps = {
    guessedLetters: string[]
    wordToGuess : string
    reveal?: boolean // si l'utilisateur perd, on lui revele le mot. on initialise reveal a false
}

export function HangmanWord({ guessedLetters, wordToGuess, reveal=false } : HangmanWordProps) {

    // const word = "test";
    // const guessedLetter = ["t"];

    console.log("wordToGuess", wordToGuess);
    
    return <div style={{
        display: "flex",
        gap: ".25em",
        fontSize:"6rem",
        fontWeight:"bold",
        textTransform: "uppercase",
        fontFamily: "monospace"

    }}>
        {wordToGuess.split("").map((letter, index) => (
            <span style={{borderBottom: ".1em solid black"}} key={index}>
                <span style={{
                    visibility: guessedLetters.includes(letter) || reveal 
                    ? "visible" 
                    : "hidden",
                    color: !guessedLetters.includes(letter) && reveal ? "red" : "black",
                    }}>{letter}</span>
            </span>
        ))}
    </div>
}