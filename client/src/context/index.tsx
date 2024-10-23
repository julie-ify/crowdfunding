import React, { ReactNode, useContext, createContext } from "react";
import useAppData from "./useAppData";
import { PreparedTransaction } from "thirdweb";

interface CreateCampaignProps {
  name: string;
  title: string;
  description: string;
  target: bigint;
  deadline: string;
  image: string;
}

interface ApplicationData {
  address?: string;
  contract: any;
  autoConnected: boolean | undefined;
  isLoading: boolean;
  connectWallet: () => void;
  createCampaign: (
    campaignData: CreateCampaignProps
  ) => Promise<PreparedTransaction | undefined>;
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
