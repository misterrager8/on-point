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

  const [isChanged, setIsChanged] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTitle(multiCtx.currentTask?.title);
    setDescription(multiCtx.currentTask?.description);
    setTag(multiCtx.currentTask?.tag);
  }, [multiCtx.currentTask]);

  useEffect(() => {
    setIsChanged(
      title !== multiCtx.currentTask?.title ||
        description !== multiCtx.currentTask?.description ||
        tag !== multiCtx.currentTask?.tag,
    );
    /* eslint-disable-next-line */
  }, [title, description, tag]);

  return (
    <div
      className="my-2 py-4"
      style={{ borderTop: ".5px solid", borderBottom: ".5px solid" }}>
      <div className="text-center">{multiCtx.currentTask?.date_added}</div>
      <div className="d-flex mt-3">
        <form
          onSubmit={(e) => {
            multiCtx.editTask(e, title, description, tag);
            setSaved(true);
            setTimeout(() => setSaved(false), 1000);
          }}
          className="mx-auto w-75">
          <Input required value={title} onChange={onChangeTitle} />
          <textarea
            value={description}
            onChange={onChangeDescription}
            className="form-control mt-2"
            rows={5}
            placeholder="Description"></textarea>
          <Input
            className="mt-2"
            placeholder="Tag"
            value={tag}
            onChange={onChangeTag}
          />
          {isChanged && (
            <Button
              text="Edit"
              icon={"bi:" + (saved ? "check-lg" : "pencil")}
              className="w-100 mt-2"
              type_="submit"
            />
          )}
        </form>
      </div>
    </div>
  );
}
