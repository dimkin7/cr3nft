import { ethers } from "hardhat";

async function main() {
  // deploy
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance));


  //const factory = await ethers.getContractFactory("DimaNFT");
  const factory = await ethers.getContractFactory("Dima1155");
  const contract = await factory.deploy();
  await contract.deployed();
  console.log("Contract Dima1155 deployed to:", contract.address);
}

// run
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
