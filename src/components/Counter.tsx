import {
  countChars,
  countLines,
  countPages,
  countSentences,
  countSyllables,
  countWords,
} from "./CountService.ts";

interface ICounterProps {
  text: string;
}

const Counter = ({ text }: ICounterProps) => {
  return (
    <div className="flex flex-col text-gray-900">
      <div>There are {countWords(text)} words in the text box.</div>
      <div>There are {countChars(text)} characters in the text box.</div>
      <div>There are {countSentences(text)} sentences in the text box.</div>
      <div>There are {countLines(text)} lines in the text box.</div>
      <div>There are {countSyllables(text)} syllables in the text box.</div>
      <div>There are {countPages(text)} pages in the text box.</div>
    </div>
  );
};

export default Counter;
