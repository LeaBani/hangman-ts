import { useState, useEffect, useCallback } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangManDrawing";
import { HangmanWord } from "./HangManWord";
import { Keyboard } from "./Keyboard";

function App() {

  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });

  console.log('wordToGuess', wordToGuess);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  
  // Filtrer le nombre de lettres incorrectes à partir du tableau guessLetter
  // On filtre les lettres qui ne sont pas incluses dans le mot
  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  

  // Lose / Win
  const isLoser = inCorrectLetters.length >= 6 // 6 chances de réussir
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter)) // si les lettres choisies sont inclues dans le mot à trouver

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isWinner || isLoser) // bloque l'ajout de lettre via le clavier de l'ordinateur
      return 
        setGuessedLetters(currenLetters => [...currenLetters, letter])
  },[guessedLetters, isLoser, isWinner])

  // Cette fonction permet d'ajouter au tableau les lettres testées. 
  // Si la lettre testée n'est pas contenue dans le mot à trouver, on passe a la suite
  // function addGuessedLetter(letter: string) {
  //  if (guessedLetters.includes(letter)) return 
  //   setGuessedLetters(currenLetters => [...currenLetters, letter])
  // }

  useEffect(() => {

    // Ajouter la possibilité d'utiliser le clavier à l'évenement
    const handler = (e: KeyboardEvent) => {
      const key = e.key
      // utilisation des regex (ici, pour toute lettre comprise entre a et z)
      if (!key.match(/^[a-z]$/)) return 
      e.preventDefault();
      // on passe a la fonction la letter du clavier
      addGuessedLetter(key)
    }

    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  },[guessedLetters])

  return (
    <div style={{
      maxWidth: "800px",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      margin: "0 auto",
      alignItems: "center",
    }}>
      <div style={{
        fontSize: "2rem",
        textAlign: "center"
      }}>
        {isWinner && "Gagné!!"}
        {isLoser && "Perdu, rafraîchi la page pour recommencer"}

      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />

      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

      <div style={{alignSelf:"stretch"}}>
      <Keyboard 
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={inCorrectLetters}
        addGuessedLetter={addGuessedLetter} 
      />
      </div>

      </div>
  )
}

export default App
