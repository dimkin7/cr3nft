import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

describe("NFT", function () {

  let nft: Contract;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  before(async function () {
    //console.log("before");

    [owner, addr1, addr2] = await ethers.getSigners();

    //create contract
    const factoryNFT = await ethers.getContractFactory("DimaNFT");
    nft = await factoryNFT.deploy();
    await nft.deployed();
  });

  it("Mint 1", async function () {
    await nft.mint(addr1.address); 
  });

  it("Mint 2", async function () {
    await nft.mint(addr2.address); 
  });

  it("Token URI 1", async function () {
    expect(await nft.tokenURI(1)).to.equal("https://ipfs.io/ipfs/QmP2aNgzCpt5Rz8zTifc7X2BB2E39ZTTzo3HwbghaxiWbK/1.json");
  });
  it("Token URI 2", async function () {
    expect(await nft.tokenURI(2)).to.equal("https://ipfs.io/ipfs/QmP2aNgzCpt5Rz8zTifc7X2BB2E39ZTTzo3HwbghaxiWbK/2.json");
  });

  it("Burn 2", async function () {
    await nft.burn(2); 
  });

  it("Token URI non existent", async function () {
    await expect(nft.tokenURI(2)).to.be.revertedWith("ERC721Metadata: URI query for nonexistent token");
  });

  it("Supports interface", async function () {
    expect( await nft.supportsInterface(0x01ffc9a7)).to.equal(true);
  });
});
