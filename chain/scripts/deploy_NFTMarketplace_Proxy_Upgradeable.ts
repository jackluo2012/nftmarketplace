import { ethers,upgrades } from "hardhat";

async function main() {

  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  console.log("Deploying NFTMarketplace...")
  //const nftMarketplace = await NFTMarketplace.deploy("NFTMarketplace", "BTN");
  //.deploy('NFTMarketplace','BADGE');
  const nftMarketplace = await upgrades.deployProxy(NFTMarketplace)

  console.log(`NFTMarketplace deployed(proxy) to address: ${nftMarketplace.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});