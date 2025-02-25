import { ButtonProps } from "../utils/datatypes";
import { FaAngleDown } from "react-icons/fa";
import { useStateContext } from "../context";
import { useDisconnect } from "thirdweb/react";

function CustomButton({
  btnType,
  title,
  handleClick,
  styles,
  disabled,
  isIcon,
}: ButtonProps) {
  const { activeAccount } = useStateContext();
  const { disconnect } = useDisconnect();

  return (
    <button
      className={`font-roboto font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      disabled={disabled}
      type={btnType}
      onClick={handleClick}
    >
      <div className="flex items-center gap-x-[20px]">
        <span>{title}</span>
        {isIcon && (
          <span
            onClick={() => {
							if (activeAccount) {
                disconnect(activeAccount);
              }
            }}
          >
            <FaAngleDown />
          </span>
        )}
      </div>
    </button>
  );
}

export default CustomButton;
