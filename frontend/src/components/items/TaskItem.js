import { useContext, useState } from "react";
import { MultiContext } from "../../Context";
import Button from "../atoms/Button";

export default function TaskItem({ item }) {
  const multiCtx = useContext(MultiContext);
  const [deleting, setDeleting] = useState(false);

  return (
    <div className={"task-item" + (item.done ? " done" : "")}>
      <div className="d-flex text-truncate">
        <Button
          className={item.done ? "green" : ""}
          icon="check-lg"
          onClick={() => multiCtx.toggleTask(item.id)}
        />
        <div
          onClick={() => {
            !item.done && multiCtx.setCurrentTask(item);
          }}
          className="task-label text-truncate">
          {item.title}
        </div>
      </div>
      <div className="d-flex">
        {item.tag && <span className="badge-custom my-auto">{item.tag}</span>}
        <span className="small my-auto mx-3">{item.date_added}</span>
        {deleting && (
          <Button
            className="red"
            icon="question-lg"
            onClick={() => multiCtx.deleteTask(item.id)}
          />
        )}
        <Button
          className="red"
          icon="trash2"
          onClick={() => setDeleting(!deleting)}
        />
      </div>
    </div>
  );
}
