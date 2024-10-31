import { useStateContext } from "../context";
import { DisplayCampaigns } from "../components";
import { ethers } from "ethers";
import { parsedCampaignsProps } from "../utils/datatypes";

function Profile() {
  const { getUserCampaigns, isPending, searchCampagin } = useStateContext();
  const campaignLists = getUserCampaigns();

  let filteredCampaigns;
  let parsedCampaigns: parsedCampaignsProps[] = [];

  if (campaignLists) {
    if (searchCampagin) {
      filteredCampaigns = campaignLists.filter((campaign) =>
        campaign.title
          .toLowerCase()
          .includes(searchCampagin.toLowerCase())
      );
    } else {
      filteredCampaigns = campaignLists;
    }

    parsedCampaigns = filteredCampaigns.map((campaign, i) => ({
      campaignId: i,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.formatUnits(campaign.target),
      deadline: Number(campaign.deadline),
      amountCollected: ethers.formatUnits(campaign.amountCollected),
      image: campaign.image,
    }));
  } else {
    parsedCampaigns = [];
  }

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
