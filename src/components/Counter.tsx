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
    <>
      <div className="p-4">
        <h2 className="text-xl font-serif mb-4 text-center border-b border-[#9c8b7a] pb-2">Text Statistics</h2>
        <div className="divide-y divide-[#9c8b7a]/30">
          <div className="py-3 flex justify-between">
            <span className="font-serif italic">Words</span>
            <span className="font-bold text-[#433422]">{countWords(text)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-serif italic">Characters</span>
            <span className="font-bold text-[#433422]">{countChars(text)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-serif italic">Sentences</span>
            <span className="font-bold text-[#433422]">{countSentences(text)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-serif italic">Lines</span>
            <span className="font-bold text-[#433422]">{countLines(text)}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="font-serif italic">Syllables</span>
            <span className="font-bold text-[#433422]">{countSyllables(text)}</span>
          </div>
          <div className="py-3 flex flex-col">
            <div className="flex justify-between">
              <span className="font-serif italic">Pages</span>
              <span className="font-bold text-[#433422]">{countPages(text)}</span>
            </div>
            <div className="text-right">
              <span className="text-xs italic text-[#594a3a]">Approximately 500 words per page</span>
            </div>
          </div>
        </div>
        
        {text && (
          <div className="mt-4 text-center italic text-[#594a3a] text-sm border-t border-[#9c8b7a]/30 pt-2">
            <span>Approximately 200-300 pages in a typical paperback</span>
          </div>
        )}
      </div>
    </>
  );
};

// Helper function to get color based on readability score
// function getReadabilityColor(score: number): string {
//   if (score >= 80) return "text-success";
//   if (score >= 60) return "text-info";
//   if (score >= 40) return "text-warning";
//   return "text-error";
// }

export default Counter;
