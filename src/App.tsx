import { useState } from "react";
import Header from "./components/Header";
import TextBox from "./components/TextBox";
import Counter from "./components/Counter";

function App() {
  const [text, setText] = useState<string>("");

  return (
    <>
      <Header />
      <TextBox text={text} setText={setText} />
      <Counter text={text} />
    </>
  );
}

export default App;
