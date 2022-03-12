import { ethers } from "hardhat";

async function main() {
  // deploy
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));


  const factory = await ethers.getContractFactory("DimaNFT");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}

// run
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
