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
  const [show, setShow] = useState(
    localStorage.getItem("onpoint-filter-done") || "all",
  );

  useEffect(() => {
    localStorage.setItem("onpoint-filter-done", show);
  }, [show]);

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
                  <Button
                    active={show === "undone"}
                    onClick={() => setShow("undone")}
                    icon="bi:square"
                    text=""
                  />
                  <Button
                    active={show === "done"}
                    onClick={() => setShow("done")}
                    icon="bi:check-square"
                    text=""
                  />
                  <Button
                    active={show === "all"}
                    onClick={() => setShow("all")}
                    icon="boxicons:delta"
                    text="All"
                  />
                </div>
                <div className="task-scroll mt-3">
                  {["all", "undone"].includes(show) && (
                    <>
                      {multiCtx.tasks
                        .filter((w) => !w.done)
                        .filter((g) =>
                          multiCtx.filter ? g.tag === multiCtx.filter : g,
                        )
                        .map((x) => (
                          <TaskItem key={x.id} item={x} />
                        ))}
                    </>
                  )}

                  {["all", "done"].includes(show) && (
                    <>
                      {multiCtx.tasks
                        .filter((w) => w.done)
                        .sort((x, y) => y.id - x.id)
                        .map((x) => (
                          <TaskItem key={x.id} item={x} />
                        ))}
                    </>
                  )}

                  {/* <Button
                    className="my-3"
                    text={(done ? "Hide" : "Show") + " Done"}
                    onClick={() => setShow(!done)}
                    icon={"bi:eye" + (done ? "-slash" : "")}
                  />
                  {done && (
                    <>
                      {multiCtx.tasks
                        .filter((w) => w.done)
                        .sort((x, y) => y.id - x.id)
                        .map((x) => (
                          <TaskItem key={x.id} item={x} />
                        ))}
                    </>
                  )} */}
                </div>
                <div className=" p-2">
                  <AddTask />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
