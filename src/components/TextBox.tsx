import { useEffect, useState } from "react";

interface ITextBoxProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextBox = (props: ITextBoxProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Check for dark mode on component mount and when it changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Initial check
    checkDarkMode();
    
    // Set up observer to detect class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Clean up
    return () => observer.disconnect();
  }, []);
  
  return (
    <>
      <div className="p-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="font-serif italic text-lg">Enter your Manuscript</span>
            <span className="text-sm italic">{props.text.length} characters</span>
          </div>
          <textarea
            name="textbox"
            className="textarea border-accent-light dark:border-accent-dark textarea-reading"
            placeholder="Begin your narrative here..."
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
            rows={18}
            style={{
              backgroundColor: isDarkMode ? "#211e19" : "#f8f5e6", // Dark/Light paper
              color: isDarkMode ? "#d4c8b8" : "#433422", // Light/Dark text
              padding: "1.5rem",
              lineHeight: "1.8",
              fontStyle: "italic",
              boxShadow: isDarkMode 
                ? "inset 0 0 30px rgba(0,0,0,0.2)" 
                : "inset 0 0 30px rgba(0,0,0,0.02)"
            }}
          />
          <div className="label flex justify-between">
            <span className="text-sm italic">Your words will be analyzed as you write</span>
            <span className="text-sm italic">
              {props.text ? `${Math.ceil(countWords(props.text) / 200)} min read` : ""}
            </span>
          </div>
        </label>
      </div>
    </>
  );
};

// Simplified word count function just for reading time estimation
function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default TextBox;
