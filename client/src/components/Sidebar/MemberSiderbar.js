import React, { memo, Fragment, useState } from "react";
import avatar from "assets/avatar_default.jpg";
import { memberSidebar } from "ultils/constants";
import { NavLink, Link } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useSelector } from "react-redux";
import clx from "classnames";
const activeStyle =
  "flex items-center gap-2 px-4 py-4 text-gray-200 bg-gray-400";
const inactiveStyle =
  "flex items-center gap-2 px-4 py-4 text-gray-200 hover:bg-gray-400";
const MemberSiderbar = () => {
  const { current } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState([]);
  const handleShowSubmenu = (id) => {
    if (isOpen.some((item) => item === id)) {
      setIsOpen((prev) => prev.filter((item) => item !== id));
    } else {
      setIsOpen((prev) => [...prev, id]);
    }
  };
  return (
    <div className="bg-gray-900 text-white h-full w-full py-4">
      <div className="w-full gap-2 flex flex-col items-center justify-center py-4">
        <img
          src={current?.avatar || avatar}
          alt="logo"
          className="w-16 h-16 object-contain rounded-full"
        />
        <small className="text-white">
          {`${current?.lastname} ${current?.firstname}`}
        </small>
      </div>
      <div className="flex flex-col ">
        {memberSidebar?.map((el) => (
          <Fragment key={el.id}>
            {el.type === "SINGLE" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  isActive ? activeStyle : inactiveStyle
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}
            {el.type === "PARENT" && (
              <div
                onClick={() => handleShowSubmenu(+el.id)}
                className="flex flex-col justify-between text-gray-200 "
              >
                <NavLink
                  to={el.path}
                  className={({ isActive }) =>
                    isActive ? activeStyle : inactiveStyle
                  }
                >
                  <div className="flex justify-between w-full items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span>{el.icon}</span>
                      <span>{el.text}</span>
                    </div>
                    {isOpen?.some((item) => +item === +el.id) ? (
                      <AiOutlineDown />
                    ) : (
                      <AiOutlineUp />
                    )}
                  </div>
                </NavLink>
                {isOpen?.some((item) => +item === +el.id) && (
                  <div className="flex flex-col ">
                    {el.submenu?.map((sub) => (
                      <NavLink
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        key={sub.id}
                        to={sub.path}
                        className={({ isActive }) =>
                          isActive ? activeStyle : inactiveStyle
                        }
                      >
                        <span>{sub.icon}</span>
                        <span>{sub.text}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
        <NavLink
          onClick={(e) => {
            e.stopPropagation();
          }}
          to={`/`}
          className={clx("flex items-center gap-2 px-4 py-4 text-gray-200")}
        >
          <span>Go to Home</span>
        </NavLink>
      </div>
    </div>
  );
};

export default memo(MemberSiderbar);
