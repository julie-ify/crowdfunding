require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: {
		version: '0.8.9',
		defaultNetwork: 'sepolia',
		networks: {
			hardhat: {},
			sepolia: {
				url: process.env.ALCHEMY_TESTNET_RPC_URL,
				accounts: [`0x${process.env.TESTNET_PRIVATE_KEY}`],
			},
		},
		settings: {
			optimizer: {
				enabled: true,
				runs: 200,
			},
		},
	},
};
