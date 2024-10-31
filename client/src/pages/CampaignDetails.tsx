import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { thirdweb } from "../assets";
import { CustomButton, CountBox, Loader, Success } from "../components";
import { calculateBarPercentage, daysLeft } from "../utils";
import { useStateContext } from "../context";
import { useReadContract } from "thirdweb/react";
import { toEther } from "thirdweb/utils";
import { parsedCampaignsProps, parsedDonorsProps } from "../utils/datatypes";

function CampaignDetails() {
  const { state } = useLocation() as { state: parsedCampaignsProps };
  const navigate = useNavigate();
  const { contract, address, donate } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [donations, setDonations] = useState<parsedDonorsProps[]>([]);

  const remainingDays = daysLeft(state.deadline);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(BigInt(state.campaignId), amount);
    setIsLoading(false);
    setSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const a = calculateBarPercentage(
    Number(state.target),
    Number(state.amountCollected)
  );

  // Get all the donations
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getDonors(uint256 _id) view returns (address[], uint256[])",
    params: [BigInt(state.campaignId)],
  });

  useEffect(() => {
    if (!isPending && data) {
      const parsedDonors: parsedDonorsProps[] = [];
      const numberOfDonors = data[0].length;

      for (let i = 0; i < numberOfDonors; i++) {
        parsedDonors.push({
          donor: data[0][i],
          donation: toEther(data[1][i]),
        });
      }
      setDonations(parsedDonors);
    }
  }, [isPending, data]);

  return (
    <div className="">
      {isLoading && <Loader />}
      {success && <Success />}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div
              className="absolute h-full bg-[#4acd8d]"
              style={{
                width: `${calculateBarPercentage(
                  Number(state.target),
                  Number(state.amountCollected)
                )}%`,
                maxWidth: "100%",
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Goal ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donations.length.toString()} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">
              Creator
            </h4>
            <div className="mt-[20px] flex items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={thirdweb}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>

              <div>
                <h4 className="font-semibold text-[14px] text-white break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">
              Story
            </h4>
            <div className="mt-[20px]">
              <p className="font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[18px] text-white uppercase">
              Donors
            </h4>
            {isPending ? (
              <p>Loading...</p>
            ) : (
              <div className="mt-[20px] flex flex-col gap-[4px]">
                {donations.length > 0 ? (
                  donations.map((item, i) => (
                    <div
                      key={`${item.donor}-${i}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                        {i + 1}. {item.donor}
                      </p>
                      <p className="font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                        {item.donation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donors yet, be the first one!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-[18px] text-white uppercase">
            Fund
          </h4>
          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-medium text-[20px] leading-[30px] text-center text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step={0.01}
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent text-white text-[18px] leading-[30px] placeholder:text-[#4b5263] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-semibold text-[14px] leading-[22px] text-white">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-normal leading-[22px] text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Fund Campaign"
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
