import React, { ReactNode, useContext, createContext } from "react";
import useAppData from "./useAppData";

interface CreateCampaignProps {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

interface ICampaignLists {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
  donors: readonly string[];
  donations: readonly bigint[];
}

interface ApplicationData {
  address?: string;
  contract: any;
  autoConnected: boolean | undefined;
  isLoading: boolean;
  campaignLists: readonly ICampaignLists[] | undefined;
  isPending: boolean;
  connectWallet: () => void;
  createCampaign: (campaignData: CreateCampaignProps) => Promise<void>;
  getUserCampaigns: () => readonly ICampaignLists[] | undefined;
  donate: (pId: bigint, amount: string) => Promise<void>;
}

interface StateContextProviderProps {
  children: ReactNode;
}

const StateContext = createContext<ApplicationData | undefined>(undefined);

export const StateContextProvider: React.FC<StateContextProviderProps> = ({
  children,
}) => {
  const {
    address,
    contract,
    createCampaign,
    connectWallet,
    autoConnected,
    isLoading,
    campaignLists,
    isPending,
    getUserCampaigns,
    donate,
  } = useAppData();

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        autoConnected,
        isLoading,
        connectWallet,
        createCampaign,
        campaignLists,
        isPending,
        getUserCampaigns,
        donate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
