import { createContext, useEffect, useState } from "react";
import api from "./util";
// import api from "./util";

export const MultiContext = createContext();

export default function Context({ children }) {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState("");
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("onpoint-user"))
  );
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  // const [users, setUsers] = useState([]);

  const login = (e, username, password) => {
    e.preventDefault();
    setLoading(true);
    api("login", { username: username, password: password }, (data) => {
      setCurrentPage("");
      setCurrentUser(data.user);
    });
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    api("logout", {}, (data) => {
      setCurrentUser(null);
      setLoading(false);
    });
  };

  const signup = (e, email, username, password, passwordConfirm) => {
    setLoading(true);
    e.preventDefault();
    if (password === passwordConfirm) {
      api(
        "signup",
        {
          email: email,
          username: username,
          password: password,
          passwordConfirm: passwordConfirm,
        },
        (data) => {
          setCurrentUser(data.user);
        }
      );
    } else {
      alert("Passwords don't match.");
    }
    setLoading(false);
  };

  const addTask = (e, title) => {
    e.preventDefault();
    setLoading(true);
    api("add_task", { title: title }, (data) => {
      setTasks(data.tasks);
      setLoading(false);
    });
  };

  const getTasks = () => {
    setLoading(true);
    api("get_tasks", {}, (data) => {
      setTasks(data.tasks);
      setLoading(false);
    });
  };

  const toggleTask = (id) => {
    setLoading(true);
    api("toggle_task", { id: id }, (data) => {
      setTasks(data.tasks);
      setLoading(false);
    });
  };

  const editTask = (e, title, description, tag) => {
    e.preventDefault();
    setLoading(true);
    api(
      "edit_task",
      { id: currentTask?.id, title: title, description: description, tag: tag },
      (data) => {
        setTasks(data.tasks);
        setLoading(false);
      }
    );
  };

  const deleteTask = (id) => {
    setLoading(true);
    api("delete_task", { id: id }, (data) => {
      setTasks(data.tasks);
      setLoading(false);
    });
  };

  // const getUsers = () => {
  //   setLoading(true);
  //   api("get_users", {}, (data) => setUsers(data.users));
  //   setLoading(false);
  // };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("onpoint-user", JSON.stringify(currentUser));
      setCurrentPage("");
      getTasks();
    } else {
      localStorage.removeItem("onpoint-user");
      setCurrentPage("auth");
    }
  }, [currentUser]);

  // useEffect(() => {
  //   getUsers();
  // }, []);

  const contextValue = {
    loading: loading,
    setLoading: setLoading,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    currentUser: currentUser,
    setCurrentUser: setCurrentUser,
    login: login,
    signup: signup,
    logout: logout,

    tasks: tasks,
    currentTask: currentTask,
    setCurrentTask: setCurrentTask,
    addTask: addTask,
    deleteTask: deleteTask,
    editTask: editTask,
    toggleTask: toggleTask,
    setTasks: setTasks,
  };

  return (
    <MultiContext.Provider value={contextValue}>
      {/* <div>
        {users.map((x) => (
          <div style={{ whiteSpace: "pre-wrap" }} className="my-2">
            {JSON.stringify(x, null, 4)}
          </div>
        ))}
      </div> */}
      {children}
    </MultiContext.Provider>
  );
}
