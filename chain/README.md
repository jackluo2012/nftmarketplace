## 目录
```
--nftmarket
  --chain
  --webapp
```
##
```
yarn init -y
yarn add hardhat
yarn add @openzeppelin/contracts
yarn hardhat
//这个很重要！！！
yarn add  @nomiclabs/hardhat-ethers 'ethers@^5.0.0'

yarn hardhat test test/BadgeToken.test.ts 



npx hardhat run scripts/deploy_BadgeToken.ts --network localhost
BadgeToken deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
## 部署到 alchemy.com 的 Goerli 网络
```
yarn hardhat run scripts/deploy_BadgeToken.ts --network goerli
```
## 使用OpenZeppline 部署 可升级的智能合约

yarn hardhat run scripts/deploy_NFTMarketplace.ts  --network goerli

```
yarn hardhat run scripts/deploy_NFTMarketplace_Proxy_Upgradeable.ts --network goerli
```
# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat compile
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts

npx hardhat run scripts/deploy_BadgeToken.ts

```
