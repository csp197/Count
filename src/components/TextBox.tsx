import { useState } from "react";

const TextBox = () => {
  const [text, setText] = useState<string>("");

  return (
    <div className="flex justify-center items-center">
      <textarea
        name="textbox"
        className="main-textbox-field"
        placeholder="Paste the Declaration of Independence here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
        cols={40}
      />
    </div>
  );
};

export default TextBox;
