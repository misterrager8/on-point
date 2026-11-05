import { Fragment, useContext, useEffect, useState } from "react";
import { MultiContext } from "../Context";
import Auth from "./pages/Auth";
import Button from "./atoms/Button";
import TaskItem2 from "./items/TaskItem2";
import AddTask from "./forms/AddTask";
import Dropdown from "./atoms/Dropdown";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export default function Display2() {
  const {
    currentPage,
    logout,
    currentUser,
    tasks,
    currentTask,
    setCurrentTask,
  } = useContext(MultiContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const [show, setShow] = useState(
    localStorage.getItem("onpoint-filter-done") || "all",
  );
  const [theme, setTheme] = useState(localStorage.getItem("onpoint-theme"));
  const [showFilter, setShowFilter] = useState(false);

  const themes = ["light", "dark"];

  useEffect(() => {
    setLoggingOut(false);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("onpoint-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("onpoint-filter-done", show);
  }, [show]);

  return (
    <div className="body">
      <div className="inner">
        {currentPage === "auth" ? (
          <Auth />
        ) : (
          <div>
            <div
              className="between mb-4"
              onClick={(e) =>
                e.target !== e.currentTarget ? undefined : setCurrentTask(null)
              }>
              <div className="d-flex gap-1">
                <>
                  <Button
                    text={tasks.filter((x) => !x.done).length}
                    active={show === "undone"}
                    onClick={() => setShow("undone")}
                    icon="carbon:circle-filled"
                  />
                  <Button
                    active={show === "done"}
                    onClick={() => setShow("done")}
                    icon="bi:check-circle"
                  />
                </>
              </div>
              <div className="my-auto d-flex gap-1">
                {loggingOut && (
                  <Button text="Log Out?" onClick={() => logout()} />
                  // <span className="small my-auto me-2" onClick={() => logout()}>
                  //   Log Out?
                  // </span>
                )}
                <Button
                  active={loggingOut}
                  icon="fluent:person-32-filled"
                  onClick={() => setLoggingOut(!loggingOut)}
                />
                <Button
                  icon={"bi:" + (theme === "dark" ? "sun" : "moon") + "-fill"}
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                />
              </div>
            </div>
            <div
              onClick={(e) =>
                e.target !== e.currentTarget ? undefined : setCurrentTask(null)
              }
              style={{
                height: "65vh",
                overflowY: "auto",
              }}>
              {["all", "undone"].includes(show) && (
                <>
                  {tasks
                    .filter((u) => !u.done)
                    .sort((v, w) => w.pinned - v.pinned)
                    .map((x) => (
                      <TaskItem2 key={x.id} item={x} />
                    ))}
                </>
              )}
              {["all", "done"].includes(show) && (
                <>
                  {tasks
                    .filter((u) => u.done)
                    .sort((v, w) => moment(w.date_done) - moment(v.date_done))
                    .map((x) => (
                      <TaskItem2 key={x.id} item={x} />
                    ))}
                </>
              )}
            </div>
            <div className="m-3">
              <AddTask />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
