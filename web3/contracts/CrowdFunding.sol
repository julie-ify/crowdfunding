// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    constructor() {}

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donors;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns;

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future.");

        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        uint256 campaignIndex = numberOfCampaigns;

        numberOfCampaigns++;

        return campaignIndex;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory ListAllCampaigns = new Campaign[](numberOfCampaigns);

        for (uint256 i = 0; i < numberOfCampaigns; i++) {
            ListAllCampaigns[i] = campaigns[i];
        }

        return ListAllCampaigns;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        (bool success, ) = payable(campaign.owner).call{value: msg.value}("");

        require(success, "Failed to send Ether");

        campaign.donations.push(msg.value);
        campaign.donors.push(msg.sender);
        campaign.amountCollected += msg.value;
    }

    function getDonors(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        Campaign memory campaign = campaigns[_id];
        return (campaign.donors, campaign.donations);
    }
}
