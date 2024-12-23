import React from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "ultils/helper";
import withBase from "hocs/withBase";
const Sidebar = ({ categories }) => {
  return (
    <div className="flex border flex-col">
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.title)}
          to={createSlug(el.title)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
              : "px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
          }
        >
          {el.title}
        </NavLink>
      ))}
    </div>
  );
};

export default withBase(Sidebar);
