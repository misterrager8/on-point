import { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { MultiContext } from "../Context";
import Auth from "./pages/Auth";
import AddTask from "./forms/AddTask";
import TaskItem from "./items/TaskItem";
import Button from "./atoms/Button";
import Dropdown from "./atoms/Dropdown";

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
              <div>
                <AddTask />
                <div className="mt-3">
                  {multiCtx.filter && (
                    <Button
                      icon="bi:x-lg"
                      onClick={() => multiCtx.setFilter(null)}
                    />
                  )}
                  <Dropdown
                    active={multiCtx.filter}
                    icon="bi:filter"
                    target="categories"
                    text={multiCtx.filter ? multiCtx.filter : "Filter"}>
                    {[...new Set(multiCtx.tasks.map((x) => x.tag))].map((y) => (
                      <a
                        onClick={() => multiCtx.setFilter(y)}
                        className="dropdown-item">
                        {y}
                      </a>
                    ))}
                  </Dropdown>
                </div>
                <div className="task-scroll mt-3">
                  {multiCtx.tasks
                    .filter((w) => !w.done)
                    .filter((g) =>
                      multiCtx.filter ? g.tag === multiCtx.filter : g,
                    )
                    .map((x) => (
                      <TaskItem key={x.id} item={x} />
                    ))}

                  <Button
                    className="my-3"
                    text={(showDone ? "Hide" : "Show") + " Done"}
                    onClick={() => setShowDone(!showDone)}
                    icon={"bi:eye" + (showDone ? "-slash" : "")}
                  />
                  {showDone && (
                    <>
                      {multiCtx.tasks
                        .filter((w) => w.done)
                        .sort((x, y) => y.id - x.id)
                        .map((x) => (
                          <TaskItem key={x.id} item={x} />
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
