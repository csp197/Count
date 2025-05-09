import {
  calculateFleschKincaidGradeLevel,
  calculateFleschReadingEase,
  countSentences,
  countSyllables,
  countWords,
  formatGradeLevel,
  getReadabilityDescription
} from "./CountService";

interface ReadabilityInfoProps {
  text: string;
}

const ReadabilityInfo = ({ text }: ReadabilityInfoProps) => {
  const readingEase = calculateFleschReadingEase(text);
  const gradeLevel = calculateFleschKincaidGradeLevel(text);
  const formattedGradeLevel = formatGradeLevel(gradeLevel);
  const description = getReadabilityDescription(readingEase);

  // Calculate average sentence length and syllables per word
  const wordCount = countWords(text);
  const sentenceCount = countSentences(text);
  const syllableCount = countSyllables(text);
  const avgSentenceLength = sentenceCount > 0 ? (wordCount / sentenceCount).toFixed(1) : "0";
  const avgSyllablesPerWord = wordCount > 0 ? (syllableCount / wordCount).toFixed(2) : "0";

  // Get color based on readability score
  const getColor = (score: number): string => {
    if (score >= 80) return "#2b6b39"; // Dark green
    if (score >= 60) return "#0f766e"; // Teal
    if (score >= 40) return "#9c6e33"; // Brown-orange
    return "#94424f"; // Burgundy
  };

  // Get grade level color
  const getGradeLevelColor = (level: number): string => {
    if (level <= 3) return "#2b6b39"; // Dark green
    if (level <= 7) return "#0f766e"; // Teal
    if (level <= 10) return "#9c6e33"; // Brown-orange
    return "#94424f"; // Burgundy
  };

  // Render grade level indicator
  const renderGradeLevelIndicator = () => {
    const grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    const gradeLevelNum = gradeLevel < 1 ? 0 : Math.min(Math.floor(gradeLevel), 12);
    
    // Get the appropriate color for the progress bar
    const getProgressBarColor = () => {
      if (gradeLevel <= 3) return "#2b6b39"; // Dark green
      if (gradeLevel <= 7) return "#0f766e"; // Teal
      if (gradeLevel <= 10) return "#9c6e33"; // Brown-orange
      return "#94424f"; // Burgundy
    };
    
    return (
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-serif italic">K</span>
          <span className="text-xs font-serif italic">12</span>
        </div>
        <div className="w-full bg-[#d8cfbf] rounded-sm h-2">
          <div 
            style={{ 
              width: `${(gradeLevelNum / 12) * 100}%`,
              backgroundColor: getProgressBarColor(),
              height: '0.5rem',
              borderRadius: '0.125rem'
            }}
          ></div>
        </div>
      </div>
    );
  };

  // Get explanation text
  const getExplanation = () => {
    if (text.length === 0) {
      return "Enter text to see readability analysis";
    }

    if (readingEase >= 80) {
      return "Your text is easy to read and understand by a general audience.";
    } else if (readingEase >= 60) {
      return "Your text is fairly readable but could be simplified for a broader audience.";
    } else if (readingEase >= 40) {
      return "Your text may be difficult for many readers. Consider simplifying.";
    } else {
      return "Your text is very complex and difficult to read. Try shortening sentences and using simpler words.";
    }
  };

  // Get improvement tips based on readability score
  const getImprovementTips = () => {
    if (text.length === 0) return [];

    const tips = [];
    
    // Tips based on sentence length
    if (parseFloat(avgSentenceLength) > 20) {
      tips.push("Try to shorten your sentences. Aim for an average of 15-20 words per sentence.");
    }
    
    // Tips based on syllables per word
    if (parseFloat(avgSyllablesPerWord) > 1.5) {
      tips.push("Consider using simpler words with fewer syllables.");
    }
    
    // General tips based on readability score
    if (readingEase < 60) {
      tips.push("Break complex sentences into shorter ones.");
      tips.push("Replace jargon or technical terms with simpler alternatives when possible.");
      tips.push("Use active voice instead of passive voice.");
    }
    
    return tips;
  };

  const improvementTips = getImprovementTips();

  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-serif mb-4 text-center italic">Readability Analysis</h2>
        
        <div className="flex justify-center my-4">
          <div 
            className="radial-progress relative" 
            style={{
              "--value": readingEase, 
              "--size": "8rem", 
              "--thickness": "4px",
              color: getColor(readingEase)
            } as React.CSSProperties}
          >
            <div className="flex flex-col items-center absolute inset-0 justify-center">
              <span className="text-3xl font-bold font-serif" style={{ color: getColor(readingEase) }}>
                {readingEase.toFixed(0)}
              </span>
              <span className="text-xs italic text-[#594a3a]">Reading Ease</span>
            </div>
          </div>
        </div>
        
        <div className="my-4 border border-[#9c8b7a] p-4 bg-[#f8f5e6]">
          <div className="mb-3">
            <h3 className="text-base font-serif mb-1">Flesch Reading Ease</h3>
            <div className="text-lg font-bold" style={{ color: getColor(readingEase) }}>
              {readingEase.toFixed(1)}
            </div>
            <div className="text-[#594a3a] italic text-sm">{description}</div>
          </div>
          
          <div>
            <h3 className="text-base font-serif mb-1">Grade Level</h3>
            <div 
              className="text-lg font-bold" 
              style={{ color: getGradeLevelColor(gradeLevel) }}
            >
              {formattedGradeLevel === "K" ? "Kindergarten" : `Grade ${formattedGradeLevel}`}
            </div>
            <div className="text-[#594a3a] italic text-sm">US K-12 grade level</div>
            {renderGradeLevelIndicator()}
          </div>
        </div>
        
        <div className="my-4 grid grid-cols-2 gap-3">
          <div className="text-center p-2 border border-[#9c8b7a] bg-[#f8f5e6]">
            <div className="font-serif text-xs italic">Words/Sentence</div>
            <div className="text-lg font-bold text-[#433422]">{avgSentenceLength}</div>
          </div>
          <div className="text-center p-2 border border-[#9c8b7a] bg-[#f8f5e6]">
            <div className="font-serif text-xs italic">Syllables/Word</div>
            <div className="text-lg font-bold text-[#433422]">{avgSyllablesPerWord}</div>
          </div>
        </div>
        
        {improvementTips.length > 0 && (
          <div className="mt-4 p-3 bg-[#f8f5e6] border border-[#9c8b7a]">
            <h3 className="text-sm font-serif italic mb-2 border-b border-[#9c8b7a] pb-1">Notes for Improvement</h3>
            <ul className="list-disc pl-4 space-y-1 text-sm">
              {improvementTips.map((tip, index) => (
                <li key={index} className="font-serif italic">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ReadabilityInfo; 