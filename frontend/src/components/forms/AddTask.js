import { useContext, useState } from "react";
import Input from "../atoms/Input";
import { MultiContext } from "../../Context";

export default function AddTask() {
  const multiCtx = useContext(MultiContext);

  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => setTitle(e.target.value);

  return (
    <form
      onSubmit={(e) => {
        multiCtx.addTask(e, title);
        setTitle("");
      }}>
      <input
        onFocus={(e) => e.target.select()}
        className="new-task title-input"
        placeholder="+ New"
        value={title}
        onChange={onChangeTitle}
      />
    </form>
  );
}
