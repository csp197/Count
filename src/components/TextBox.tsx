interface ITextBoxProps {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextBox = (props: ITextBoxProps) => {

  return (
    <div className="flex justify-center items-center">
      <textarea
        name="textbox"
        className="main-textbox-field"
        placeholder="Paste the Declaration of Independence here..."
        value={props.text}
        onChange={(e) => props.setText(e.target.value)}
        rows={10}
        cols={40}
      />
    </div>
  );
};

export default TextBox;
