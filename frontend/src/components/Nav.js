import { Fragment, useContext, useEffect, useState } from "react";
import Dropdown from "./atoms/Dropdown";
import { MultiContext } from "../Context";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./atoms/Spinner";
import { Icon } from "@iconify/react";

export default function Nav() {
  const multiCtx = useContext(MultiContext);
  const [theme, setTheme] = useState(localStorage.getItem("onpoint-theme"));

  const themes = [
    "light",
    "navy-pumpkin",
    "firetruck-denim",
    "banana-lilac",
    "nebula-royal",
    "firetruck-denim",
    "iris-navy",
    "citrus-lilac",
    "cheese-banana",
    "navy-bumblebee",
    "aqua-lotus",
    "dark",
    "regal-iris",
    "butter-regal",
    "emerald-lavender",
    "blueberry-navy",
    "sky-iris",
    "ruby-blood",
    "sunset-grape",
  ];

  useEffect(() => {
    localStorage.setItem("onpoint-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="nav-custom">
      <div className="d-flex">
        {multiCtx.loading ? (
          <Spinner />
        ) : (
          <div className="my-auto orange">
            <Icon inline icon="bi:square" className="me-2" />
            {multiCtx.tasks.filter((x) => !x.done).length}{" "}
          </div>
        )}
      </div>
      <div>
        {multiCtx.currentUser && (
          <Dropdown
            text={multiCtx.currentUser?.username}
            target="user"
            icon="fa7-solid:person">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="dropdown-item text-center"
              onClick={() => multiCtx.logout()}>
              Log Out
            </a>
          </Dropdown>
        )}
        <Dropdown target="themes" icon="gis:color">
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
