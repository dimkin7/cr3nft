import { HardhatUserConfig, task } from "hardhat/config";

const contractAddr = '0x1efdf440B4568F5Da1A2c1137D32CE41107d620c'; 

// mint
// function mint(address to)
//npx hardhat mint --network rinkeby --key PRIVATE_KEY --to 0x7EA751f8B46E08F7397904A39b3e08901B5D1659
task("mint", "mint")
.addParam("key", "Your private key")
.addParam("to", "Address to")
.setAction(async (taskArgs, hre) => {
  const abi = [
    "function mint(address to)"
  ];
  const provider = new hre.ethers.providers.AlchemyProvider("rinkeby");
  const signer = new hre.ethers.Wallet(taskArgs.key, provider);
  const contr = new hre.ethers.Contract(contractAddr, abi, signer);
  
  let success = await contr.mint(taskArgs.to);
  console.log('mint: ', success);
});