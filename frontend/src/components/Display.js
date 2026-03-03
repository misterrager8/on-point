import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { MultiContext } from "../Context";
import Auth from "./pages/Auth";
import AddTask from "./forms/AddTask";
import TaskItem from "./items/TaskItem";
import Task from "./pages/Task";
import Button from "./atoms/Button";

export default function Display() {
  const multiCtx = useContext(MultiContext);
  const [showDone, setShowDone] = useState(
    localStorage.getItem("onpoint-filter-done"),
  );

  useEffect(() => {
    showDone
      ? localStorage.setItem("onpoint-filter-done", showDone)
      : localStorage.removeItem("onpoint-filter-done");
  }, [showDone]);

  return (
    <div className="body">
      <div className="inner">
        <Nav />
        <div className="mt-4">
          {multiCtx.currentPage === "auth" ? (
            <Auth />
          ) : (
            <div>
              {multiCtx.currentTask ? (
                <Task />
              ) : (
                <div>
                  <AddTask />
                  <div className="task-scroll mt-3">
                    {multiCtx.tasks
                      .filter((w) => (showDone ? w : !w.done))
                      .map((x) => (
                        <TaskItem key={x.id} item={x} />
                      ))}
                    <Button
                      className="my-3"
                      text={(showDone ? "Hide" : "Show") + " Done"}
                      onClick={() => setShowDone(!showDone)}
                      icon={"bi:eye" + (showDone ? "-slash" : "")}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
