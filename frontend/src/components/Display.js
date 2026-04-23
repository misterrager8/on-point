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
  const [sort, setSort] = useState("date-added");
  const [ascending, setAscending] = useState(false);

  useEffect(() => {
    localStorage.setItem("onpoint-filter-done", show);
  }, [show]);

  const sorts = [
    {
      value: "date-added",
      label: "Date Added",
      icon: "bi:clock",
    },
    {
      value: "tag",
      label: "Tag",
      icon: "bi:tag",
    },
  ];

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
                <div className="between mt-3">
                  <div>
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
                      {[...new Set(multiCtx.tasks.map((x) => x.tag))].map(
                        (y) => (
                          <a
                            onClick={() => multiCtx.setFilter(y)}
                            className="dropdown-item">
                            {y}
                          </a>
                        ),
                      )}
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
                  <div>
                    <Dropdown
                      icon={sorts.find((y) => y.value === sort)?.icon}
                      target="sorts"
                      text={sorts.find((y) => y.value === sort)?.label}>
                      {sorts.map((x) => (
                        <>
                          {sort !== x.value && (
                            <a
                              onClick={() => setSort(x.value)}
                              className="dropdown-item">
                              {x.label}
                            </a>
                          )}
                        </>
                      ))}
                    </Dropdown>
                    <Button
                      onClick={() => setAscending(!ascending)}
                      icon={"uiw:" + (ascending ? "up" : "down")}
                    />
                  </div>
                </div>
                <div className="task-scroll mt-3">
                  {["all", "undone"].includes(show) && (
                    <>
                      {multiCtx.tasks
                        .filter((w) => !w.done)
                        .filter((g) =>
                          multiCtx.filter ? g.tag === multiCtx.filter : g,
                        )
                        .sort((b, c) => {
                          if (sort === "date-added") {
                            return (
                              (ascending ? b : c).id - (ascending ? c : b).id
                            );
                          } else if (sort === "tag") {
                            return (
                              (ascending ? b : c).tag || ""
                            ).localeCompare((ascending ? c : b).tag || "");
                          }
                        })
                        .map((x) => (
                          <TaskItem key={x.id} item={x} />
                        ))}
                    </>
                  )}

                  {["all", "done"].includes(show) && (
                    <>
                      {multiCtx.tasks
                        .filter((w) => w.done)
                        .sort((b, c) => {
                          if (sort === "date-added") {
                            return (
                              (ascending ? b : c).id - (ascending ? c : b).id
                            );
                          } else if (sort === "tag") {
                            return (
                              (ascending ? b : c).tag || ""
                            ).localeCompare((ascending ? c : b).tag || "");
                          }
                        })
                        .map((x) => (
                          <TaskItem key={x.id} item={x} />
                        ))}
                    </>
                  )}
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
