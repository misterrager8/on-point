import { useContext, useEffect, useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { MultiContext } from "../../Context";
import { Icon } from "@iconify/react";

export default function TaskItem2({ item }) {
  const {
    toggleTask,
    currentTask,
    setCurrentTask,
    togglePinned,
    deleteTask,
    quickEdit,
    recycleTask,
  } = useContext(MultiContext);

  const [title, setTitle] = useState(item.title);
  const onChangeTitle = (e) => setTitle(e.target.value);

  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDeleting(false);
    setHovered(false);
  }, [currentTask]);

  return (
    <>
      <div
        style={{
          borderBottom: hovered ? ".5px solid" : "",
          cursor: "pointer",
          paddingTop: "1px",
          paddingBottom: "1px",
          marginTop: "1px",
          marginBottom: "1px",
        }}
        className="between task"
        onMouseEnter={() =>
          setHovered(currentTask?.id === item.id ? false : true)
        }
        onMouseLeave={() => setHovered(false)}>
        <div style={{ width: "80%" }} className="d-flex">
          <Button
            onClick={() => toggleTask(item.id)}
            icon={saved ? "codicon:thumbsup-filled" : "bi:check-lg"}
            className={item.done || saved ? "green" : ""}
          />
          <form
            onSubmit={(e) => {
              quickEdit(e, item.id, title);
              setSaved(true);
              setTimeout(() => setSaved(false), 1000);
            }}
            style={{ width: "90%" }}>
            <input
              onFocus={(e) => e.target.select()}
              className="title-input ms-1 w-100"
              disabled={item.done}
              style={{
                textDecoration: item.done ? "line-through" : null,
                backgroundColor: "transparent",
                border: "none",
                opacity: item.done ? "50%" : "",
                // width: "90%",
              }}
              onChange={onChangeTitle}
              value={title}
            />
          </form>
        </div>
        <div className="d-flex flex-row-reverse gap-1" style={{ width: "21%" }}>
          <Button
            className=""
            active={currentTask?.id === item.id}
            onClick={() =>
              setCurrentTask(currentTask?.id === item.id ? null : item)
            }
            icon="bi:three-dots"
          />
          {currentTask?.id === item.id && (
            <>
              {!item.done ? (
                <Button
                  active={item.pinned}
                  className="red"
                  onClick={() => togglePinned(item.id)}
                  icon={"iconoir:pin" + (item.pinned ? "-solid" : "")}
                />
              ) : (
                <Button
                  icon="fa6-solid:repeat"
                  onClick={() => recycleTask(item.id)}
                />
              )}
              <Button
                active={deleting}
                className="red"
                onClick={() => setDeleting(!deleting)}
                icon="bi:x-lg"
              />
              {deleting && (
                <Button
                  onClick={() => deleteTask(item.id)}
                  className="red"
                  icon="bi:question-lg"
                />
              )}
            </>
          )}
          {item.pinned && currentTask?.id !== item.id && !item.done && (
            <span className="my-auto me-1 red">
              <Icon inline icon="iconoir:pin-solid" />
            </span>
          )}
          {currentTask?.id === item.id && (
            <span className="my-auto me-1 small">{item.date_added}</span>
          )}
        </div>
      </div>
      {currentTask?.id === item.id && (
        <div className="p-3">
          <textarea
            placeholder="..."
            rows={5}
            className="note-box p-3 fst-italic"></textarea>
        </div>
      )}
    </>
  );
}
