interface ITextBoxProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextBox = (props: ITextBoxProps) => {
  return (
    <>
      <div className="p-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="font-serif italic text-lg">Enter your Manuscript</span>
            <span className="text-sm text-[#594a3a] italic">{props.text.length} characters</span>
          </div>
          <textarea
            name="textbox"
            className="textarea border-[#9c8b7a] textarea-reading"
            placeholder="Begin your narrative here..."
            value={props.text}
            onChange={(e) => props.setText(e.target.value)}
            rows={18}
            style={{
              backgroundColor: "#f8f5e6", // Cream paper
              color: "#433422", // Dark brown text
              padding: "1.5rem",
              borderColor: "#9c8b7a",
              lineHeight: "1.8",
              fontStyle: "italic",
              boxShadow: "inset 0 0 30px rgba(0,0,0,0.02)"
            }}
          />
          <div className="label flex justify-between">
            <span className="text-sm text-[#594a3a] italic">Your words will be analyzed as you write</span>
            <span className="text-sm text-[#594a3a] italic">
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
