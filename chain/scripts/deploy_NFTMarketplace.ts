import { ethers } from "hardhat";

async function main() {

  const NftMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NftMarketplace.deploy();
  //.deploy('NftMarketplace','BADGE');

  await nftMarketplace.deployed();

  console.log(`NftMarketplace deployed to ${nftMarketplace.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});