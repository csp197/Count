import { syllable } from "syllable";
import { useState, useEffect } from "react";
import { calculateFleschKincaidGradeLevel } from "./CountService";

interface ComplexWordHighlighterProps {
  text: string;
  syllableThreshold?: number;
  targetGradeLevel?: number;
}

const ComplexWordHighlighter = ({ 
  text, 
  syllableThreshold = 3,
  targetGradeLevel = 8 // Default target is 8th grade (common recommendation)
}: ComplexWordHighlighterProps) => {
  const [highlightedText, setHighlightedText] = useState<React.ReactNode[]>([]);
  const [complexWordCount, setComplexWordCount] = useState(0);
  
  useEffect(() => {
    if (!text) {
      setHighlightedText([]);
      setComplexWordCount(0);
      return;
    }
    
    // Split text into words while preserving spaces and punctuation
    const tokens = text.split(/(\s+|[.,!?;:()])/g);
    const result: React.ReactNode[] = [];
    let complexCount = 0;
    
    tokens.forEach((token, index) => {
      // Skip spaces and punctuation
      if (!token.trim() || /^[.,!?;:()]+$/.test(token)) {
        result.push(token);
        return;
      }
      
      // Check if the word is complex based on syllable count
      const syllableCount = syllable(token);
      
      if (syllableCount >= syllableThreshold) {
        complexCount++;
        result.push(
          <span 
            key={index} 
            className="bg-[#e8d6a7] hover:bg-[#d1bc88] rounded-sm px-1 transition-colors cursor-help border-b border-dashed border-[#9c8b7a]" 
            title={`${syllableCount} syllables`}
          >
            {token}
          </span>
        );
      } else {
        result.push(token);
      }
    });
    
    setHighlightedText(result);
    setComplexWordCount(complexCount);
  }, [text, syllableThreshold]);
  
  // Calculate the current grade level
  const currentGradeLevel = calculateFleschKincaidGradeLevel(text);
  const isAboveTargetGrade = currentGradeLevel > targetGradeLevel;
  
  // Limit the displayed text to keep the component height reasonable
  const getDisplayText = () => {
    if (!text) return "No text to analyze";
    
    // Return the highlighted text with a reasonable height
    return (
      <div className="overflow-y-auto max-h-[300px]">
        {highlightedText}
      </div>
    );
  };
  
  return (
    <>
      <div className="p-4">
        <h2 className="text-xl font-serif mb-4 text-center italic">Complexity Analysis</h2>
        
        <div className="flex justify-between items-center mb-3 border-b border-[#9c8b7a] pb-2">
          <h3 className="font-serif text-sm italic">Highlighted Words</h3>
          <div className={`px-2 py-1 text-xs border font-serif italic ${complexWordCount > 10 ? 'border-[#9c6e33] text-[#9c6e33]' : 'border-[#0f766e] text-[#0f766e]'}`}>
            {complexWordCount} complex words
          </div>
        </div>
        
        {isAboveTargetGrade && text.length > 0 && (
          <div className="mb-3 border-l-4 border-[#9c6e33] pl-3 py-1 bg-[#f8f5e6] italic">
            <div className="text-xs font-serif">
              <span className="text-[#9c6e33] font-semibold">Note:</span> Text at grade level {currentGradeLevel.toFixed(1)}, 
              above target grade {targetGradeLevel}.
            </div>
          </div>
        )}
        
        <div className="bg-[#f8f5e6] p-3 border border-[#9c8b7a] mb-3">
          <p className="text-[#433422] leading-relaxed font-serif text-sm">
            {getDisplayText()}
          </p>
        </div>
        
        <div className="text-xs text-[#594a3a] italic text-center">
          Words with {syllableThreshold}+ syllables are highlighted
        </div>
      </div>
    </>
  );
};

export default ComplexWordHighlighter; 