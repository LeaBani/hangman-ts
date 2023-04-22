import { useState, useEffect, useCallback } from "react";
import words from "./wordList.json";
import { HangmanDrawing } from "./HangManDrawing";
import { HangmanWord } from "./HangManWord";
import { Keyboard } from "./Keyboard";

function App() {

  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  
  // Filtrer le nombre de lettres incorrectes à partir du tableau guessLetter
  // On filtre les lettres qui ne sont pas incluses dans le mot
  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter))
  console.log(wordToGuess);


  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter)) return 
    setGuessedLetters(currenLetters => [...currenLetters, letter])
  },[guessedLetters])

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
        Lose
        Win
      </div>

      <HangmanDrawing numberOfGuesses={inCorrectLetters.length} />

      <HangmanWord guessedLetters={guessedLetters} wordToGuess={wordToGuess} />

      <div style={{alignSelf:"stretch"}}>
      <Keyboard />
      </div>

      </div>
  )
}

export default App
