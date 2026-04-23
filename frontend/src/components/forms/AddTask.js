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
      <Input
        // label="New Task"
        icon="bi:plus-circle"
        placeholder="New Task"
        value={title}
        onChange={onChangeTitle}
      />
    </form>
  );
}
