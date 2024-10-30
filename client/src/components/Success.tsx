import { loader } from "../assets";

function Success() {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgb(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img
        src={loader}
        alt="loader"
        className="w-[100px] h-[100px] object-contain"
      />
      <p className="mt-[20px] font-bold text-[20px] text-center">
        Transaction is successful
      </p>
    </div>
  );
}

export default Success;
