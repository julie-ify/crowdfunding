import React from "react";

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl?: string;
  activePath?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  styles,
  name,
  imgUrl,
  activePath,
  disabled,
  handleClick,
}) => {
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        activePath && activePath === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!activePath ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2"/>
      ) : (
        <img
          src={imgUrl}
          alt="icon"
          className={`w-1/2 h-1/2 ${activePath !== name && "grayscale hover:grayscale-0"}`}
        />
      )}
    </div>
  );
};

export default Icon;