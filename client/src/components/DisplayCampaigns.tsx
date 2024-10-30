import { useNavigate } from "react-router-dom";
import { loader } from "../assets";
import { FundCard } from "./";

interface ICampaigns {
  campaignId: number;
  title: string;
  owner: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
}

interface DisplayCampaignsProps {
  title: string;
  isPending: boolean;
  campaigns: ICampaigns[];
}

function DisplayCampaigns({
  title,
  isPending,
  campaigns,
}: DisplayCampaignsProps) {
  const navigate = useNavigate();

  const handleNavigate = (campaign: ICampaigns) => {
		// passing the campaign object through useNavigate which can be retrieved using useLocation
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-roboto font-semibold text-[18px] text-white text-left">
        {title} ({isPending ? "..." : campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px] w-full">
        {isPending && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isPending && campaigns.length === 0 && (
          <p className="font-roboto font-semibold text-[14px] leading-[30px] text-[#818183]">
            You do not have an any campaigns
          </p>
        )}

        {!isPending &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={campaign.campaignId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
}

export default DisplayCampaigns;
