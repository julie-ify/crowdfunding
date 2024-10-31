import { ReactNode } from "react";

export interface parsedCampaignsProps {
  campaignId: number;
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
	handleClick?: () => void;
}

export interface CreateCampaignProps {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export interface ICampaignLists {
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

export interface ApplicationData {
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
  searchCampagin: string;
  setSearchCampaign: React.Dispatch<React.SetStateAction<string>>;
}

export interface StateContextProviderProps {
  children: ReactNode;
}

export interface CountBoxProps {
  title: string;
  value: string;
}

export interface ButtonProps {
  btnType?: "submit" | "button" | "reset";
  title?: string;
  styles?: string;
	disabled? :boolean
  handleClick?: () => void;
}

export interface DisplayCampaignsProps {
  title: string;
  isPending: boolean;
  campaigns: parsedCampaignsProps[];
}

export interface FormProps {
  labelName?: string;
  placeholder: string;
  inputType?: "text" | "email" | "date" | "url" | "number";
  value: string;
  inputName: string;
  isTextArea?: boolean;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export interface IconProps {
  styles?: string;
  name?: string;
  imgUrl?: string;
  activePath?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface parsedDonorsProps {
  donor: string;
  donation: string;
}