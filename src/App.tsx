import { useState } from "react";
import words from "./wordList.json";
import { HangManDrawing } from "./HangManDrawing";
import { HangManWord } from "./HangManWord";
import { Keyboard } from "./Keyboard";

function App() {

  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  });

  const [guessLetter, setGuessLetter] = useState<string[]>([])
  
  console.log(wordToGuess);

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
      <HangManDrawing />
      <HangManWord />
      <Keyboard />
      </div>
  )
}

export default App
