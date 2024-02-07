interface ITextBoxProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const TextBox = (props: ITextBoxProps) => {
  return (
    <div className="flex justify-center items-center p-5">
      <label className="form-control">
        <div className="label">
          <span className="label-text">Your bio</span>
          <span className="label-text-alt">Alt label</span>
        </div>
        <textarea
          name="textbox"
          className="textarea textarea-bordered"
          placeholder="Paste the Declaration of Independence here..."
          value={props.text}
          onChange={(e) => props.setText(e.target.value)}
          rows={18}
          cols={120}
        />
        <div className="label">
          <span className="label-text-alt">Your bio</span>
          <span className="label-text-alt">Alt label</span>
        </div>
      </label>
    </div>

    // <div className="flex justify-center items-center p-8 text-gray-900">
    //   <textarea
    //     name="textbox"
    //     className="main-textbox-field"
    //     placeholder="Paste the Declaration of Independence here..."
    //     value={props.text}
    //     onChange={(e) => props.setText(e.target.value)}
    //     rows={25}
    //     cols={120}
    //   />
    // </div>
  );
};

export default TextBox;
