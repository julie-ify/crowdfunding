const { ThirdwebSDK } = require('@thirdweb-dev/sdk');
const { expect } = require('chai');
const { ethers } = require('ethers');
require('dotenv').config();

describe('CrowdFunding', function () {
	let sdk, signer, contract, addr1, addr2;

	beforeEach(async function () {
		const provider = new ethers.providers.JsonRpcProvider(
			process.env.ALCHEMY_TESTNET_RPC_URL
		);

		signer = new ethers.Wallet(process.env.TESTNET_PRIVATE_KEY, provider);

		sdk = ThirdwebSDK.fromSigner(signer, 'sepolia', {
			secretKey: process.env.THIRDWEB_SECRET_KEY,
		});

		contract = await sdk.getContract(
			'0xbf154bE2B6C784637707A66b479584BA8Cea4d18'
		);
		addr1 = ethers.Wallet.createRandom().connect(provider);
		addr2 = ethers.Wallet.createRandom().connect(provider);
	});

	it('should create a campaign successfully', async function () {
		const target = ethers.utils.parseEther('5');
		const deadline = Math.floor(Date.now() / 1000) + 86400; // 1 day in the future

		const tx = await contract.call('createCampaign', [
			signer.address,
			'Title',
			'Description',
			target.toString(),
			deadline,
			'image_url',
		]);

		expect(tx).to.have.property('receipt');
	});

	it('should fail to create a campaign with past deadline', async function () {
		try {
			await contract.call('createCampaign', [
				signer.address,
				'Title',
				'Description',
				ethers.utils.parseEther('5').toString(),
				Math.floor(Date.now() / 1000) - 100, // Past deadline
				'image_url',
			]);

			expect.fail('Expected transaction to fail, but it succeeded');
		} catch (error) {
			expect(error.message).to.match(/Deadline must be in the future/);
		}
	});
});
