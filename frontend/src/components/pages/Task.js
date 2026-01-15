import { useContext, useEffect, useState } from "react";
import Button from "../atoms/Button";
import { MultiContext } from "../../Context";
import Input from "../atoms/Input";

export default function Task() {
  const multiCtx = useContext(MultiContext);

  const [title, setTitle] = useState("");
  const onChangeTitle = (e) => setTitle(e.target.value);

  const [description, setDescription] = useState("");
  const onChangeDescription = (e) => setDescription(e.target.value);

  const [tag, setTag] = useState("");
  const onChangeTag = (e) => setTag(e.target.value);

  useEffect(() => {
    setTitle(multiCtx.currentTask?.title);
    setDescription(multiCtx.currentTask?.description);
    setTag(multiCtx.currentTask?.tag);
  }, [multiCtx.currentTask]);

  return (
    <div>
      <Button
        icon="chevron-left"
        onClick={() => multiCtx.setCurrentTask(null)}
      />
      <div className="d-flex mt-3">
        <form
          onSubmit={(e) => multiCtx.editTask(e, title, description, tag)}
          className="mx-auto w-75">
          <Input required value={title} onChange={onChangeTitle} />
          <textarea
            value={description}
            onChange={onChangeDescription}
            className="form-control mt-2"
            rows={10}
            placeholder="Description"></textarea>
          <Input
            className="mt-2"
            placeholder="Tag"
            value={tag}
            onChange={onChangeTag}
          />
          <Button
            text="Edit"
            icon="pencil"
            className="w-100 mt-2"
            type_="submit"
          />
        </form>
      </div>
    </div>
  );
}
