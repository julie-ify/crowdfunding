import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { money } from "../assets";
import { CustomButton } from "../components";
import { FormField } from "../components";
import { checkIfImage } from "../utils";
import { useStateContext } from "../context";
import { ethers } from "ethers";

function CreateCampaign() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const { createCampaign, address } = useStateContext();
  const naviage = useNavigate();

  const handleFormFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const target = e.target;
    setForm({
      ...form,
      [e.target.name]: target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);

        await createCampaign({
          ...form,
          target: ethers.parseUnits(form.target, 18),
        });

        setIsLoading(false);
        naviage("/");
      } else {
        alert("Provide a valid image url");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-[#1c1c24] flex flex-col justify-center items-center rounded-[10px] sm:p-10 p-4">
      {isLoading && "Loading..."}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-roboto font-bold sm:text-[25px] text-[18px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            inputName="name"
            handleChange={handleFormFieldChange}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="write a title"
            inputType="text"
            value={form.title}
            inputName="title"
            handleChange={handleFormFieldChange}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="write your story"
          isTextArea
          value={form.description}
          inputName="description"
          handleChange={handleFormFieldChange}
        />

        <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-roboto font-bold text-[25px] text-white ml-[20px]">
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.50"
            inputType="number"
            value={form.target}
            inputName="target"
            handleChange={handleFormFieldChange}
          />
          <FormField
            labelName="End Date *"
            placeholder="End date"
            inputType="date"
            inputName="deadline"
            value={form.deadline}
            handleChange={handleFormFieldChange}
          />
        </div>

        <FormField
          labelName="Campaign Image *"
          placeholder="Enter image url of your campaign"
          inputType="url"
          inputName="image"
          value={form.image}
          handleChange={handleFormFieldChange}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            disabled={!address ? true : false}
            btnType="submit"
            title="Submit new Campaign"
            styles={`${!address ? "bg-[#6546] disabled:opacity-60" : "bg-[#1dc071]"}`}
          />
        </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
