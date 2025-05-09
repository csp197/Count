import { useState, useEffect } from "react";
import Header from "./components/Header";
import TextBox from "./components/TextBox";
import Counter from "./components/Counter";
import ReadabilityInfo from "./components/ReadabilityInfo";
import ReadingProgress from "./components/ReadingProgress";
import ComplexWordHighlighter from "./components/ComplexWordHighlighter";

function App() {
  const [text, setText] = useState<string>("");
  const [targetGradeLevel, setTargetGradeLevel] = useState<number>(8);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Update page number based on word count
  useEffect(() => {
    if (!text) {
      setPageNumber(1);
      return;
    }
    
    // Calculate a page number based on word count (1 page per 500 words)
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const calculatedPage = Math.max(1, Math.ceil(wordCount / 500));
    setPageNumber(calculatedPage);
  }, [text]);

  const handleGradeLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setTargetGradeLevel(value === "K" ? 0 : parseInt(value, 10));
  };

  return (
    <>
      <ReadingProgress />
      <div className="min-h-screen paper-texture py-10">
        <div className="container mx-auto px-4 pb-10 pt-2">
          <div className="book-wrapper mx-auto" style={{ maxWidth: '1200px' }}>
            <div className="book-spine hidden md:block"></div>
            <div className="book-page pb-6">
              <Header />
              
              {/* <div className="book-header">
                <div className="chapter-title">Your Manuscript</div>
              </div> */}
              
              <div className="flex flex-col md:flex-row gap-6 mt-8">
                <div className="w-full md:w-2/3">
                  <div className="book-page">
                    <div className="chapter-marker">Chapter I</div>
                    <TextBox text={text} setText={setText} />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <div className="book-page">
                    <div className="chapter-marker">Chapter II</div>
                    <Counter text={text} />
                  </div>
                  
                  {/* Target Grade Level Selector */}
                  <div className="book-page mt-4">
                    <div className="chapter-marker">Chapter III</div>
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-3">Target Grade Level</h2>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Select your target audience's grade level:</span>
                        </label>
                        <select 
                          className="select select-bordered w-full bg-[#f8f5e6] border-[#7a6c5d]" 
                          value={targetGradeLevel === 0 ? "K" : targetGradeLevel.toString()}
                          onChange={handleGradeLevelChange}
                        >
                          <option value="K">Kindergarten</option>
                          <option value="1">Grade 1</option>
                          <option value="2">Grade 2</option>
                          <option value="3">Grade 3</option>
                          <option value="4">Grade 4</option>
                          <option value="5">Grade 5</option>
                          <option value="6">Grade 6</option>
                          <option value="7">Grade 7</option>
                          <option value="8">Grade 8 (General Public)</option>
                          <option value="9">Grade 9</option>
                          <option value="10">Grade 10</option>
                          <option value="11">Grade 11</option>
                          <option value="12">Grade 12</option>
                        </select>
                        <div className="label">
                          <span className="label-text-alt">
                            Most content for the general public is written at a 7th-8th grade level.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {text.length > 0 && (
                <div className="mt-8">
                  {/* Display chapters IV and V in a horizontal row */}
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <div className="book-page h-full">
                        <div className="chapter-marker">Chapter IV</div>
                        <ReadabilityInfo text={text} />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2">
                      <div className="book-page h-full">
                        <div className="chapter-marker">Chapter V</div>
                        <ComplexWordHighlighter text={text} targetGradeLevel={targetGradeLevel} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="reading-container text-center mt-6">
                    <div className="book-page-number">
                      <div className="font-serif italic">— {pageNumber} —</div>
                      <div className="text-xs text-[#594a3a] italic mt-1">
                        {pageNumber > 1 ? `Approximately ${pageNumber} pages in a typical paperback` : ""}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
