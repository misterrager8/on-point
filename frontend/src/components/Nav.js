import { Fragment, useContext, useEffect, useState } from "react";
import Button from "./atoms/Button";
import Dropdown from "./atoms/Dropdown";
import { MultiContext } from "../Context";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./atoms/Spinner";

export default function Nav() {
  const multiCtx = useContext(MultiContext);
  const [theme, setTheme] = useState(localStorage.getItem("onpoint-theme"));

  const themes = ["light", "dark"];

  useEffect(() => {
    localStorage.setItem("onpoint-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="nav-custom">
      <div>{multiCtx.loading ? <Spinner /> : <Button icon="check-lg" />}</div>
      <div>
        {multiCtx.currentUser && (
          <Dropdown
            text={multiCtx.currentUser?.username}
            target="user"
            icon="person-fill">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="dropdown-item text-center"
              onClick={() => multiCtx.logout()}>
              Log Out
            </a>
          </Dropdown>
        )}
        <Dropdown target="themes" icon="paint-bucket">
          {themes.map((x) => (
            <Fragment key={uuidv4()}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className={
                  "dropdown-item text-capitalize text-center" +
                  (theme === x ? " active" : "")
                }
                onClick={() => setTheme(x)}>
                {x}
              </a>
            </Fragment>
          ))}
        </Dropdown>
      </div>
    </div>
  );
}
