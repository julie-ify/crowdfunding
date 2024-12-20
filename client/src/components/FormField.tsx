import { FormProps } from "../utils/datatypes";

function FormField({
  labelName,
  placeholder,
  inputType,
  value,
  isTextArea,
  inputName,
  handleChange,
}: FormProps) {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-roboto font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          name={inputName}
          placeholder={placeholder}
          rows={10}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-roboto text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : (
        <input
          required
          value={value}
          name={inputName}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-roboto text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  );
}

export default FormField;
