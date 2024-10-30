import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { ethers } from "ethers";

function Profile() {
  const { getUserCampaigns, isPending } = useStateContext();
	const campaignLists = getUserCampaigns();

  const parsedCampaigns = campaignLists
    ? campaignLists.map((campaign, i) => ({
        campaignId: i,
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.formatUnits(campaign.target),
        deadline: Number(campaign.deadline),
        amountCollected: ethers.formatUnits(campaign.amountCollected),
        image: campaign.image,
      }))
    : [];

  return (
    <>
      <DisplayCampaigns
        title="My Campaigns"
        isPending={isPending}
        campaigns={parsedCampaigns}
      />
    </>
  );
}

export default Profile;
