import { useState } from "react";
import { getContract, prepareContractCall } from "thirdweb";
import {
  useSendTransaction,
  useConnect,
  useAutoConnect,
  useReadContract,
} from "thirdweb/react";
import { toWei } from "thirdweb/utils";
import { createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";
import { CreateCampaignProps } from "../utils/datatypes";

const useAppData = () => {
  const [address, setAddress] = useState("");
  const [searchCampagin, setSearchCampaign] = useState("");

  const contract = getContract({
    client,
    address: "0xbf154bE2B6C784637707A66b479584BA8Cea4d18", // contract address
    chain: sepolia,
  });

  // Get all the campaigns
  const { data: campaignLists, isPending } = useReadContract({
    contract,
    method:
      "function getCampaigns() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donors, uint256[] donations)[])",
    params: [],
  });

  // Handle wallet connection manually when the connect btn is clicked
  const { connect, error } = useConnect();
  const connectWallet = () => {
    connect(async () => {
      const wallet = createWallet("io.metamask");
      let connectdWallet = await wallet.connect({ client });
      setAddress(connectdWallet.address);
      return wallet;
    });

    if (error) {
      throw new Error("Error while connecting account");
    }
  };

  // Auto-connect the wallet on page load
  const { data: autoConnected, isLoading } = useAutoConnect({
    client,
    timeout: 3000, // 3-second auto-connect timeout
    onConnect: async (wallet) => {
      const connectedWallet = await wallet.connect({ client });
      setAddress(connectedWallet.address);
    },
  });

  // Function to handle campaign creation
  const { mutateAsync: sendTx } = useSendTransaction();
  const createCampaign = async ({
    title,
    description,
    target,
    deadline,
    image,
  }: CreateCampaignProps): Promise<void> => {
    try {
      const transaction = prepareContractCall({
        contract,
        method:
          "function createCampaign(address _owner,string memory _title,string memory _description,uint256 _target,uint256 _deadline,string memory _image)",
        params: [
          address,
          title,
          description,
          BigInt(target),
          BigInt(Math.floor(new Date(deadline).getTime() / 1000)), // deadline is like 2024-10-22T12:00:00Z
          image,
        ],
      });

      await sendTx(transaction);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  // Function to get a user's campaigns
  const getUserCampaigns = () => {
    const getAllCampaigns = campaignLists?.filter(
      (campaign) => campaign.owner === address
    );

    return getAllCampaigns;
  };

  // Function to donate to campaign
  const donate = async (pId: bigint, amount: string) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function donateToCampaign(uint256 _id) payable",
        params: [pId],
        value: toWei(amount),
      });

      await sendTx(transaction);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  return {
    address,
    contract,
    connectWallet,
    autoConnected,
    isLoading,
    createCampaign,
    campaignLists,
    isPending,
    getUserCampaigns,
    donate,
    searchCampagin,
    setSearchCampaign,
  };
};

export default useAppData;
