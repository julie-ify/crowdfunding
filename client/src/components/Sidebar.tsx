import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, sun } from "../assets";
import { navlinks } from "../contants";
import { Icon } from "./";

function Sidebar() {
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState("dashboard");

  return (
    <div className="flex flex-col justify-between items-center sticky top-5 h-[93vh]">
      <Link to={"/"}>
        <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>

      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              activePath={activePath}
              handleClick={() => {
                if (!link.disabled) {
                  setActivePath(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        <Icon imgUrl={sun} styles="bg-[#1c1c24] shadow-secondary" />
      </div>
    </div>
  );
}

export default Sidebar;
