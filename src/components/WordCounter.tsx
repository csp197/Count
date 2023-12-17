function countWords(str: string) {
  if (str.length === 0) {
    return 0;
  }
  return str.split(" ").length;
}

interface IWordCounterProps {
  text: string;
}

const WordCounter = (props: IWordCounterProps) => {
  return <>There are {countWords(props.text)} words in the text box.</>;
};

export default WordCounter;
