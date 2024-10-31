import { ButtonProps } from "../utils/datatypes";

function CustomButton({
  btnType,
  title,
  handleClick,
  styles,
  disabled,
}: ButtonProps) {
  return (
    <button
      className={`font-roboto font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      disabled={disabled}
      type={btnType}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default CustomButton;
