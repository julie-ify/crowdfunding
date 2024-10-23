import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./";
import { menu, thirdweb, search, logo } from "../assets";
import { navlinks } from "../contants";
import { useStateContext } from "../context";

function Navbar() {
  const [activePath, setActivePath] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const navigate = useNavigate();
  const { address, connectWallet, isLoading, autoConnected } =
    useStateContext();

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between mb-[35px] gap-6 ">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="font-roboto font-normal flex w-full text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>

      {/* tablet screens and higher */}
      <div className="hidden sm:flex flex-row justify-end items-center gap-4">
        {isLoading && <p>loading...</p>}
        {!isLoading && (
          <CustomButton
            btnType="button"
            title={address ? `${address.slice(0, 10)}...` : "Connect"}
            styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
            handleClick={() => {
              if (address) {
                // navigate("create-campaign");
              } else {
                connectWallet();
              }
            }}
          />
        )}

        <Link to={"/profile"}>
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* mobile screens */}
      <div className="sm:hidden flex justify-between items-center relative">
        <Link to={"/"}>
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={logo}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => {
              return (
                <li
                  key={link.name}
                  className={`flex p-4 ${
                    activePath === link.name && "bg-[#3a3a43]"
                  } cursor-pointer `}
                  onClick={() => {
                    setActivePath(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img
                    src={link.imgUrl}
                    alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${
                      activePath === link.name ? "grayscale-0" : "grayscale"
                    }`}
                  />
                  <p
                    className={`ml-[20px] font-roboto font-semibold text-[14px] ${
                      activePath === link.name
                        ? "text-[#1dc071]"
                        : "text-[#808191]"
                    }`}
                  >
                    {link.name}
                  </p>
                </li>
              );
            })}
          </ul>
          <div className=" flex mx-4">
            {isLoading && <p>loading...</p>}
            {!isLoading && (
              <CustomButton
                btnType="button"
                title={address ? `${address.slice(0, 10)}...` : "Connect"}
                styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
                handleClick={() => {
                  if (address) {
                    // navigate("create-campaign");
                  } else {
                    connectWallet();
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
