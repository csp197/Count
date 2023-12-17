import { useState } from "react";
import Header from "./components/Header";
import TextBox from "./components/TextBox";
import WordCounter from "./components/WordCounter";

function App() {
  const [text, setText] = useState<string>("");
  return (
    <>
      <Header />
      <TextBox text={text} setText={setText} />
      <WordCounter text={text} />
    </>
  );
}

export default App;
