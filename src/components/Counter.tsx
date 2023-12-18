import { syllable } from "syllable";

function countWords(str: string) {
  if (str.length === 0) {
    return 0;
  }
  return str.split(" ").filter((token) => token != "").length;
}

function countChars(str: string) {
  return str.length;
}

function countSentences(str: string) {
  return str.split(".").length;
}

function countLines(str: string) {
  return str.split("\n").length;
}

function countSyllables(str: string) {
  return syllable(str);
}

// const [wordCount, setWordCount] = useState<number>(0);
// const [charCount, setCharCount] = useState<number>(0);
// const [sentCount, setSentCount] = useState<number>(0);
// const [parCount, setParCount] = useState<number>(0);

interface ICounterProps {
  text: string;
}

const Counter = (props: ICounterProps) => {
  return (
    <>
      <div>There are {countWords(props.text)} words in the text box.</div>
      <div>There are {countChars(props.text)} characters in the text box.</div>
      <div>
        There are {countSentences(props.text)} sentences in the text box.
      </div>
      <div>There are {countLines(props.text)} lines in the text box.</div>
      <div>
        There are {countSyllables(props.text)} syllables in the text box.
      </div>
    </>
  );
};

export default Counter;
