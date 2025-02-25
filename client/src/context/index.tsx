import React, { useContext, createContext } from "react";
import useAppData from "./useAppData";
import { ApplicationData, StateContextProviderProps } from "../utils/datatypes";

const StateContext = createContext<ApplicationData | undefined>(undefined);

export const StateContextProvider: React.FC<StateContextProviderProps> = ({
  children,
}) => {
  const {
    address,
    contract,
		activeAccount,
    createCampaign,
    connectWallet,
    autoConnected,
    isLoading,
    campaignLists,
    isPending,
    getUserCampaigns,
    donate,
    searchCampagin,
    setSearchCampaign,
  } = useAppData();

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
				activeAccount,
        autoConnected,
        isLoading,
        connectWallet,
        createCampaign,
        campaignLists,
        isPending,
        getUserCampaigns,
        donate,
        searchCampagin,
        setSearchCampaign,
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
