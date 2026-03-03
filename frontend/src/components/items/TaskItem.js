import { useContext, useState } from "react";
import { MultiContext } from "../../Context";
import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

export default function TaskItem({ item }) {
  const multiCtx = useContext(MultiContext);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className={"task-item" + (item.done ? " done" : "")}>
      <div className="d-flex text-truncate">
        <Button
          className={item.done ? "green" : ""}
          icon="bi:check-lg"
          onClick={() => multiCtx.toggleTask(item.id)}
        />
        <div
          onClick={() => {
            !item.done && multiCtx.setCurrentTask(item);
          }}
          className="ms-2 task-label text-truncate">
          {item.title}
        </div>
      </div>
      <div className="d-flex">
        {item.description && (
          <Icon name="chat-left-text-fill my-auto" className="mx-2" />
        )}
        {item.tag && (
          <span className=" badge-custom my-auto mx-2">
            {item.tag}
          </span>
        )}
        <span className=" small my-auto mx-2">{item.date_added}</span>
        {item.done ? (
          <Button
            icon="material-symbols:control-point-duplicate-rounded"
            onClick={() => multiCtx.recycleTask(item.id)}
          />
        ) : (
          <Button
            className={item.pinned ? "red" : "opacity-50"}
            icon={"bi:pin-angle" + (item.pinned ? "-fill" : "")}
            onClick={() => multiCtx.togglePinned(item.id)}
          />
        )}

        {deleting && (
          <Button
            className="red"
            icon="bi:question-lg"
            onClick={() => multiCtx.deleteTask(item.id)}
          />
        )}
        <Button
          className="red"
          icon="bi:x-lg"
          onClick={() => setDeleting(!deleting)}
        />
      </div>
    </div>
  );
}
