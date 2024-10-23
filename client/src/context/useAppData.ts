import { useState } from "react";
import {
  getContract,
  prepareContractCall,
  PreparedTransaction,
} from "thirdweb";
import { useSendTransaction, useConnect, useAutoConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { sepolia } from "thirdweb/chains";
import { client } from "../client";

interface CreateCampaignProps {
  name: string;
  title: string;
  description: string;
  target: bigint;
  deadline: string;
  image: string;
}

const useAppData = () => {
  const [address, setAddress] = useState<string>("");
  const contract = getContract({
    client,
    address: "0xbf154bE2B6C784637707A66b479584BA8Cea4d18", // contract address
    chain: sepolia,
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
  const { mutateAsync: sendTx, data: transactionResult } = useSendTransaction();
  const createCampaign = async ({
    title,
    description,
    target,
    deadline,
    image,
  }: CreateCampaignProps): Promise<PreparedTransaction | undefined> => {
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
          BigInt(Math.floor(new Date(deadline).getTime() / 1000)),
          image,
        ],
      });

      await sendTx(transaction);
      return transactionResult;
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
  };
};

export default useAppData;
