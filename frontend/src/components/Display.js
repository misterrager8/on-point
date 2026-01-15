import { useContext } from "react";
import Nav from "./Nav";
import { MultiContext } from "../Context";
import Auth from "./pages/Auth";
import AddTask from "./forms/AddTask";
import TaskItem from "./items/TaskItem";
import Button from "./atoms/Button";
import Task from "./pages/Task";

export default function Display() {
  const multiCtx = useContext(MultiContext);

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
                  <div className="mt-3">
                    {multiCtx.tasks.map((x) => (
                      <TaskItem key={x.id} item={x} />
                    ))}
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
